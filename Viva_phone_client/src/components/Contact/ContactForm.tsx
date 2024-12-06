import React, { useState } from 'react';
import { GrLinkNext } from 'react-icons/gr';
import { apiCreateContact } from '../../services/contact';

interface Contact {
  full_name: string;
  phone_number: string;
  email: string;
  question: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<Contact>({
    full_name: "",
    phone_number: "",
    email: "",
    question: ""
  });

  const [errors, setErrors] = useState<Partial<Contact>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Contact> = {};
    if (!formData.full_name.trim()) newErrors.full_name = "Họ và tên là bắt buộc.";
    if (!formData.phone_number.trim()) newErrors.phone_number = "Số điện thoại là bắt buộc.";
    else if (!/^\d+$/.test(formData.phone_number))
      newErrors.phone_number = "Số điện thoại không hợp lệ.";
    if (!formData.email.trim()) newErrors.email = "Email là bắt buộc.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email không hợp lệ.";
    if (!formData.question.trim()) newErrors.question = "Nội dung câu hỏi là bắt buộc.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" })
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await apiCreateContact(formData);
      if (response.status === 201) {
        console.log("OK");
        alert("Gửi thông tin thành công!");
        setFormData({
          full_name: "",
          phone_number: "",
          email: "",
          question: ""
        });
        setErrors({});
      }
    } catch (e) {
      console.error(e);
      alert("Đã xảy ra lỗi khi gửi thông tin!");
    }
  };

  return (
    <div className="contact-form">
      <h5>Điền thông tin dưới đây, chúng tôi sẽ sớm liên lạc với bạn.</h5>
      <p>
        Nếu bạn có thắc mắc, hãy gửi ngay yêu cầu về cho chúng tôi, chúng tôi sẽ cố gắng liên lạc lại cho bạn sớm nhất có thể.
      </p>
      <form onSubmit={handleCreateQuestion}>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
            placeholder="Họ và tên"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
          />
          {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
        </div>
        <div className="mb-3 d-flex gap-3">
          <div className='w-100'>
            <input
              type="text"
              className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`}
              placeholder="Số điện thoại"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
            {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
          </div>
          <div className='w-100'>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
        </div>
        <div className="mb-3">
          <textarea
            className={`form-control ${errors.question ? 'is-invalid' : ''}`}
            rows={4}
            placeholder="Nội dung"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
          />
          {errors.question && <div className="invalid-feedback">{errors.question}</div>}
        </div>
        <p>*Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
        <button type="submit" className="btn btn-warning d-flex align-items-center gap-2">
          <span>Gửi ngay</span>
          <GrLinkNext />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
