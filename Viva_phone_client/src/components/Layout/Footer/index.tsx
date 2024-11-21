import "./style.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer container text-light pb-3">
      <hr className="text-light" />
      <div className="row form-footer">
        <div className="col-lg-3 col-md-6 mb-4 d-flex flex-column gap-4">
          <h5 className="footer-title">Trụ sở</h5>
          <div>
            <p className="footer-title_title">Văn phòng đại diện</p>
            <p>46 - Ngõ 61 - Định Công - Quận Hoàng Mai- TP Hà Nội.</p>
          </div>
          <div>
            <p className="footer-title_title">Văn phòng miền Nam</p>
            <p>192 - Phạm Ngũ Lão - P. 7 - Q. Gò Vấp - TP.HCM</p>
          </div>
          <div>
            <p className="footer-title_title">Văn phòng miền Trung</p>
            <p>A3-30 - KDT Minh Khang - TP.Vinh, Nghệ An</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4 d-flex flex-column gap-4">
          <h5 className="footer-title">Liên hệ</h5>
          <div className="d-flex flex-column gap-2">
            <p className="d-flex"><div className="contact-title">Điện thoại:</div> <div>(+84) 036 964 8868</div></p>
            <p className="d-flex"><div className="contact-title">Email:</div> <div>levando20194017@gmail.com</div></p>
            <p className="d-flex"><div className="contact-title">Website:</div> <div>www.painticks.com.vn</div></p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4 d-flex flex-column gap-4">
          <h5 className="footer-title">Truy cập nhanh</h5>
          <ul className="list-unstyled d-flex flex-column gap-3">
            <li>Trang chủ</li>
            <li>Giới thiệu</li>
            <li>Sản phẩm</li>
            <li>Tin tức</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <h5 className="footer-title">Đăng ký để nhận thông tin</h5>
          <form>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Nhập email tại đây"
                aria-label="Email"
              />
              <button className="btn btn-warning" type="submit">
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>

      <hr className="text-light" />

      <div className="d-flex justify-content-between align-items-center footer-copy-right">
        <p>© 2024 Holapet. All rights reserved.</p>
        <div>
          <a href="/" className="footer-link me-3">
            Terms
          </a>
          <a href="/" className="footer-link me-3">
            Privacy
          </a>
          <a href="/" className="footer-link">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};
