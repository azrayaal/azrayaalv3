import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Full Stack Developer',
    company: 'Sagara Technology Asia',
    companyUrl: 'https://sagara.asia',
    location: 'Jakarta, Indonesia',
    type: 'Full-time',
    startDate: '2024-12-01',
    endDate: null,
    description:
      'Developing scalable enterprise applications, internal business systems, and B2B platforms while managing frontend, backend, deployment, and system architecture.',
    achievements: [
      'Developed an Office Room Booking System with real-time scheduling and reservation management.',
      'Built a Purchasing System for warehouse operations, improving procurement and inventory workflows.',
      'Implemented a Vendor-Managed Project Management System for project tracking and collaboration.',
      'Developed an Employee Management System covering HR administration and role management.',
      'Built B2B and automotive e-commerce platforms supporting ordering, pricing, and inventory management.',
    ],
    stack: [
      'React',
      'Next.js',
      'Vue',
      'Node.js',
      'NestJS',
      'Laravel',
      'Go',
      'PostgreSQL',
      'Docker',
      'Nginx',
    ],
  },
  {
    id: 'exp-2',
    role: 'Full Stack Developer',
    company: 'Starcom Technology Indonesia',
    location: 'Jakarta, Indonesia',
    type: 'Full-time',
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    description:
      'Designed and developed enterprise systems for logistics, procurement, and cooperative management, delivering scalable web applications from frontend to backend.',
    achievements: [
      'Built an RFID Gate System for Pos Indonesia to automate goods tracking and logistics monitoring.',
      'Designed and developed a Cooperative Management System from scratch.',
      'Developed a Purchasing Management System to streamline procurement workflows and approvals.',
    ],
    stack: [
      'React',
      'Vue',
      'Node.js',
      'Laravel',
      'Go',
      'MySQL',
      'PostgreSQL',
      'Docker',
    ],
  },
  {
    id: 'exp-3',
    role: 'Frontend Developer',
    company: 'Travellergram',
    location: 'Jakarta, Indonesia',
    type: 'Full-time',
    startDate: '2019-11-01',
    endDate: '2020-05-01',
    description:
      'Developed responsive internal dashboards and business applications for monitoring operational activities within a digital travel platform.',
    achievements: [
      'Built responsive dashboards using Vue.js and Tailwind CSS.',
      'Integrated frontend applications with backend APIs.',
      'Optimized UI rendering performance and improved application responsiveness.',
    ],
    stack: [
      'Vue.js',
      'JavaScript',
      'Tailwind CSS',
      'REST API',
    ],
  },
];