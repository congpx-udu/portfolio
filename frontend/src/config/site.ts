// Single source of truth for personal content. Edit this file to personalise the portfolio.
// TODO: replace every placeholder below with your real information.

export const siteConfig = {
  name: 'Phạm Xuân Công',
  role: 'Frontend Developer',
  tagline: 'Kiến tạo trải nghiệm số mượt mà, tối ưu hiệu năng và tỉ mỉ đến từng điểm ảnh.',
  description:
    'Frontend Developer đam mê xây dựng các ứng dụng web hiện đại với React, Next.js và TypeScript. Luôn đặt trải nghiệm người dùng, tính dễ tiếp cận (a11y) và hiệu năng hệ thống làm trọng tâm.',
  avatar: '/images/avatar.png',
  location: 'Hà Nội, Việt Nam',
  email: 'congpx.ptit@gmail.com',
  resumeUrl: '/resume.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/congpx-udu' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-username' },
  ],
} as const;

// Third-party assets licensed CC BY 4.0 — the licence requires visible attribution.
export const credits = [
  {
    work: 'Stylized planet',
    workUrl: 'https://sketchfab.com/3d-models/stylized-planet-789725db86f547fc9163b00f302c3e70',
    author: 'cmzw',
    authorUrl: 'https://sketchfab.com/cmzw',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  },
] as const;

export const navItems = [
  { label: 'Giới thiệu', href: '#about' },
  { label: 'Kỹ năng', href: '#skills' },
  { label: 'Kinh nghiệm', href: '#experience' },
  { label: 'Dự án', href: '#projects' },
  { label: 'Liên hệ', href: '#contact' },
] as const;

export const about = [
  'Tôi là Frontend Developer với niềm đam mê biến thiết kế thành những sản phẩm web mượt mà, có thể mở rộng và thân thiện với mọi người dùng.',
  'Tôi quan tâm đặc biệt tới kiến trúc component, design system, hiệu năng (Core Web Vitals) và accessibility.',
] as const;

export const services = [
  { title: 'Xây dựng giao diện web', icon: 'code' },
  { title: 'Hệ thống quản trị', icon: 'layout' },
  { title: 'Dashboard & trực quan hoá dữ liệu', icon: 'chart' },
  { title: 'Tối ưu hiệu năng & SEO', icon: 'gauge' },
] as const;

export const skillGroups = [
  { title: 'Ngôn ngữ', items: ['TypeScript', 'JavaScript (ES2023+)', 'HTML5', 'CSS3'] },
  { title: 'Framework & Thư viện', items: ['React', 'Next.js', 'Zustand'] },
  {
    title: 'Styling',
    items: ['Tailwind CSS', 'CSS Modules', 'Responsive Design'],
  },
  { title: 'Công cụ', items: ['Vite', 'Git', 'Vitest', 'Figma'] },
] as const;

export const experiences = [
  {
    company: 'OpenNezt',
    position: 'Intern Frontend Developer',
    period: '1-2026 — Hiện tại',
    highlights: [
      'Phát triển và tối ưu hóa giao diện người dùng có khả năng thích ứng (responsive) bằng các framework hiện đại (React.js) nhằm đảm bảo trải nghiệm liền mạch trên mọi thiết bị.',
      'Tích hợp RESTful API với các thư viện quản lý trạng thái (Redux/Context API) để đảm bảo luồng dữ liệu hiệu quả giữa frontend và backend.',
      'Phối hợp với các nhà thiết kế UI/UX để chuyển đổi các bản mẫu Figma có độ chi tiết cao (high-fidelity) thành các ứng dụng web có tính tương tác và độ chính xác tuyệt đối đến từng điểm ảnh (pixel-perfect).',
      'Tham gia vào quy trình làm việc Agile, bao gồm lập kế hoạch sprint và đánh giá mã nguồn chéo, nhằm duy trì chất lượng mã nguồn cao và đảm bảo tiến độ dự án.',
    ],
  },
  {
    company: 'ZenSoft',
    position: 'Intern Frontend Developer',
    period: '9-2025 — 12-2025',
    highlights: [
      'Xây dựng các thư viện thành phần giao diện người dùng có thể tái sử dụng nhằm chuẩn hóa các mẫu thiết kế và đẩy nhanh chu trình phát triển trên nhiều dự án.',
      'Tái cấu trúc kiến trúc frontend nhằm cải thiện khả năng bảo trì và đảm bảo tính tương thích trên các trình duyệt (Chrome, Safari, Edge).',
      'Đóng góp vào các hoạt động đánh giá và họp rút kinh nghiệm sau mỗi Sprint nhằm tối ưu hóa năng suất và tiến độ bàn giao của nhóm.',
    ],
  },
] as const;
