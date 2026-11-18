export interface HeroData {
  badge: string;
  name: string;
  lastName: string;
  typewriterLines: string[];
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  github?: string;
  image: string;
  tags: string[];
  color: string;
  featured: boolean;
  createdAt?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  color: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  major: string;
  period: string;
  institution: string;
  location: string;
  description: string;
}

export interface EducationData {
  items: EducationEntry[];
  philosophy: {
    quote: string;
    author: string;
  };
  subheading?: string;
}

export interface SocialLink {
  id: string;
  name: string;
  icon: string;
  href: string;
  color: string;
}

export interface ContactData {
  title: string;
  titleHighlight: string;
  description: string;
  footerNote: string;
  socialLinks: SocialLink[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  content?: string;
  published: boolean;
  createdAt?: string;
}
