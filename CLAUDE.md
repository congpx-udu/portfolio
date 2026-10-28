# CLAUDE.md — Portfolio (Frontend Developer)

Tài liệu này là **quy chuẩn bắt buộc** cho mọi thay đổi trong repo (dành cho cả người và AI agent).
Khi có mâu thuẫn giữa thói quen cá nhân và tài liệu này → **làm theo tài liệu này**.
Khi cần thay đổi quy chuẩn → sửa file này trong cùng PR.

---

## 1. Tổng quan

Website portfolio giới thiệu bản thân với vai trò **Frontend Developer**. Repo gồm **2 project độc lập** — mỗi project tự có `package.json`, `package-lock.json`, `node_modules`, config ESLint/Prettier/TS riêng. **Thư mục gốc không có `package.json`** và không cài gì ở gốc.

| Workspace   | Stack                                                                         | Port |
| ----------- | ----------------------------------------------------------------------------- | ---- |
| `frontend/` | Next.js 16 (App Router, RSC) · React 19 · TypeScript · Tailwind CSS v4 · Zod  | 3000 |
| `backend/`  | Node 22+ · Express 5 · TypeScript (ESM) · Zod · Pino · Helmet · rate-limit    | 4000 |

- Nội dung tĩnh (tên, giới thiệu, kỹ năng, kinh nghiệm) nằm ở `frontend/src/config/site.ts`.
- Dữ liệu động (dự án, form liên hệ) đi qua REST API của backend tại `/api/*`.
- Ngôn ngữ: **code, tên biến, comment, commit message → tiếng Anh**; **nội dung UI hiển thị → tiếng Việt**; tài liệu (`*.md`) → tiếng Việt.

---

## 2. Lệnh thường dùng

Mọi lệnh chạy **bên trong** `frontend/` hoặc `backend/` (không chạy npm ở gốc). Hai project có cùng bộ script:

```bash
cd backend   # hoặc: cd frontend
npm install           # cài dependency của riêng project này
npm run dev           # backend: http://localhost:4000/api · frontend: http://localhost:3000
npm run lint          # ESLint
npm run typecheck     # tsc --noEmit
npm run format        # Prettier ghi đè
npm run check         # lint + typecheck + format:check
npm run build         # build production
npm install <pkg>     # thêm dependency — luôn chạy trong đúng project
```

Chạy full-stack khi dev: mở **2 terminal**, terminal 1 `cd backend && npm run dev`, terminal 2 `cd frontend && npm run dev`.

Env: copy `backend/.env.example → backend/.env`, `frontend/.env.example → frontend/.env.local`.

**Định nghĩa "xong việc"**: trong mỗi project bị sửa, `npm run check && npm run build` đều pass, không còn warning mới.

---

## 3. Cấu trúc thư mục & vị trí file

### 3.1 Toàn repo

```
portfolio/
├── CLAUDE.md               # quy chuẩn (file này)
├── README.md
├── .editorconfig · .gitignore · .vscode/   # chỉ cấu hình editor/git — KHÔNG có package.json
├── frontend/               # project Next.js độc lập
│   ├── package.json · package-lock.json · node_modules/
│   ├── tsconfig.json · next.config.ts · postcss.config.mjs
│   ├── eslint.config.mjs · .prettierrc.json · .prettierignore
│   ├── .env.example        # (.env.local không commit)
│   ├── public/
│   └── src/
└── backend/                # project Express độc lập
    ├── package.json · package-lock.json · node_modules/
    ├── tsconfig.json · tsup.config.ts
    ├── eslint.config.js · .prettierrc.json · .prettierignore
    ├── .env.example        # (.env không commit)
    └── src/
```

Hai project **không import code của nhau**. Contract API được giữ đồng bộ thủ công (xem 4.3).
Config Prettier của 2 project phải giống nhau (frontend thêm `prettier-plugin-tailwindcss`).

### 3.2 Frontend (`frontend/src`)

```
src/
├── app/                        # CHỈ chứa routing (Next.js App Router)
│   ├── layout.tsx              # root layout: font, metadata, header/footer
│   ├── page.tsx                # trang chủ: chỉ ghép các *Section* từ features/
│   ├── globals.css             # Tailwind + design tokens (CSS variables)
│   ├── not-found.tsx
│   └── projects/[slug]/page.tsx
├── components/
│   ├── ui/                     # primitive dùng chung, KHÔNG biết business: button, badge, container, section, reveal, tilt-card
│   └── layout/                 # khung trang: site-header, site-footer, stars-background (nền sao 3D)
├── features/                   # mỗi section/tính năng một thư mục
│   └── <feature>/
│       ├── <feature>-section.tsx   # component chính của feature
│       ├── <sub>-<name>.tsx        # component con chỉ dùng trong feature
│       ├── <feature>.schema.ts     # (tuỳ chọn) zod schema của form
│       ├── use-<name>.ts           # (tuỳ chọn) hook riêng của feature
│       └── index.ts                # public API — chỉ export những gì bên ngoài cần
├── services/                   # hàm gọi API theo domain: projects.service.ts, contact.service.ts
├── lib/                        # hạ tầng thuần, không phụ thuộc domain: api-client, env, utils (cn)
├── hooks/                      # custom hook dùng chung ≥ 2 feature (use-xxx.ts)
├── config/                     # nội dung & cấu hình tĩnh: site.ts (thông tin cá nhân, nav, skills…)
└── types/                      # type dùng chung, contract API (api.ts)
```

### 3.3 Backend (`backend/src`)

```
src/
├── server.ts                   # entry: listen + graceful shutdown (KHÔNG chứa logic)
├── app.ts                      # createApp(): middleware toàn cục → routes → notFound → errorHandler
├── config/env.ts               # đọc & validate biến môi trường bằng zod (nơi DUY NHẤT đọc process.env)
├── routes/index.ts             # mount router của từng module vào /api
├── modules/                    # mỗi domain một thư mục, chia lớp rõ ràng
│   └── <module>/
│       ├── <module>.schema.ts      # zod schema + type suy ra (z.infer)
│       ├── <module>.repository.ts  # truy cập dữ liệu (JSON/DB) — không biết HTTP
│       ├── <module>.service.ts     # business logic — không biết req/res
│       ├── <module>.controller.ts  # nhận req, gọi service, trả res
│       └── <module>.routes.ts      # khai báo Router + middleware
├── middlewares/                # validate, error-handler, not-found, rate-limit
├── utils/                      # http-error, logger
├── types/                      # type dùng chung (ApiSuccess, ApiErrorBody)
└── data/                       # dữ liệu seed dạng JSON
```

### 3.4 Bảng tra nhanh: "Tôi cần … → đặt ở đâu?"

| Cần tạo                                         | Vị trí                                          |
| ----------------------------------------------- | ----------------------------------------------- |
| Một route/trang mới                             | `frontend/src/app/<route>/page.tsx`             |
| Một section mới trên trang chủ                  | `frontend/src/features/<name>/`                 |
| Component dùng ở ≥ 2 feature, không có business | `frontend/src/components/ui/`                   |
| Component chỉ dùng trong 1 feature              | Ngay trong `features/<name>/`                   |
| Header/footer/sidebar                           | `frontend/src/components/layout/`               |
| Hàm gọi API                                     | `frontend/src/services/<domain>.service.ts`     |
| Hook dùng chung                                 | `frontend/src/hooks/use-<name>.ts`              |
| Sửa thông tin cá nhân, kỹ năng, kinh nghiệm     | `frontend/src/config/site.ts`                   |
| Type contract API (FE)                          | `frontend/src/types/api.ts`                     |
| Màu, font, token thiết kế                       | `frontend/src/app/globals.css` (`:root` + `@theme`) |
| Ảnh, icon, CV, favicon                          | `frontend/public/` (ảnh: `public/images/...`)   |
| Endpoint API mới                                | `backend/src/modules/<module>/`                 |
| Middleware Express                              | `backend/src/middlewares/`                      |
| Biến môi trường mới                             | `config/env.ts` **và** `.env.example` tương ứng |

**Quy tắc nâng cấp vị trí**: code bắt đầu ở phạm vi hẹp nhất (trong feature). Chỉ chuyển lên `components/ui`, `hooks/`, `lib/` khi có **feature thứ hai** thật sự dùng tới.

---

## 4. Thứ tự viết file khi thêm tính năng

Luôn đi **từ trong ra ngoài**: contract/dữ liệu → logic → giao tiếp → giao diện. Mỗi bước phải typecheck pass trước khi sang bước sau.

### 4.1 Backend — thêm module/endpoint mới

| #   | File                                     | Việc cần làm                                                     |
| --- | ---------------------------------------- | ---------------------------------------------------------------- |
| 1   | `modules/<m>/<m>.schema.ts`              | Zod schema cho entity, params, query, body + `export type` suy ra |
| 2   | `data/<m>.json` (nếu cần)                | Dữ liệu seed                                                     |
| 3   | `modules/<m>/<m>.repository.ts`          | Hàm đọc/ghi dữ liệu, trả về type từ schema                       |
| 4   | `modules/<m>/<m>.service.ts`             | Business logic, ném `HttpError` khi lỗi nghiệp vụ                |
| 5   | `modules/<m>/<m>.controller.ts`          | Parse query, gọi service, trả `{ data }`                         |
| 6   | `modules/<m>/<m>.routes.ts`              | Khai báo route + `validate(...)` + rate-limit nếu là endpoint ghi |
| 7   | `routes/index.ts`                        | Mount router: `apiRouter.use('/<m>', <m>Router)`                 |
| 8   | `config/env.ts` + `.env.example`         | Chỉ khi cần biến môi trường mới                                  |
| 9   | Test thủ công bằng `curl`                | Cả case thành công **và** case lỗi (400, 404)                    |

### 4.2 Frontend — thêm feature/section mới

| #   | File                                     | Việc cần làm                                                     |
| --- | ---------------------------------------- | ---------------------------------------------------------------- |
| 1   | `types/api.ts`                           | Thêm type mirror đúng schema backend (nếu dùng API)              |
| 2   | `services/<domain>.service.ts`           | Hàm fetch qua `apiFetch`, cấu hình `next.revalidate`/`tags`      |
| 3   | `config/site.ts`                         | Nội dung tĩnh (nếu feature dùng nội dung tĩnh)                   |
| 4   | `components/ui/*`                        | Chỉ khi cần primitive mới mà chưa có                             |
| 5   | `features/<f>/<f>.schema.ts`, `use-*.ts` | Schema form / hook riêng (nếu có)                                |
| 6   | `features/<f>/<sub>.tsx`                 | Component con (lá) trước                                         |
| 7   | `features/<f>/<f>-section.tsx`           | Component chính ghép các component con                           |
| 8   | `features/<f>/index.ts`                  | Export public API                                                |
| 9   | `app/.../page.tsx`                       | Ghép vào trang; thêm `metadata`/`generateMetadata`               |
| 10  | `config/site.ts → navItems`              | Thêm link điều hướng nếu là section mới                          |

### 4.3 Tính năng full-stack

**Backend trước (4.1 bước 1→9) → Frontend sau (4.2)**. Khi đổi contract API, sửa **cùng lúc** trong 1 commit:
`backend/src/modules/<m>/<m>.schema.ts` ↔ `frontend/src/types/api.ts` (và `features/<f>/<f>.schema.ts` nếu là form).

---

## 5. Thứ tự nội dung bên trong một file

### 5.1 Thứ tự import (cách nhau 1 dòng trống giữa các nhóm)

```ts
'use client';                                   // 0. directive (nếu có) — luôn dòng đầu

import { useState } from 'react';               // 1. thư viện ngoài (react, next, zod…)
import Link from 'next/link';

import { Button } from '@/components/ui/button'; // 2. alias nội bộ '@/…'
import { cn } from '@/lib/utils';

import { ProjectCard } from './project-card';    // 3. import tương đối cùng thư mục

import './globals.css';                          // 4. side-effect / CSS (cuối cùng)
```

- Trong mỗi nhóm sắp xếp theo alphabet đường dẫn.
- Import chỉ dùng làm type → `import type { … }` hoặc `import { type X, y }` (ESLint bắt buộc).
- Ngoài feature của chính nó, chỉ import qua `@/features/<f>` (index.ts), **không** import sâu `@/features/<f>/xxx`.
- Không dùng import tương đối vượt cấp (`../../`) — dùng alias `@/`.

### 5.2 Thứ tự khối code trong file component (`.tsx`)

```tsx
// 1. imports
// 2. types/interfaces cục bộ           → interface ProjectCardProps { … }
// 3. hằng số module (UPPER_SNAKE_CASE)  → const VARIANT_CLASSES = { … }
// 4. component chính (export)           → export function ProjectCard(…) { … }
//    bên trong component theo thứ tự:
//      a. hooks (useState, useRef, custom hooks…)
//      b. giá trị suy ra (derived values)
//      c. effects
//      d. event handlers (handleXxx)
//      e. early return (loading/empty/error)
//      f. return JSX
// 5. component con nội bộ (không export) → function Field(…) { … }
// 6. helper thuần (không export)
```

### 5.3 Thứ tự khối code trong file backend (`.ts`)

```ts
// 1. imports
// 2. schema / types / constants
// 3. export chính (object service/controller/repository hoặc Router)
// 4. helper nội bộ
```

---

## 6. Quy ước đặt tên

| Đối tượng                        | Quy ước                          | Ví dụ                                   |
| -------------------------------- | -------------------------------- | --------------------------------------- |
| Tên file & thư mục               | `kebab-case`                     | `project-card.tsx`, `site-header.tsx`   |
| File backend theo lớp            | `<module>.<layer>.ts`            | `projects.service.ts`                   |
| File service FE                  | `<domain>.service.ts`            | `contact.service.ts`                    |
| File schema                      | `<name>.schema.ts`               | `contact.schema.ts`                     |
| React component                  | `PascalCase`                     | `ProjectCard`, `HeroSection`            |
| Section của trang chủ            | `<Name>Section`                  | `SkillsSection`                         |
| Props interface                  | `<Component>Props`               | `ProjectCardProps`                      |
| Hook                             | `useXxx`, file `use-xxx.ts`      | `useActiveSection`                      |
| Biến, hàm                        | `camelCase`, động từ cho hàm     | `getProjects`, `sendContactMessage`     |
| Hàm xử lý sự kiện / prop sự kiện | `handleXxx` / `onXxx`            | `handleSubmit`, `onSelect`              |
| Boolean                          | `is/has/can/should` + tính từ    | `isOpen`, `hasError`                    |
| Hằng số module                   | `UPPER_SNAKE_CASE`               | `REVALIDATE_SECONDS`                    |
| Type / interface                 | `PascalCase`, không tiền tố `I`  | `Project`, `ApiSuccess<T>`              |
| Zod schema                       | `camelCase` + hậu tố `Schema`    | `contactMessageSchema`                  |
| Object lớp backend               | `<module><Layer>`                | `projectsService`, `projectsController` |
| Router                           | `<module>Router`                 | `projectsRouter`                        |
| URL API                          | danh từ số nhiều, kebab-case     | `/api/projects/:slug`                   |
| Biến môi trường                  | `UPPER_SNAKE_CASE`; FE public → `NEXT_PUBLIC_` | `NEXT_PUBLIC_API_URL`     |
| `id` HTML / anchor               | `kebab-case`                     | `#contact`, `contact-heading`           |

---

## 7. TypeScript

- `strict` + `noUncheckedIndexedAccess` bật ở cả 2 project — **không được tắt**.
- **Cấm `any`**. Dữ liệu không rõ kiểu → `unknown` rồi thu hẹp (narrow) bằng zod hoặc type guard.
- Không dùng non-null assertion `!` và `as` để "lách" type, trừ khi có comment giải thích lý do.
- `interface` cho props/shape object; `type` cho union, mapped, utility type.
- Type của dữ liệu backend **luôn suy ra từ zod** (`z.infer<typeof schema>`), không khai báo tay lặp lại.
- Dữ liệu tĩnh dạng hằng → `as const`.
- Ưu tiên named export. **Default export chỉ dùng cho file Next.js bắt buộc** (`page.tsx`, `layout.tsx`, `not-found.tsx`, `*.config.*`).
- Khai báo hàm component bằng `function`, không dùng `React.FC`.

---

## 8. Quy chuẩn Frontend

### 8.1 Server vs Client Component

- **Mặc định là Server Component.** Chỉ thêm `'use client'` khi cần state, effect, event handler hoặc Browser API.
- Đặt `'use client'` ở **lá thấp nhất** của cây (ví dụ `ContactForm`, không phải `ContactSection`).
- Không truyền function/class instance từ Server sang Client Component qua props.
- Không import `services/*` có dùng `next: { revalidate }` vào client component để fetch lúc render — client chỉ gọi service ở event handler (submit form…).

### 8.2 Data fetching

- Mọi request đi qua `lib/api-client.ts → apiFetch<T>()`; không gọi `fetch` trực tiếp trong component.
- Mỗi domain một file `services/<domain>.service.ts`; component chỉ gọi hàm service.
- Fetch ở Server Component, cấu hình cache rõ ràng: `next: { revalidate, tags }`.
- Service dùng cho trang danh sách phải **degrade gracefully** (trả `[]` và log lỗi) để trang vẫn render khi API sập. Trang chi tiết: 404 → `null` → `notFound()`.
- Route động: `params` là `Promise` → luôn `await params`.

### 8.3 Styling (Tailwind CSS v4)

- Chỉ dùng Tailwind utility. Không viết CSS riêng trừ base style/token trong `globals.css`.
- **Màu luôn dùng token ngữ nghĩa** (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`…). Không hard-code `#hex`, `bg-gray-500`… trong component (ngoại lệ: màu trạng thái `red/green` cho lỗi/thành công).
- Token mới → khai báo trong `:root` (+ dark mode) và map ở `@theme inline` trong `globals.css`.
- Gộp class có điều kiện bằng `cn()` từ `@/lib/utils`. Không nối chuỗi thủ công.
- Component UI nhận `className` để mở rộng, luôn đặt `className` **cuối cùng** trong `cn(...)`.
- Thứ tự class do `prettier-plugin-tailwindcss` tự sắp xếp — không sắp tay.
- **Mobile-first**: viết style mobile trước rồi thêm `sm:`, `md:`, `lg:`.
- Site dùng **một theme tối duy nhất** ("space" tím) định nghĩa bằng CSS variables trong `:root` — không dùng `dark:`. Gradient đặc biệt khai báo bằng `@utility` trong `globals.css` (`bg-gradient-green-pink`, `text-gradient-*`).
- Animation tôn trọng `prefers-reduced-motion` (đã có rule global). Animation khi cuộn dùng `<Reveal>` (`components/ui/reveal.tsx`, thư viện `motion`) để section vẫn là Server Component; component tự viết animation phải kiểm tra `useReducedMotion()`.

### 8.4 Accessibility (bắt buộc — đây là portfolio của Frontend Dev)

- HTML ngữ nghĩa: `header`, `nav`, `main`, `section`, `article`, `footer`, danh sách dùng `ul/ol > li`.
- Mỗi trang đúng **một `<h1>`**; heading không nhảy cấp. Mỗi `Section` có `aria-labelledby` (component `Section` đã lo).
- Phần tử bấm được: dùng `<button>` (hành động) hoặc `<a>/<Link>` (điều hướng) — **không** gắn `onClick` lên `div`.
- Mọi input có `<label htmlFor>`; lỗi liên kết bằng `aria-invalid` + `aria-describedby`; thông báo trạng thái dùng `role="status" aria-live="polite"`.
- Ảnh có `alt` mô tả (ảnh trang trí: `alt=""`); icon trang trí: `aria-hidden`.
- Link ngoài: `target="_blank" rel="noopener noreferrer"`.
- Không xoá focus outline; giữ `:focus-visible`. Kiểm tra điều hướng hoàn toàn bằng bàn phím.
- Độ tương phản đạt WCAG AA.

### 8.5 Hiệu năng & SEO

- Ảnh dùng `next/image` (có `width/height` hoặc `fill` + `sizes`); ảnh above-the-fold thêm `priority`.
- Font dùng `next/font`, không `<link>` Google Fonts.
- Component nặng chỉ dùng phía client (chart, animation lớn) → `next/dynamic`.
- 3D (three.js / `@react-three/fiber` / `drei`): tách 2 file — `*-scene.tsx` chứa `<Canvas>` và `*-canvas.tsx`/`*-background.tsx` load scene bằng `next/dynamic({ ssr: false })`. Wrapper đặt `aria-hidden` (trang trí). Mô hình đặt ở `public/models/<tên>/` kèm `license.txt`; asset CC BY phải có credit trong `config/site.ts → credits` (footer tự hiển thị).
- Mỗi trang có `metadata` hoặc `generateMetadata` (title, description). Title dùng template ở root layout.
- Không thêm thư viện mới nếu có thể làm gọn bằng code sẵn có; thư viện mới phải được nêu lý do trong PR.

### 8.6 Form

- Validate phía client bằng zod schema trong `features/<f>/<f>.schema.ts`, rule **khớp** với schema backend.
- Backend luôn validate lại (không tin client). Lỗi `details` từ API được map lại vào field.
- Disable nút submit khi đang gửi; hiển thị trạng thái thành công/thất bại.
- Form công khai có honeypot + rate-limit phía backend.

---

## 9. Quy chuẩn Backend

### 9.1 Trách nhiệm từng lớp (không được vượt lớp)

| Lớp          | Được làm                                            | KHÔNG được làm                           |
| ------------ | --------------------------------------------------- | ---------------------------------------- |
| `routes`     | Khai báo path, gắn middleware, trỏ tới controller   | Chứa logic                               |
| `controller` | Đọc `req`, parse query, gọi service, set status/res | Truy cập dữ liệu trực tiếp, business logic |
| `service`    | Business logic, ném `HttpError`                     | Đụng tới `req`/`res`                     |
| `repository` | Đọc/ghi nguồn dữ liệu                               | Biết về HTTP, ném `HttpError`            |
| `schema`     | Định nghĩa zod schema + type                        | Logic                                    |

Luồng phụ thuộc một chiều: `routes → controller → service → repository`. Module không import lẫn `repository` của nhau — cần dữ liệu module khác thì gọi qua `service` của module đó.

### 9.2 Contract response (bắt buộc thống nhất)

```jsonc
// Thành công
{ "data": <T> }
// Lỗi
{ "error": { "message": "Human readable message", "details": { "field": ["reason"] } } }
```

| Status | Khi nào                                 |
| ------ | --------------------------------------- |
| 200    | GET/PUT thành công                      |
| 201    | POST tạo mới thành công                 |
| 400    | Validate thất bại (ZodError tự map)     |
| 404    | Không tìm thấy resource/route           |
| 429    | Vượt rate-limit                         |
| 500    | Lỗi không lường trước (không lộ chi tiết) |
| 503    | Dịch vụ ngoài lỗi/chưa cấu hình (VD: gửi email form liên hệ) |

### 9.3 Validation & lỗi

- Body/params validate bằng middleware `validate({ body, params })` ở file routes.
- Query validate bằng `schema.parse(req.query)` trong controller (Express 5: `req.query` read-only).
- Lỗi nghiệp vụ: `throw HttpError.notFound(...)` / `HttpError.badRequest(...)`. **Không** `res.status(...).json(...)` lỗi thủ công trong controller.
- Express 5 tự bắt lỗi từ async handler — **không** cần `try/catch` hay `asyncHandler` wrapper.
- Mọi lỗi kết thúc ở `middlewares/error-handler.ts`.

### 9.4 Config, log, bảo mật

- Chỉ `config/env.ts` được đọc `process.env`; nơi khác import `env`.
- Log bằng `logger` (pino). **Cấm `console.log`** (ESLint cảnh báo). Không log dữ liệu nhạy cảm (nội dung tin nhắn, token, mật khẩu).
- Giữ `helmet`, CORS whitelist qua `CORS_ORIGIN`, giới hạn body `100kb`.
- Endpoint ghi công khai (POST) phải có `strictRateLimit`.
- Không commit `.env`; mọi biến mới phải có trong `.env.example`.

---

## 10. Format, lint, comment

- Prettier (`.prettierrc.json` trong mỗi project): `singleQuote`, `semi`, `trailingComma: all`, `printWidth: 100`, 2 spaces, LF.
- Không tắt rule ESLint toàn cục. Nếu buộc phải tắt 1 dòng → `// eslint-disable-next-line <rule>` kèm lý do.
- Comment giải thích **tại sao**, không giải thích **cái gì** code đã thể hiện rõ. JSDoc ngắn cho hàm/component export không hiển nhiên.
- `TODO:` phải mô tả cụ thể việc cần làm.
- Không để code chết, `console.log` debug, import thừa.

---

## 11. Git

- Branch: `feat/<mô-tả>`, `fix/<mô-tả>`, `chore/<mô-tả>`, `docs/<mô-tả>`, `refactor/<mô-tả>` (kebab-case).
- Commit theo **Conventional Commits**, tiếng Anh, thì hiện tại:
  `feat(frontend): add experience timeline section`, `fix(backend): return 404 for unknown slug`
  - type: `feat | fix | refactor | style | perf | docs | test | chore | build | ci`
  - scope: `frontend | backend | root` (hoặc tên feature/module)
- Mỗi commit là một thay đổi logic hoàn chỉnh, pass lint + typecheck.

---

## 12. Checklist trước khi hoàn thành một thay đổi

- [ ] File đặt đúng vị trí (mục 3) và viết theo đúng thứ tự (mục 4, 5)
- [ ] Đặt tên đúng quy ước (mục 6)
- [ ] Không có `any`, `console.log`, code chết
- [ ] Contract API khớp giữa backend schema ↔ `frontend/src/types/api.ts`
- [ ] Biến môi trường mới đã thêm vào `.env.example`
- [ ] UI: responsive mobile → desktop, dark mode, điều hướng bằng bàn phím, label/alt đầy đủ
- [ ] `npm run check && npm run build` pass trong mỗi project bị sửa

## 13. Những điều KHÔNG làm

- Không đặt logic/business vào `app/` — `app/` chỉ là routing và ghép feature.
- Không gọi `fetch` trực tiếp trong component; không gọi backend URL hard-code.
- Không thêm `'use client'` vào layout, page hoặc section chỉ để dùng 1 handler nhỏ — tách component con.
- Không hard-code màu, nội dung cá nhân trong component (đặt ở `globals.css` / `config/site.ts`).
- Không sửa file sinh tự động: `next-env.d.ts`, `.next/`, `dist/`, `package-lock.json` (trừ qua npm).
- Không tạo `package.json`, `package-lock.json`, `node_modules` hay config tool (Prettier, ESLint, TS) ở thư mục gốc — mọi thứ nằm trong `frontend/` hoặc `backend/`.
