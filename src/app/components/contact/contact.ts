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
      projectDetails: ['', [Validators.required, Validators.minLength(10)]],
      honeypot: [''] // Spam trap - should remain empty
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

    // Send to our Vercel serverless function
    // This will send two emails:
    // 1. To info@kemetgarment.com with the inquiry details
    // 2. Auto-reply to the customer confirming receipt
    this.http.post<{ ok: boolean; error?: string }>('/api/contact', {
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      email: formData.email,
      projectDetails: formData.projectDetails,
      honeypot: formData.honeypot
    }).subscribe({
      next: (response) => {
        if (response.ok) {
          this.submitting.set(false);
          this.submitSuccess.set(true);
          this.contactForm.reset();

          // Hide success message after 5 seconds
          setTimeout(() => {
            this.submitSuccess.set(false);
          }, 5000);
        } else {
          // Server returned ok: false
          console.error('Server error:', response.error);
          this.submitting.set(false);
          this.submitError.set(true);

          // Hide error message after 5 seconds
          setTimeout(() => {
            this.submitError.set(false);
          }, 5000);
        }
      },
      error: (error) => {
        console.error('Error sending email:', error);
        this.submitting.set(false);
        this.submitError.set(true);

        // Hide error message after 5 seconds
        setTimeout(() => {
          this.submitError.set(false);
        }, 5000);
      }
    });
  }
}
