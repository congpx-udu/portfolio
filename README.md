# Portfolio — Frontend Developer

Website portfolio cá nhân, gồm 2 project độc lập:

- `frontend/` — Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + three.js (react-three-fiber) + Motion
- `backend/` — Express 5 + TypeScript + Zod (REST API tại `/api`), gửi email liên hệ qua Resend API

## Bắt đầu

```bash
# Terminal 1 — API
cd backend
npm install
cp .env.example .env
npm run dev          # http://localhost:4000/api

# Terminal 2 — Web
cd frontend
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
```

## API

| Method | Path                      | Mô tả                                     |
| ------ | ------------------------- | ----------------------------------------- |
| GET    | `/api/health`             | Health check                              |
| GET    | `/api/projects?featured=` | Danh sách dự án (lọc `featured` tuỳ chọn) |
| GET    | `/api/projects/:slug`     | Chi tiết dự án                            |
| POST   | `/api/contact`            | Gửi tin nhắn liên hệ (rate-limited)       |

Form liên hệ gửi email qua [Resend](https://resend.com): điền `RESEND_API_KEY` và `CONTACT_RECEIVER` trong `backend/.env`
— xem `backend/.env.example`. Để trống thì `POST /api/contact` trả `503`.

## Cá nhân hoá

- Thông tin cá nhân, kỹ năng, kinh nghiệm: `frontend/src/config/site.ts`
- Dự án: `backend/src/data/projects.json`
- Màu sắc / font: `frontend/src/app/globals.css`

Quy chuẩn code, cấu trúc thư mục và thứ tự viết file: xem [CLAUDE.md](./CLAUDE.md).
