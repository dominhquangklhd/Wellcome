<div id="top">
</div>
<h1>PRODUCT CMS</h1>
<!-- CMS PRODUCT MANGAGEMENT -->

## Danh mục

 [I. Mở đầu](#Modau)

 [II. Tác giả](#Tacgia)

 [III. Mô tả](#Mota)

> [1. Ý tưởng](#Ytuong)
>
> [2. Công nghệ](#Congnghe)
>
> [3. Đối tượng sử dụng](#Doituongsudung)
>
> [4. Mục tiêu](#Muctieu)
>
> [5. Tính năng](#Tinhnang)


[IV. Cài đặt](#CaiDat)

[V. Hướng phát triển tiếp theo](#Huongphattrientieptheo)

Sản phẩm đã được deploy (chạy Backend trước, Frontend sau):
- Frontend: https://wellcome-six.vercel.app/
- Backend: https://wellcome-ynlb.onrender.com/

<!-- MỞ ĐẦU -->
<div id="Modau"></div>

## I. Mở đầu
Trong thời đại số, việc quản lý sản phẩm một cách hiệu quả là yếu tố quan trọng đối với các cửa hàng và doanh nghiệp. Khi số lượng sản phẩm tăng lên, việc theo dõi và cập nhật thủ công trở nên kém hiệu quả, dễ gây sai sót.
Ứng dụng quản lý sản phẩm (Mini CMS) ra đời nhằm hỗ trợ người dùng thực hiện các thao tác như thêm, sửa, xóa, tìm kiếm và phân trang sản phẩm một cách nhanh chóng. Giao diện thân thiện, tích hợp các tính năng như chế độ tối (dark mode) và lưu trữ cục bộ giúp nâng cao trải nghiệm người dùng.
Dự án đồng thời là cơ hội để vận dụng kiến thức về React và Sails.js, rèn luyện kỹ năng xây dựng hệ thống quản lý thực tế, có thể mở rộng trong tương lai.

<div id="Tacgia"></div>

## II. Tác giả

* [Đỗ Minh Quang](https://github.com/dominhquangklhd)

<!-- MÔ TẢ -->
<div id="Mota"></div>

## III. Mô tả

<div id="Ytuong"></div>

### 1. Ý tưởng

* Xây dựng giao diện ứng dụng đơn giản, thân thiện, dễ sử dụng cho người quản trị sản phẩm.

* Đáp ứng đầy đủ các chức năng cơ bản của một hệ thống quản lý sản phẩm: thêm, sửa, xóa, tìm kiếm và phân trang.

* Hỗ trợ chế độ tối (dark mode), lưu trạng thái theme bằng localStorage để nâng cao trải nghiệm người dùng.

* Dễ dàng mở rộng trong tương lai như thêm chức năng đăng nhập, phân quyền, quản lý người dùng, hoặc tích hợp cơ sở dữ liệu thực.


### 2. Công nghệ
* Frontend: React.js – xây dựng giao diện người dùng, sử dụng JSX và React Router để điều hướng.
* Backend / API: Sails.js – framework Node.js hỗ trợ tạo RESTful API nhanh chóng và dễ mở rộng.
* Database: localDiskDB (mặc định của Sails) – dùng để lưu trữ dữ liệu sản phẩm trong quá trình phát triển.
* Lưu trữ trình duyệt: LocalStorage – lưu thông tin như dark mode hoặc thời gian truy cập gần nhất.
* Công cụ quản lý mã nguồn: Git & GitHub – quản lý phiên bản mã, cộng tác và lưu trữ project.


<div id="Doituongsudung"></div>

### 3. Đối tượng sử dụng
Đối tượng sử dụng của ứng dụng bao gồm:
* Quản trị viên hoặc chủ cửa hàng cần quản lý danh sách sản phẩm một cách nhanh chóng và hiệu quả.
* Nhân viên bán hàng cần tra cứu, cập nhật thông tin sản phẩm trong quá trình làm việc.
* Người học lập trình muốn thực hành xây dựng hệ thống quản lý nội dung đơn giản với React và Sails.js.


<div id="Muctieu"></div>

### 4. Mục tiêu

* Xây dựng một ứng dụng web đơn giản giúp người quản trị có thể dễ dàng thêm, sửa, xóa và tìm kiếm sản phẩm.

* Thực hành tổng hợp kiến thức về frontend (React) và backend (Sails.js) để tạo ra một hệ thống quản lý nội dung thực tế.

* Cải thiện trải nghiệm người dùng thông qua các tính năng như phân trang, tìm kiếm nhanh và chế độ tối (dark mode).

* Tạo nền tảng có thể dễ dàng mở rộng trong tương lai như thêm xác thực người dùng, phân quyền hoặc kết nối với cơ sở dữ liệu thật.


<div id="Tinhnang"></div>

### 5. Tính năng

* **Quản lý sản phẩm**  
  - Thêm, sửa, xóa thông tin sản phẩm.  
  - Hiển thị danh sách sản phẩm dưới dạng bảng hoặc thẻ.

* **Tìm kiếm sản phẩm**  
  - Tìm kiếm theo tên sản phẩm.  
  - Lọc kết quả theo từ khóa.

* **Phân trang sản phẩm**  
  - Hiển thị dữ liệu theo trang.  
  - Điều hướng giữa các trang dễ dàng.

* **Chế độ tối (Dark Mode)**  
  - Giao diện sáng/tối linh hoạt.  
  - Lưu trạng thái vào localStorage.

* **Lưu trữ client-side**  
  - Lưu lần truy cập gần nhất của người dùng.  
  - Ghi nhớ chế độ giao diện đã chọn.


<div id="CaiDat"></div>

## IV. Hướng dẫn cài đặt
### 1. Yêu cầu hệ thống

- Node.js >= 16  
- npm >= 8  
- Git

---

### 2. Clone dự án

```bash
git clone https://github.com/your-username/mini-cms.git
cd mini-cms
```

### 3. Tạo file .env

Trong folder backend, hãy tạo một file .env để lưu url kết nối với DB.
Để với tên biến là MONGO_URL như sau:
```bash
MONGO_URL=mongodb+srv://2uangthor:q25012004@cluster0.x6pqf.mongodb.net/ManageProduct?retryWrites=true&w=majority
```

### 4. Cài đặt và chạy Backend (Sails.js)

```bash
cd backend
npm install
sails lift
```

### 5. Cài đặt và chạy Frontend (React)

```bash
cd client
npm install
npm start
```

<div id="Huongphattrientieptheo"></div>

## V. Hướng phát triển tiếp theo

* Tích hợp hệ thống đăng nhập và phân quyền người dùng (quản trị viên, nhân viên).

* Thêm chức năng quản lý danh mục sản phẩm (ví dụ: thời trang, điện tử, sách...).

* Hỗ trợ tải lên và hiển thị hình ảnh sản phẩm.

* Triển khai ứng dụng online:

 - Backend (Sails.js) lên Render

 - Frontend (React) lên Vercel hoặc Netlify

* Tối ưu giao diện responsive để hiển thị tốt trên điện thoại và máy tính bảng.

* Cải thiện UX/UI với thư viện như Tailwind CSS hoặc Material UI.

---

<p align="right"><a href="#Top">Quay lại đầu trang</a></p>
