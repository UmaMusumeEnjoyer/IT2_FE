# IT2 Frontend — Cổng Dịch vụ và Hỗ trợ Sinh viên DUT

Giao diện người dùng viết bằng **React 18 + Vite + TypeScript + Tailwind CSS** phục vụ Cổng Dịch vụ và Hỗ trợ Sinh viên Trường Đại học Bách khoa — Đại học Đà Nẵng.

---

## 1. Yêu cầu Môi trường

- **Node.js**: Phiên bản 18+ (khuyên dùng Node 20 hoặc 22).
- **npm** hoặc **yarn** / **pnpm**.
- Hoặc chạy qua **Docker Desktop**.

---

## 2. Khởi chạy Cục bộ (Local Development)

1. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```

2. Tạo file môi trường:
   ```bash
   cp .env.example .env
   ```

3. Khởi chạy máy chủ phát triển (Vite Dev Server):
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại: [http://localhost:3000](http://localhost:3000) (hoặc `http://localhost:5173`).

---

## 3. Khởi chạy bằng Docker

1. Tạo mạng chung nếu chưa có:
   ```bash
   docker network create it2-network
   ```

2. Build và chạy container:
   ```bash
   docker compose up --build -d
   ```
   Giao diện sẽ chạy tại cổng [http://localhost:3000](http://localhost:3000).

---

## 4. Các màn hình chính (Components & Pages)

- **`Navbar`**: Thanh điều hướng trên cùng, logo DUT, phím tắt đến cổng `sv.dut.udn.vn`.
- **`AcademicStatusStrip`**: Dải tóm tắt học vụ cá nhân hóa (Điểm TBCHK, ĐRL, Tín chỉ tích lũy).
- **`CatalogPage` (`/`)**: Tra cứu & Danh mục quy chế (Live search, bộ lọc danh mục).
- **`ProcedurePage` (`/procedure`)**: Bảng so khớp tiêu chuẩn học bổng, checklist stepper 4 chặng, form nộp phản hồi sai lệch.
- **`AiChatPage` (`/ai-chat`)**: Trợ lý học vụ AI (RAG hỏi đáp quy chế kèm trích dẫn văn bản pháp quy).
- **`CalendarPage` (`/calendar`)**: Lịch sự kiện & theo dõi hạn chót theo Khoa/Lớp.
- **`DocumentViewerModal`**: Trình xem trước văn bản quy chuẩn, hỗ trợ bôi vàng điều khoản trọng tâm.
