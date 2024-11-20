import React from 'react';
import { GrLinkNext } from 'react-icons/gr';

const ContactForm: React.FC = () => {
  return (
    <div className="contact-form">
      <h5>Điền thông tin dưới đây, chúng tôi sẽ sớm liên lạc với bạn.</h5>
      <p>
        Nếu bạn có thắc mắc, hãy gửi ngay yêu cầu về cho chúng tôi, chúng tôi sẽ cố gắng liên lạc lại cho bạn sớm nhất có thể.
      </p>
      <form>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Họ và tên" />
        </div>
        <div className="mb-3 d-flex gap-3">
          <input type="text" className="form-control" placeholder="Số điện thoại" />
          <input type="email" className="form-control" placeholder="Email" />
        </div>
        <div className="mb-3">
          <textarea className="form-control" rows={4} placeholder="Nội dung"></textarea>
        </div>
        <p>*Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
        <button type="submit" className="btn btn-warning d-flex align-items-center gap-2">
            <span>
                Gửi ngay
            </span>
          <GrLinkNext />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
