import Image from 'next/image';
import type { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import type { Project } from '@/types/api';

interface ProjectDetailProps {
  project: Project;
}

interface DetailBlockProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const facts = [
    { label: 'Vai trò', value: project.role },
    { label: 'Bối cảnh', value: project.context },
    { label: 'Năm', value: String(project.year) },
  ];

  return (
    <article className="pt-32 pb-20">
      <Container className="max-w-4xl">
        <ButtonLink href="/#projects" variant="ghost" size="sm" className="mb-8 -ml-3">
          ← Quay lại
        </ButtonLink>

        <Reveal direction="down">
          <h1 className="text-4xl leading-tight font-black tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">{project.summary}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-gradient-green-pink p-px sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-muted p-5">
                <dt className="text-xs tracking-wider text-muted-foreground uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1 font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Công nghệ sử dụng">
            {project.techStack.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>

          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {project.liveUrl && (
                <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Xem sản phẩm
                </ButtonLink>
              )}
              {project.repoUrl && (
                <ButtonLink
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                >
                  Source code
                </ButtonLink>
              )}
            </div>
          )}
        </Reveal>

        {project.image && (
          <Reveal delay={0.2} className="mt-12">
            <figure className="overflow-hidden rounded-2xl bg-gradient-green-pink p-px shadow-card">
              <Image
                src={project.image}
                alt={`Ảnh chụp màn hình ${project.title}`}
                width={1920}
                height={864}
                sizes="(min-width: 896px) 832px, 100vw"
                priority
                className="h-auto w-full rounded-[calc(1rem-1px)]"
              />
            </figure>
          </Reveal>
        )}

        <DetailBlock id="overview" title="Tổng quan">
          <p className="text-lg leading-relaxed text-muted-foreground">{project.description}</p>
        </DetailBlock>

        {project.features.length > 0 && (
          <DetailBlock id="features" title="Tính năng chính">
            <ul className="grid gap-4 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="rounded-2xl bg-muted p-5 text-muted-foreground">
                  {feature}
                </li>
              ))}
            </ul>
          </DetailBlock>
        )}

        {project.contributions.length > 0 && (
          <DetailBlock id="contributions" title="Đóng góp của tôi">
            <ol className="space-y-4">
              {project.contributions.map((contribution, index) => (
                <li key={contribution} className="flex gap-4">
                  <span
                    aria-hidden
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground"
                  >
                    {index + 1}
                  </span>
                  <p className="pt-1 leading-relaxed">{contribution}</p>
                </li>
              ))}
            </ol>
          </DetailBlock>
        )}

        {project.challenges.length > 0 && (
          <DetailBlock id="challenges" title="Thách thức & giải pháp">
            <ul className="space-y-6">
              {project.challenges.map((challenge) => (
                <li
                  key={challenge.title}
                  className="rounded-2xl border-l-4 border-primary bg-surface-raised p-6 shadow-card"
                >
                  <h3 className="text-lg font-bold">{challenge.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Giải pháp: </span>
                    {challenge.solution}
                  </p>
                </li>
              ))}
            </ul>
          </DetailBlock>
        )}
      </Container>
    </article>
  );
}

function DetailBlock({ id, title, children }: DetailBlockProps) {
  const headingId = `${id}-heading`;

  return (
    <Reveal className="mt-16">
      <section aria-labelledby={headingId}>
        <h2 id={headingId} className="mb-6 text-2xl font-black sm:text-3xl">
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}
