import React from 'react';

const ContactInfo: React.FC = () => {
  return (
    <div className="contact-info">
        <h5>Thông tin liên hệ</h5>
        <div className='form-contact mt-4'>
            <div>
                <p className="form-contact_title">Văn phòng đại diện</p>
                <p className="form-contact_des">46 ngõ 61 Định Công, Hoàng Mai, Hà Nội.</p>
            </div>
            {/* <div>
                <p className="form-contact_title">Văn phòng miền Nam</p>
                <p className="form-contact_des">192 - Phạm Ngũ Lão - P. 7 - Q. Gò Vấp - TP.HCM</p>
            </div>
            <div>
                <p className="form-contact_title">Văn phòng miền Trung</p>
                <p className="form-contact_des">A3-30 - KDT Minh Khang - TP.Vinh, Nghệ An</p>
            </div> */}
            <div>
                <p className="form-contact_title">Điện thoại:</p>
                <p className="form-contact_des">(+84) 0971565773</p>
            </div>
            <div>
                <p className="form-contact_title">Email:</p>
                <p className="form-contact_des">levando20194017@gmail.com</p>
            </div>
        </div>
    </div>
  );
};

export default ContactInfo;
