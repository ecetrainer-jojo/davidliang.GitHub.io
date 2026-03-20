export interface NavItem {
  name: string;
  href: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  tag: string;
  animation: 'coinbase' | 'doordash';
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ContactItem {
  label: string;
  value: string;
  href: string | null;
}

export interface HeroContent {
  name: string;
  title: string;
  tagline: string;
  subTagline: string;
  ctaLabel: string;
  ctaHref: string;
}
