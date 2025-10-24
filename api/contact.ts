import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Interfaces
interface ContactFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  projectDetails: string;
  honeypot?: string;
}

interface ErrorResponse {
  ok: false;
  error: string;
}

interface SuccessResponse {
  ok: true;
}

// Helper: Escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Validation helper
function validateFormData(data: any): { valid: boolean; error?: string; formData?: ContactFormData } {
  const { companyName, contactPerson, email, projectDetails, honeypot } = data;

  // Spam trap: reject if honeypot is filled
  if (honeypot && honeypot.trim() !== '') {
    return { valid: false, error: 'Invalid submission detected' };
  }

  // Required field validation
  if (!companyName || !contactPerson || !email || !projectDetails) {
    return { valid: false, error: 'All fields are required' };
  }

  // Trim and validate
  const trimmedData: ContactFormData = {
    companyName: companyName.trim(),
    contactPerson: contactPerson.trim(),
    email: email.trim(),
    projectDetails: projectDetails.trim(),
    honeypot: honeypot?.trim() || ''
  };

  // Email validation (basic regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedData.email)) {
    return { valid: false, error: 'Invalid email address' };
  }

  // Project details minimum length
  if (trimmedData.projectDetails.length < 10) {
    return { valid: false, error: 'Project details must be at least 10 characters' };
  }

  // Company name minimum length
  if (trimmedData.companyName.length < 2) {
    return { valid: false, error: 'Company name must be at least 2 characters' };
  }

  // Contact person minimum length
  if (trimmedData.contactPerson.length < 2) {
    return { valid: false, error: 'Contact person name must be at least 2 characters' };
  }

  return { valid: true, formData: trimmedData };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse<SuccessResponse | ErrorResponse>
) {
  // Set security headers
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');

  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  // Body size limit check (approximate, Vercel has default limits but we add our own)
  const bodySize = JSON.stringify(req.body).length;
  if (bodySize > 25 * 1024) { // ~25kb
    return res.status(413).json({ ok: false, error: 'Request body too large' });
  }

  // Validate form data
  const validation = validateFormData(req.body);
  if (!validation.valid || !validation.formData) {
    return res.status(400).json({ ok: false, error: validation.error || 'Invalid data' });
  }

  const formData = validation.formData;

  // Check environment variables
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !TO_EMAIL) {
    console.error('Missing required environment variables');
    return res.status(500).json({ ok: false, error: 'Server configuration error' });
  }

  try {
    // Configure nodemailer transport with SSL/TLS
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT), // 465 for SSL
      secure: true, // Use SSL/TLS
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      },
      // Additional options for better compatibility with Namecheap PrivateEmail
      tls: {
        rejectUnauthorized: true
      }
    });

    // Verify connection configuration (optional but recommended)
    await transporter.verify();

    // Email to team (info@kemetgarment.com)
    const teamEmailSubject = `New Inquiry — ${formData.companyName}`;
    const teamEmailText = `
New Contact Form Submission

Company Name: ${formData.companyName}
Contact Person: ${formData.contactPerson}
Email: ${formData.email}

Project Details:
${formData.projectDetails}

---
This inquiry was submitted via the contact form on kemetgarment.com
    `.trim();

    const teamEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #2c3e50; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #2c3e50; }
    .value { margin-top: 5px; }
    .project-details { background-color: white; padding: 15px; border-left: 4px solid #3498db; margin-top: 10px; white-space: pre-wrap; }
    .footer { background-color: #ecf0f1; padding: 15px; text-align: center; font-size: 12px; color: #7f8c8d; border-radius: 0 0 5px 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Company Name:</div>
        <div class="value">${escapeHtml(formData.companyName)}</div>
      </div>
      <div class="field">
        <div class="label">Contact Person:</div>
        <div class="value">${escapeHtml(formData.contactPerson)}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${escapeHtml(formData.email)}">${escapeHtml(formData.email)}</a></div>
      </div>
      <div class="field">
        <div class="label">Project Details:</div>
        <div class="project-details">${escapeHtml(formData.projectDetails)}</div>
      </div>
    </div>
    <div class="footer">
      This inquiry was submitted via the contact form on <a href="https://www.kemetgarment.com">kemetgarment.com</a>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Auto-reply email to customer
    const customerEmailSubject = 'We received your inquiry — Kemet Garment';
    const customerEmailText = `
Hello ${formData.contactPerson},

Thank you for contacting Kemet Garment. We received your inquiry and will get back to you within 24–48 hours (business days).

Best regards,
Mohamed Ezzat
CEO | Kemet Garment
+20 111 771 1147
www.kemetgarment.com
    `.trim();

    const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
    .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
    .message { font-size: 16px; margin-bottom: 20px; }
    .signature { margin-top: 30px; border-top: 2px solid #3498db; padding-top: 20px; }
    .signature-name { font-weight: bold; font-size: 16px; color: #2c3e50; }
    .signature-title { color: #7f8c8d; font-size: 14px; margin-top: 5px; }
    .signature-contact { color: #3498db; font-size: 14px; margin-top: 10px; }
    .footer { background-color: #ecf0f1; padding: 15px; text-align: center; font-size: 12px; color: #7f8c8d; border-radius: 0 0 5px 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">Kemet Garment</h2>
    </div>
    <div class="content">
      <div class="message">
        <p>Hello ${escapeHtml(formData.contactPerson)},</p>
        <p>Thank you for contacting Kemet Garment. We received your inquiry and will get back to you within 24–48 hours (business days).</p>
      </div>
      <div class="signature">
        <div class="signature-name">Best regards,<br>Mohamed Ezzat</div>
        <div class="signature-title">CEO | Kemet Garment</div>
        <div class="signature-contact">
          +20 111 771 1147<br>
          <a href="https://www.kemetgarment.com" style="color: #3498db; text-decoration: none;">www.kemetgarment.com</a>
        </div>
      </div>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} Kemet Garment. All rights reserved.
    </div>
  </div>
</body>
</html>
    `.trim();

    // Send both emails
    // NOTE: You could add rate-limiting here using Upstash Redis or similar
    // Example: await checkRateLimit(formData.email);

    // Email to team
    await transporter.sendMail({
      from: `"Kemet Garment" <${SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: `"${formData.contactPerson}" <${formData.email}>`,
      subject: teamEmailSubject,
      text: teamEmailText,
      html: teamEmailHtml
    });

    // Auto-reply to customer
    await transporter.sendMail({
      from: `"Kemet Garment" <${SMTP_USER}>`,
      to: formData.email,
      replyTo: `"Kemet Garment" <${SMTP_USER}>`,
      subject: customerEmailSubject,
      text: customerEmailText,
      html: customerEmailHtml
    });

    // Success response
    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('Error sending email:', error);

    // Return generic error to client (don't expose internal details)
    return res.status(500).json({
      ok: false,
      error: 'Failed to send email. Please try again later.'
    });
  }
}
