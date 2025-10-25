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

    // Using FormSubmit.co - simple and reliable email forwarding service
    // Using verification code instead of plain email for security
    const formSubmitUrl = 'https://formsubmit.co/ajax/5c3829c5b6fde38dfec256387cc721ae';

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
        _captcha: 'false',
        _autoresponse: 'Thank you for contacting Kemet Garment! We have received your inquiry and will get back to you within 24-48 hours (business days).',
        _replyto: formData.email
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
