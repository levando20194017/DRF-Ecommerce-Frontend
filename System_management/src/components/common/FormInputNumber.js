import React from "react";
import { Form } from "@themesberg/react-bootstrap";

export default ({ title, isRequired, value, keyField, placeholder, formData, setFormData }) => {
    const handleChangeNumber = (e, name) => {
        const inputValue = e.target.value;
        const sanitizedValue = inputValue.replace(/[^0-9]/g, ""); // Loại bỏ tất cả các ký tự không phải số

        if (
            !(sanitizedValue === "0" && inputValue.length === 1) &&
            !sanitizedValue.includes("-") // Kiểm tra nếu giá trị đã xử lý không chứa dấu "-"
        ) {
            setFormData({ ...formData, [name]: sanitizedValue })
        }
    }

    return (
        <Form.Group id="title">
            <Form.Label>
                {title} {isRequired ? <span className="text-danger">*</span> : ""}
            </Form.Label>
            <Form.Control
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => handleChangeNumber(e, keyField)}
                onKeyPress={(e) => {
                    const charCode = e.which || e.keyCode;
                    if (
                        charCode === 43 ||
                        charCode === 44 ||
                        charCode === 46 ||
                        charCode === 101 ||
                        charCode === 69 ||
                        charCode === 45
                    ) {
                        e.preventDefault(); // Ngăn chặn sự kiện nếu phím là dấu chấm, chữ cái "e", hoặc dấu "-"
                    }
                }}
            />
        </Form.Group>
    )
}