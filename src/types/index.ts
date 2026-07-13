/**
 * Content contracts.
 *
 * These types are the boundary between the UI and whatever supplies content.
 * Today the implementation lives in `src/data/*`; swapping it for a CMS client
 * means satisfying these shapes and nothing in `components/` or `pages/` moves.
 */

export type AccentColor = 'brand' | 'blue' | 'pink' | 'teal' | 'orange' | 'cyan';

export type ProjectStatus = 'live' | 'in-progress' | 'archived' | 'concept';

export type ProjectCategory =
  | 'Corporate Website'
  | 'Dashboard'
  | 'Booking System'
  | 'HRIS'
  | 'Warehouse Management'
  | 'E-Commerce'
  | 'Membership'
  | 'Service Marketplace'
  | 'Enterprise Dashboard'
  | 'Ticketing'
  | 'Digital Commerce';


export interface ProjectLinks {
  github?: string;
  demo?: string;
  figma?: string;
  website?: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ArchitectureLayer {
  layer: string;
  detail: string;
}

/**
 * Only the fields every project genuinely has are required. The case-study
 * fields below them are optional: a project renders those sections when the
 * content exists and silently drops them when it does not, so a half-documented
 * project never shows an empty heading.
 */
export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;

  thumbnail: string;
  coverImage: string;

  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;

  /** Calendar year the work shipped, e.g. "2026". Drives sorting and display. */
  year: string;

  techStack: string[];
  tags: string[];

  role: string;
  links: ProjectLinks;
  color: AccentColor;

  // ── Optional case-study detail ───────────────────────────────────────
  duration?: string;
  teamSize?: number;
  gallery?: GalleryImage[];
  features?: ProjectFeature[];
  highlights?: string[];
  problem?: string;
  solution?: string;
  result?: string;
  architecture?: ArchitectureLayer[];
}

export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'Mobile'
  | 'Cloud'
  | 'Database'
  | 'DevOps'
  | 'Testing'
  | 'Tools';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  /** 0–100. Drives the progress indicator. */
  level: number;
  years: number;
  color: AccentColor;
  description: string;
  /** Lucide icon name, resolved at render time. */
  icon: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Freelance' | 'Internship';
  startDate: string;
  /** `null` means "present". */
  endDate: string | null;
  description: string;
  achievements: string[];
  stack: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface Statistic {
  id: string;
  label: string;
  value: number | string;
  suffix?: string;
  description: string;
}

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  href: string;
}

export interface NavItem {
  label: string;
  to: string;
}

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: string;
}

export interface Profile {
  name: string;
  initials: string;
  title: string;
  tagline: string;
  headline: string;
  summary: string;
  bio: string[];
  location: string;
  timezone: string;
  email: string;
  availability: string;
  available: boolean;
  experienceSince: string;
  resumeUrl: string;
  avatar: string;
  statistics: Statistic[];
}
