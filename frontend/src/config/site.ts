// Single source of truth for personal content. Keep it in sync with the CV in public/cv/.

export const siteConfig = {
  name: 'Phạm Xuân Công',
  role: 'Frontend Developer Intern',
  tagline: 'Kiến tạo trải nghiệm số mượt mà, tối ưu hiệu năng và tỉ mỉ đến từng điểm ảnh.',
  description:
    'Thực tập sinh Frontend với hơn một năm kinh nghiệm React và TypeScript, từng tham gia xây dựng nền tảng đánh giá kỹ năng lập trình OpenNezt và hệ thống phát hiện té ngã Safe-Fall.',
  avatar: '/images/avatar.png',
  location: 'Hà Nội, Việt Nam',
  email: 'congpx.ptit@gmail.com',
  resumeUrl: '/cv/Pham-Xuan-Cong-CV.pdf',
  socials: [{ label: 'GitHub', href: 'https://github.com/congpx-udu' }],
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
  'Tôi là sinh viên năm 3 ngành Công nghệ thông tin tại PTIT, đã có hơn một năm thực tập frontend với React và TypeScript — trong đó có một sản phẩm thương mại với VS Code extension phát hành trên Marketplace.',
  'Tôi thích những bài toán giao diện có chiều sâu: trình phát video, dashboard dữ liệu, tối ưu SEO và hiệu năng (Core Web Vitals) cho ứng dụng SPA, đồng thời đang mở rộng sang backend để hướng tới Fullstack.',
] as const;

export const services = [
  { title: 'Xây dựng giao diện web', icon: 'code' },
  { title: 'Hệ thống quản trị', icon: 'layout' },
  { title: 'Dashboard & trực quan hoá dữ liệu', icon: 'chart' },
  { title: 'Tối ưu hiệu năng & SEO', icon: 'gauge' },
] as const;

export const skillGroups = [
  {
    title: 'Ngôn ngữ',
    items: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Python', 'C++', 'Java'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'UmiJS', 'Redux Toolkit', 'Redux-Saga', 'Context API'],
  },
  {
    title: 'UI & Styling',
    items: ['Tailwind CSS', 'Ant Design / Ant Design Pro', 'Responsive Design', 'Accessibility'],
  },
  { title: 'Biểu đồ & Media', items: ['Recharts', 'ApexCharts', 'HLS.js', 'three.js'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'RESTful API'] },
  { title: 'Công cụ', items: ['Git', 'Vite', 'Figma', 'Vercel', 'Render'] },
] as const;

export const experiences = [
  {
    company: 'OpenNezt',
    position: 'Thực tập sinh Frontend',
    period: '01/2026 — Hiện tại',
    highlights: [
      'Xây dựng màn hình xem lại phiên làm bài của ứng viên: trình phát video HLS nhiều phân đoạn có tua chính xác và thumbnail xem trước, timeline hoạt động đồng bộ cuộn với code diff, terminal và lịch sử hội thoại AI.',
      'Xây dựng hạ tầng SEO cho ứng dụng SPA: prerender bằng Puppeteer, meta/Open Graph theo từng route, sitemap; tối ưu LCP bằng code splitting, lazy-load analytics và preload ảnh hero.',
      'Phát triển thư viện đề, modal tạo đề nhiều bước, luồng onboarding và giao diện chấm điểm cho tech lead; hỗ trợ song ngữ Anh – Việt bằng i18next.',
      'Tham gia backend (Express, MongoDB, BullMQ): quản lý phiên làm bài, pipeline xử lý video, đăng nhập bằng Google và magic code.',
    ],
  },
  {
    company: 'ZentSoft',
    position: 'Thực tập sinh Frontend',
    period: '09/2025 — 12/2025',
    highlights: [
      'Phát triển frontend trang quản trị hệ thống Safe-Fall (giám sát té ngã bằng cảm biến radar) bằng React, Ant Design, Redux Toolkit và Redux-Saga; thành viên đóng góp nhiều nhất team frontend.',
      'Xây dựng module quản lý thiết bị: bảng có lọc, sắp xếp, phân trang, thêm/sửa/xoá; trang chi tiết chuyển chế độ phát hiện té ngã / theo dõi sức khoẻ từ xa, trạng thái online/offline.',
      'Xây dựng dashboard thống kê bằng Recharts: thẻ KPI, trạng thái thiết bị, tỉ lệ té ngã và phân bố té ngã theo giờ.',
    ],
  },
] as const;
