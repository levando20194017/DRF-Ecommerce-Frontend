import React from "react";
import { Form } from "@themesberg/react-bootstrap";
import { DatePicker, Space } from 'antd';

export default ({ title, isRequired, keyField, formData, setFormData }) => {
    const dateFormat = 'YYYY/MM/DD';

    const handleOnChange = (value) => {
        setFormData({ ...formData, [keyField]: value.format('YYYY-MM-DD') })
    }
    return (
        <Form.Group id="title" className="d-flex flex-column">
            <Form.Label className="">
                {title} {isRequired ? <span className="text-danger">*</span> : ""}
            </Form.Label>
            <div>
                <Space direction="vertical">
                    <DatePicker onChange={handleOnChange} value={formData[keyField]} format={dateFormat} />
                </Space>
            </div>
        </Form.Group>
    )
}