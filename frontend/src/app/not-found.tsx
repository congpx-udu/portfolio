import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export default function NotFound() {
  return (
    <Container className="flex min-h-svh flex-col items-center justify-center pt-20 text-center">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-2 text-4xl font-bold">Không tìm thấy trang</h1>
      <p className="mt-4 text-muted-foreground">
        Trang bạn tìm không tồn tại hoặc đã bị di chuyển.
      </p>
      <ButtonLink href="/" className="mt-8">
        Về trang chủ
      </ButtonLink>
    </Container>
  );
}
