import { AboutSection } from '@/features/about';
import { ContactSection } from '@/features/contact';
import { ExperienceSection } from '@/features/experience';
import { HeroSection } from '@/features/hero';
import { ProjectsSection } from '@/features/projects';
import { SkillsSection } from '@/features/skills';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
