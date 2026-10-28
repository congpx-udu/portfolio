import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { getProjects } from '@/services/projects.service';

import { ProjectCard } from './project-card';

export async function ProjectsSection() {
  const projects = await getProjects({ featured: true });

  return (
    <Section id="projects" eyebrow="Sản phẩm của tôi" title="Dự án nổi bật.">
      <Reveal className="max-w-3xl text-[1.0625rem] leading-[1.875rem] text-muted-foreground">
        <p>
          Những dự án dưới đây thể hiện kỹ năng và kinh nghiệm thực tế của tôi. Mỗi dự án có mô tả
          ngắn và công nghệ sử dụng — bấm vào thẻ để xem chi tiết.
        </p>
      </Reveal>

      {projects.length === 0 ? (
        <p className="mt-16 text-muted-foreground">
          Chưa thể tải danh sách dự án. Vui lòng thử lại sau.
        </p>
      ) : (
        <ul className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.slug} delay={index * 0.15}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      )}
    </Section>
  );
}
