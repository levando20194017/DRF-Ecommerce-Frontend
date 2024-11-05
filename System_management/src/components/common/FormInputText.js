import React from "react";
import { Form } from "@themesberg/react-bootstrap";

export default ({ title, isRequired, value, handleBlur, placeholder, keyField, maxLength, formData, setFormData }) => {
    const handleOnChangeInput = (e, name) => {
        setFormData({ ...formData, [name]: e.target.value })
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
                onChange={(e) => handleOnChangeInput(e, keyField)}
                onBlur={() => handleBlur(keyField)}
                maxLength={maxLength}
            />
        </Form.Group>
    )
}