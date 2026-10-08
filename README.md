# Birthday Web

## Màn hình mật mã

Nhập 4 số `2207` bằng bàn phím tròn hoặc phím số trên máy tính để mở các slide. Sai mã hiện meme; bấm “Thử lại” hoặc Escape để tiếp tục, không giới hạn số lượt. Tải lại trang sẽ hỏi mã lại. Ảnh meme nằm tại `assets/wrong-code-meme.png`; mã đặt trong biến `passcode` ở `script.js`. Đây là màn mở quà trên static web, không phải cơ chế bảo vệ dữ liệu: người xem có thể đọc mã trong source.

Prototype sinh nhật gồm đúng 3 slide, HTML/CSS/JavaScript thuần. Không cần build, dependency hoặc backend. Vuốt/cuộn để chuyển trang; nút “Mở quà 🎁” chuyển sang trang 2. Hỗ trợ phím ↑/↓, Page Up/Down, Home/End khi vùng nội dung được focus, và giảm chuyển động theo cài đặt thiết bị.

## Xem thử

Mở `index.html` trực tiếp trong trình duyệt. Có thể dùng static server bất kỳ để kiểm tra giống hosting. Trên điện thoại dọc, nội dung chiếm toàn màn hình; trên desktop/màn hình rộng, khung 9:16 nằm giữa nền đen. Trên màn hình cực ngắn, slide có thể cuộn nội dung để tránh cắt chữ.

## Deploy bằng GitHub Pages

1. Tạo GitHub repository.
2. Push **nội dung bên trong `birthday-web/`** lên thư mục gốc repository: `index.html`, `style.css`, `script.js`, `assets/`, `README.md`. Không đặt thêm lớp thư mục `birthday-web/` nếu muốn URL gốc mở ngay website.
3. Vào **Settings → Pages**.
4. Chọn **Deploy from a branch**.
5. Chọn branch **main**.
6. Chọn folder **/root** (hiển thị là **/(root)**).
7. Nhấn **Save**.
8. Chờ GitHub Pages deploy.
9. Mở URL được GitHub cung cấp, ví dụ `https://USERNAME.github.io/REPOSITORY/`.

## Thay thiết kế từ Canva/PPT/PDF

- `index.html`: thay nội dung bên trong `.page-content` của `#page-1`, `#page-2`, `#page-3`; giữ `.birthday-page` và các ID để navigation tiếp tục hoạt động.
- `style.css`: chỉnh biến trong `:root` cho màu, font, spacing, thời gian animation. Chỉnh `.page-1`, `.page-2`, `.page-3` cho background và layout riêng. Giữ chiều cao section và scroll snap trong phần khung.
- `assets/`: đặt ảnh/font đã xuất vào đây. Dùng đường dẫn tương đối như `./assets/image.jpg`. Thay `.photo-placeholder` bằng `<img src="./assets/image.jpg" alt="Mô tả ảnh">`, đặt `width: 100%; max-height: 28dvh; object-fit: contain;` hoặc layout phù hợp.
- `script.js`: chỉ xử lý navigation và animation xuất hiện. Nút dùng `data-target="page-2"`; không chứa lời chúc, màu hoặc layout.
- Nếu dùng toàn bộ slide dưới dạng ảnh, thêm alt mô tả và dùng `object-fit: contain` để giữ tỷ lệ. Với text dài, kiểm tra lại màn hình nhỏ và chế độ chữ lớn; không khóa zoom.

## Kiểm tra sau khi thay nội dung

Kiểm tra ở 320×568, 390×844 và desktop: không tràn ngang, chữ/nút trong vùng an toàn, 3 trang vuốt lên/xuống được, nút mở quà đến trang 2, không lỗi trong console. Kiểm tra cả URL GitHub Pages có tiền tố repository để phát hiện đường dẫn asset sai. Prototype không tải tài nguyên bên ngoài, video hay API.

## Bản thử từ PDF

Gồm 8 trang nguyên bản từ SN LY.pdf, xuất thành WebP độ cao 1920px. Màn mã 2207 và meme giữ nguyên. Ảnh dùng object-fit: contain để không cắt chữ, ảnh hoặc viền; trên màn hình khác tỷ lệ 9:16 có thể có khoảng nền ở trên/dưới. Vuốt lên/xuống hoặc dùng phím mũi tên để chuyển trang. Thay ảnh tương ứng trong assets/slides khi cập nhật thiết kế. Chữ bên trong ảnh giữ nguyên bản PDF, không thể chọn hoặc sửa trực tiếp trong HTML; alt mô tả được đặt cho từng slide.

Bản này ở branch design/pdf-slides để duyệt; main và GitHub Pages chính chưa đổi.
`nChữ vector xuất hiện từng ký tự lần đầu xem mỗi slide trong mỗi lần mở trang; vuốt quay lại hiện đầy đủ. Tải lại trang đặt lại hiệu ứng. Hai trang ảnh không có lớp chữ riêng nên giữ nguyên. Tôn trọng prefers-reduced-motion.
