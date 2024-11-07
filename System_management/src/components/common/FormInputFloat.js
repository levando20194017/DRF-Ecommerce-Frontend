import React from "react";
import { Form } from "@themesberg/react-bootstrap";

export default ({ title, isRequired, value, keyField, placeholder, formData, setFormData }) => {

    const handleChangeFloat = (e, name) => {
        const inputValue = e.target.value;
        const regex = /^\d+(\.\d*)?$/; // Biểu thức chính quy để kiểm tra số và dấu chấm chỉ xuất hiện 1 lần

        if (inputValue === "" || regex.test(inputValue)) {
            setFormData({ ...formData, [name]: inputValue === "" ? "" : parseFloat(inputValue) });
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
                value={formData[keyField]}
                onChange={(e) => handleChangeFloat(e, keyField)}
            />
        </Form.Group>
    )
}