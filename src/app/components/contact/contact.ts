import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../../services/translation';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  contactForm: FormGroup;
  submitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal(false);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public translate: TranslationService
  ) {
    this.contactForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      contactPerson: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      projectDetails: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  t(key: string): any {
    return this.translate.get(key);
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.submitting.set(true);
    this.submitSuccess.set(false);
    this.submitError.set(false);

    const formData = this.contactForm.value;

    // Send email using a serverless function or email API
    // For now, we'll use a simple HTTP POST to a backend endpoint
    // You can replace this with EmailJS, SendGrid, or your own backend

    const emailData = {
      to: 'info@kemetgarment.com',
      subject: `New Contact Form Submission from ${formData.companyName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Company Name:</strong> ${formData.companyName}</p>
        <p><strong>Contact Person:</strong> ${formData.contactPerson}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Project Details:</strong></p>
        <p>${formData.projectDetails}</p>
      `
    };

    // Using FormSubmit.co with auto-reply enabled
    const formSubmitUrl = 'https://formsubmit.co/ajax/info@kemetgarment.com';

    fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New Contact from ${formData.companyName}`,
        'Company Name': formData.companyName,
        'Contact Person': formData.contactPerson,
        'Email': formData.email,
        'Project Details': formData.projectDetails,
        _captcha: 'false', // Disable captcha for easier testing
        _autoresponse: 'Thank you for contacting Kemet Garment! We have received your inquiry and will get back to you as soon as possible. Our team typically responds within 24-48 hours during business days.',
        _replyto: formData.email // Send auto-reply to the user's email
      })
    })
    .then(response => response.json())
    .then(data => {
      this.submitting.set(false);
      this.submitSuccess.set(true);
      this.contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        this.submitSuccess.set(false);
      }, 5000);
    })
    .catch(error => {
      console.error('Error sending email:', error);
      this.submitting.set(false);
      this.submitError.set(true);

      // Hide error message after 5 seconds
      setTimeout(() => {
        this.submitError.set(false);
      }, 5000);
    });
  }
}
