import { Seo } from '@/components/common';
import {
  experiences,
  featuredProjects,
  featuredSkills,
  profile,
  projects,
  siteMeta,
  skills,
  socialLinks,
} from '@/data';
import { AboutPreview } from './sections/AboutPreview';
import { CallToAction } from './sections/CallToAction';
import { ExperiencePreview } from './sections/ExperiencePreview';
import { FeaturedSkills } from './sections/FeaturedSkills';
import { FeaturedWork } from './sections/FeaturedWork';
import { Hero } from './sections/Hero';

const HOME_LATEST_COUNT = 3;
const HOME_EXPERIENCE_COUNT = 3;
const HOME_SKILL_COUNT = 9;
const TICKER_COUNT = 16;

const latestProjects = [...projects]
  .sort((a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate))
  .slice(0, HOME_LATEST_COUNT);

const ticker = skills.slice(0, TICKER_COUNT).map((skill) => skill.name);

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  description: profile.summary,
  url: siteMeta.url,
  email: profile.email,
  sameAs: socialLinks.filter((link) => link.href.startsWith('http')).map((link) => link.href),
};

export default function Home() {
  return (
    <>
      <Seo structuredData={structuredData} />

      <Hero profile={profile} projectCount={projects.length} />
      <AboutPreview profile={profile} ticker={ticker} />
      <FeaturedWork featured={featuredProjects} latest={latestProjects} />
      <FeaturedSkills skills={featuredSkills.slice(0, HOME_SKILL_COUNT)} />
      <ExperiencePreview experiences={experiences.slice(0, HOME_EXPERIENCE_COUNT)} />
      <CallToAction profile={profile} socials={socialLinks} />
    </>
  );
}
