import type { ContactChannel, Education, NavItem, Profile } from '@/types';

/** Deterministic monochrome placeholders | swap for CMS media URLs later. */
export const media = (seed: string, w = 1600, h = 900) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`;

export const profile: Profile = {
  name: 'azrayaal',
  initials: 'AY',
  title: 'Full Stack Developer',
  tagline: 'Interfaces, infrastructure, and everything between.',
  headline: 'Azra Yazid',
  summary:
  'I build scalable web applications from frontend to backend, focusing on performance, maintainability, and user experience. I enjoy turning complex business requirements into reliable, production-ready software.',
  bio: [
    'I am a Full Stack Developer with experience building modern web applications using React, Node.js, Laravel, and cloud-based technologies. I enjoy creating scalable solutions that combine intuitive user experiences with robust backend architectures.',
    'My work spans frontend development, backend services, RESTful APIs, database design, authentication systems, deployment pipelines, and cloud infrastructure. I believe maintainable architecture and clean code are just as important as delivering features quickly.',
    'I continuously explore new technologies and best practices to build secure, high-performance applications that are easy to scale, maintain, and evolve as business needs grow.',
  ],
  location: 'Jakarta, Indonesia',
  timezone: 'GMT+7',
  email: 'hello@azrayaal.dev',
  availability: 'Available for select engagements | Q3 2026',
  available: true,
  experienceSince: '2022',
  resumeUrl: '/Azra-Yazid-resume.pdf',
  avatar: '/azra.jpeg',
  statistics: [
    {
      id: 'stat-years',
      label: 'Years experience',
      value: 4,
      suffix: '+',
      description: 'build and maintain web applications for startups and scale-ups.',
    },
    {
      id: 'stat-projects',
      label: 'Projects delivered',
      value: 12,
      suffix: '',
      description: 'From zero-to-one products to platform rewrites.',
    },
    {
      id: 'stat-clients',
      label: 'Clients & teams',
      value: 8,
      suffix: '',
      description: 'Startups, scale-ups, and a few freelancing projects.',
    },
    {
      id: 'stat-tech',
      label: 'Technologies',
      value: '∞',
      suffix: '',
      description: 'Languages, frameworks, and platforms in active rotation.',
    },
  ],
};

export const education: Education[] = [
  {
    id: 'edu-1',
    degree: "Bachelor's Degree in English Literature",
    institution: 'Universitas Pamulang',
    location: 'South Tangerang, Indonesia',
    startYear: '2016',
    endYear: '2023',
    description:
      'Graduated with a GPA of 3.20/4.00. During my studies, I developed strong analytical thinking, communication, and problem-solving skills while actively pursuing a career in software development through self-learning and hands-on professional experience.',
  },
  {
    id: 'edu-2',
    degree: "Full Stack Web Development Bootcamp",
    institution: 'Dumbways.id',
    location: 'South Tangerang, Indonesia',
    startYear: '2023',
    endYear: '2024',
    description:
      'Completed an intensive 6-month bootcamp focused on full stack web development, covering both frontend and backend technologies. Gained practical experience in building web applications, working with databases, and deploying projects to production environments.',
  },
];

export const contactChannels: ContactChannel[] = [
  {
    id: 'contact-email',
    label: 'Email',
    value: 'hello@azrayaal.dev',
    href: 'mailto:hello@azrayaal.dev',
    icon: 'Mail',
  },
  {
    id: 'whatsapp',
    label: 'whatsapp',
    value: '+62 856 9436 8835',
    href: 'https://wa.me/6285694368835',
    icon: 'Smartphone',
  },
  {
    id: 'contact-location',
    label: 'Based in',
    value: 'Jakarta, Indonesia | GMT+7',
    href: 'https://maps.google.com/?q=Jakarta',
    icon: 'MapPin',
  },
];

export const primaryNav: NavItem[] = [
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const siteMeta = {
  siteName: 'azrayaal',
  url: 'https://azrayaal.dev',
  defaultTitle: 'azrayaal | Full Stack Developer',
  defaultDescription:
    'I build scalable web applications from frontend to backend, focusing on performance, maintainability, and user experience.',
  ogImage: media('azra-og', 1200, 630),
  twitter: '@azrayaal',
} as const;
