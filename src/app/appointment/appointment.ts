import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { Header } from '../header/header';

// From your EmailJS account: https://dashboard.emailjs.com/admin
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

@Component({
  selector: 'app-appointment',
  imports: [ReactiveFormsModule],
  templateUrl: './appointment.html',
  styleUrl: './appointment.scss',
})
export class Appointment {
  private fb = inject(FormBuilder);

  placements = [
    'Arm',
    'Forearm',
    'Shoulder',
    'Chest',
    'Back',
    'Ribs',
    'Thigh',
    'Calf',
    'Hand',
    'Neck',
    'Other',
  ];

  readonly maxFiles = 5;
  files = signal<File[]>([]);
  submitted = signal(false);
  sending = signal(false);
  errorMessage = signal<string | null>(null);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.pattern(/^\d{1,3}$/)]],
    tattooIdea: ['', Validators.required],
    placement: ['', Validators.required],
  });

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const incoming = Array.from(input.files);
    this.files.set([...this.files(), ...incoming].slice(0, this.maxFiles));
    input.value = '';
  }

  removeFile(index: number): void {
    const next = this.files().slice();
    next.splice(index, 1);
    this.files.set(next);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email, age, tattooIdea, placement } = this.form.value;

    this.sending.set(true);
    this.errorMessage.set(null);

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { firstName, lastName, email, age, tattooIdea, placement },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
      .then(() => {
        this.sending.set(false);
        this.submitted.set(true);
      })
      .catch(() => {
        this.sending.set(false);
        this.errorMessage.set(
          "Something went wrong sending your request. Please try again or email me directly.",
        );
      });
  }
}
