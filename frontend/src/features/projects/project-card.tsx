import Image from 'next/image';
import Link from 'next/link';

import { TiltCard } from '@/components/ui/tilt-card';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/api';

interface ProjectCardProps {
  project: Project;
}

const TAG_GRADIENTS = ['text-gradient-blue', 'text-gradient-green', 'text-gradient-pink'] as const;

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <TiltCard className="h-full">
      <article className="group relative flex h-full flex-col rounded-2xl bg-muted p-5 shadow-card">
        <div className="relative flex h-48 items-end overflow-hidden rounded-2xl bg-surface-raised p-4">
          {project.image ? (
            <Image
              src={project.image}
              // The title is right below, so the screenshot is decorative here.
              alt=""
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span
              aria-hidden
              className="absolute -top-10 -right-10 size-40 rounded-full bg-gradient-green-pink opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
            />
          )}
          <p className="relative rounded-full bg-background/80 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
            {project.year}
          </p>
        </div>

        <h3 className="mt-5 text-2xl font-bold transition-colors group-hover:text-primary">
          {/* Stretched link: the whole card is clickable while keeping a single focusable element. */}
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-primary">{project.context}</p>
        <p className="mt-3 line-clamp-4 flex-1 text-sm text-muted-foreground">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1" aria-label="Công nghệ sử dụng">
          {project.techStack.map((tech, index) => (
            <li key={tech} className={cn('text-sm', TAG_GRADIENTS[index % TAG_GRADIENTS.length])}>
              #{tech}
            </li>
          ))}
        </ul>
      </article>
    </TiltCard>
  );
}
