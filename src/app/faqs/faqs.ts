import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Faq {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faqs',
  imports: [RouterLink],
  templateUrl: './faqs.html',
  styleUrl: './faqs.scss',
})
export class Faqs {
  faqs: Faq[] = [
    {
      question: 'Can I book a consultation?',
      answer:
        "Yes, consultations are free. Reach out through the appointment form and we'll go over your idea, placement, and sizing before booking your session.",
    },
    {
      question: 'Do I need to leave a deposit?',
      answer:
        'A non-refundable deposit is required to secure your appointment. It goes toward the final price of your tattoo.',
    },
    {
      question: 'Can I reschedule my appointment?',
      answer:
        'Appointments can be rescheduled with at least 48 hours notice. Less notice, or missing your appointment, may result in losing your deposit.',
    },
  ];

  openIndex = signal<number | null>(null);

  toggle(index: number): void {
    this.openIndex.set(this.openIndex() === index ? null : index);
  }
}
