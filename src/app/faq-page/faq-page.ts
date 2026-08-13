import { Component, signal } from '@angular/core';
import { Header } from '../header/header';

interface Faq {
  question: string;
  answer: string;
}

interface FaqColumn {
  heading: string;
  italic?: boolean;
  faqs?: Faq[];
  image?: { src: string; alt: string };
}

interface FaqSection {
  columns: FaqColumn[];
}

@Component({
  selector: 'app-faq-page',
  imports: [Header],
  templateUrl: './faq-page.html',
  styleUrl: './faq-page.scss',
})
export class FaqPage {
  sections: FaqSection[] = [
    {
      columns: [
        {
          heading: 'Consultations & Booking',
          faqs: [
            {
              question: 'Can I book a consultation?',
              answer:
                "Yes, consultations are free. Reach out through the appointment form and we'll go over your idea, placement, and sizing before booking your session.",
            },
            {
              question: 'How do I request an appointment?',
              answer:
                "Fill out the appointment request form with your idea, placement, and any reference images. I'll follow up by email to confirm the details and schedule your session.",
            },
            {
              question: 'Do I need to leave a deposit?',
              answer:
                'A non-refundable deposit is required to secure your appointment. It goes toward the final price of your tattoo.',
            },
          ],
        },
        {
          heading: 'Deposits & Rescheduling',
          faqs: [
            {
              question: 'Are deposits refundable?',
              answer:
                'Deposits are non-refundable. They cover the time set aside for your design and your appointment slot.',
            },
            {
              question: 'Does the deposit go toward my tattoo?',
              answer:
                'Yes, your deposit is subtracted from the final cost of your tattoo on the day of your appointment.',
            },
            {
              question: 'When is the deposit due?',
              answer: 'The deposit is due at the time of booking to confirm and hold your appointment slot.',
            },
            {
              question: 'How do I send my deposit?',
              answer:
                "Once your appointment is confirmed, I'll send over a secure payment link with instructions.",
            },
            {
              question: 'Can I reschedule my appointment?',
              answer:
                'Appointments can be rescheduled with at least 48 hours notice. Less notice, or missing your appointment, may result in losing your deposit.',
            },
            {
              question: 'Can I give my appointment to someone else?',
              answer:
                'Appointments and deposits are non-transferable and tied to the person who attended the consultation.',
            },
          ],
        },
      ],
    },
    {
      columns: [
        {
          heading: 'Designs',
          faqs: [
            {
              question: 'What if I change my mind about the design?',
              answer:
                "That's okay. Minor changes can be made before your appointment, so let me know as early as possible to leave time to adjust.",
            },
            {
              question: 'When will I receive my design?',
              answer:
                'Designs are typically finalized a day or two before your appointment, or shown to you in person on the day.',
            },
            {
              question: 'How many times can I change my design?',
              answer:
                'One round of revisions is included. Extensive redesigns beyond that may call for a new consultation.',
            },
            {
              question: "What if I don't like the design?",
              answer:
                "We'll talk through what isn't working and adjust it together until you're happy, or reschedule if more time is needed.",
            },
            {
              question: 'Can you copy a tattoo exactly from a photo?',
              answer:
                "No, I don't copy other artists' work directly, but I'm happy to use a photo as inspiration for something original.",
            },
          ],
        },
        {
          heading: '',
          image: {
            src: 'for_faq.jpg',
            alt: 'Close-up of a detailed ink-wash tattoo design',
          },
        },
      ],
    },
    {
      columns: [
        {
          heading: 'Pricing & Booking',
          faqs: [
            {
              question: 'What are your rates?',
              answer: "Pricing is based on size, placement, and detail. You'll receive an estimate after your consultation.",
            },
            {
              question: 'How long is the tattoo session?',
              answer: 'Sessions typically run 2-6 hours depending on the size and complexity of the piece.',
            },
            {
              question: 'How much will my tattoo cost?',
              answer:
                "Cost depends on the design. I'll give you a clear quote once we've discussed size, placement, and detail.",
            },
          ],
        },
        {
          heading: 'Before & During Your Appointment',
          italic: true,
          faqs: [
            {
              question: 'How should I prepare for my appointment?',
              answer:
                "Get a good night's sleep, eat beforehand, and stay hydrated. Wear comfortable clothing that gives easy access to the area.",
            },
            {
              question: 'Should I shave before my appointment?',
              answer: "There's no need. I'll shave the area for you before we begin.",
            },
            {
              question: 'Can I bring a friend?',
              answer: 'One guest is welcome, space permitting. Let me know in advance so I can plan for it.',
            },
          ],
        },
      ],
    },
    {
      columns: [
        {
          heading: 'Pain & Comfort',
          faqs: [
            {
              question: 'Does getting a tattoo hurt?',
              answer:
                "There's some discomfort, but it's manageable and varies by placement. I'll check in with you throughout the session.",
            },
            {
              question: 'Can I use numbing cream?',
              answer: 'Yes, numbing cream is fine. Apply it as directed about an hour before your appointment.',
            },
            {
              question: 'Can I bring headphones or listen to music?',
              answer: "Of course. Feel free to bring headphones, or we can put music on in the studio.",
            },
          ],
        },
        {
          heading: 'Healing & Touch-ups',
          faqs: [
            {
              question: 'How long before I can go back to the gym or swimming?',
              answer: 'Avoid the gym, pools, and open water for about 2 weeks while your tattoo heals.',
            },
            {
              question: 'Do you offer touch-ups?',
              answer: 'Yes, a complimentary touch-up is included within 6 months of your appointment.',
            },
          ],
        },
      ],
    },
    {
      columns: [
        {
          heading: 'General',
          faqs: [
            {
              question: 'Where are you based?',
              answer: 'The studio is located at 148 Ludlow Street, New York, NY 10002.',
            },
            {
              question: 'Do you do colour tattoos?',
              answer:
                'My work is focused on black and grey abstract/flow style, though limited colour accents can be discussed.',
            },
            {
              question: 'Do you do cover-ups?',
              answer: 'Yes, send photos of the existing tattoo through the appointment form and we\'ll discuss options at your consultation.',
            },
            {
              question: 'Do you tattoo over scars or stretch marks?',
              answer: "It depends on the scar's age and texture. Send photos ahead of time so we can assess it together.",
            },
            {
              question: "Can I get tattooed if I'm pregnant or breastfeeding?",
              answer: "No, for safety reasons I don't tattoo clients who are pregnant or breastfeeding.",
            },
          ],
        },
        {
          heading: 'Aftercare',
          faqs: [
            {
              question: 'How do I look after my new tattoo?',
              answer:
                'Keep it clean, moisturized with a fragrance-free lotion, and out of the sun. Detailed aftercare instructions are sent after your session.',
            },
            {
              question: 'How long does healing take?',
              answer:
                'Most tattoos heal on the surface within 2-3 weeks, with full healing underneath taking up to 6 weeks.',
            },
          ],
        },
      ],
    },
  ];

  openKey = signal<string | null>(null);

  key(sectionIndex: number, columnIndex: number, faqIndex: number): string {
    return `${sectionIndex}-${columnIndex}-${faqIndex}`;
  }

  isOpen(sectionIndex: number, columnIndex: number, faqIndex: number): boolean {
    return this.openKey() === this.key(sectionIndex, columnIndex, faqIndex);
  }

  toggle(sectionIndex: number, columnIndex: number, faqIndex: number): void {
    const key = this.key(sectionIndex, columnIndex, faqIndex);
    this.openKey.set(this.openKey() === key ? null : key);
  }
}
