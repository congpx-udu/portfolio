import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProjectDetail } from '@/features/projects';
import { getProjectBySlug } from '@/services/projects.service';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
