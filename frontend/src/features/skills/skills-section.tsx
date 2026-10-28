import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { skillGroups } from '@/config/site';

export function SkillsSection() {
  return (
    <Section id="skills" eyebrow="Những gì tôi sử dụng" title="Kỹ năng.">
      <ul className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal
            as="li"
            key={group.title}
            delay={index * 0.1}
            className="rounded-2xl bg-muted p-6 shadow-card"
          >
            <h3 className="mb-4 text-lg font-bold">{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li key={skill}>
                  <Badge>{skill}</Badge>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
