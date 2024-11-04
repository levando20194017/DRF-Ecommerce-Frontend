import React from "react";
import { Form } from "@themesberg/react-bootstrap";

export default ({ title, isRequired, value, handleOnChange, handleBlur, key, maxLength }) => {
    return (
        <Form.Group id="title">
            <Form.Label>
                {title} {isRequired ? <span className="text-danger">*</span> : ""}
            </Form.Label>
            <Form.Control
                type="text"
                placeholder="Product Title"
                value={value}
                onChange={(e) => handleOnChange(e, key)}
                onBlur={(e) => handleBlur(e, key)}
                maxLength={maxLength}
            />
        </Form.Group>
    )
}