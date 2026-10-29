import { Container } from '@/components/ui/container';

// Shown instantly on click while the project is fetched (the API may be cold-starting),
// mirroring the ProjectDetail layout so the real content replaces it without a jump.
export default function ProjectLoading() {
  return (
    <div className="pt-32 pb-20" role="status" aria-live="polite">
      <span className="sr-only">Đang tải dự án…</span>
      <Container aria-hidden className="max-w-4xl animate-pulse">
        <div className="mb-8 h-9 w-28 rounded-xl bg-muted" />
        <div className="h-12 w-3/4 rounded-xl bg-muted sm:h-14" />
        <div className="mt-5 space-y-3">
          <div className="h-5 w-full rounded bg-muted" />
          <div className="h-5 w-5/6 rounded bg-muted" />
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="h-20 bg-muted" />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="h-7 w-20 rounded-full bg-muted" />
          ))}
        </div>
        <div className="mt-12 aspect-video w-full rounded-2xl bg-muted" />
      </Container>
    </div>
  );
}
