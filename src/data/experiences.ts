import type { Experience } from '../types/portfolio';

export const experiences: Experience[] = [
  {
    company: 'Coinbase',
    role: 'Software Development Engineer II',
    period: 'April 2025 — Present',
    description: 'Led backend development for new payment experiences',
    highlights: [
      '15× increase in off-chain payment volume through simplified UX',
      '20K+ new accounts onboarded via phone number payments',
      'Built PayLink lifecycle management system in DynamoDB',
    ],
    tag: 'Fintech',
    animation: 'coinbase',
  },
  {
    company: 'DoorDash',
    role: 'Software Development Engineer',
    period: 'January 2022 — April 2025',
    description: 'Scaled platforms across multiple teams and markets',
    highlights: [
      '$128M annual GMV from route-based delivery coverage system',
      '95K MAU growth via AI-powered store recommendations',
      'Launched internationalization across 4 countries',
    ],
    tag: 'Logistics',
    animation: 'doordash',
  },
];
