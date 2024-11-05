import React from "react";
import { Form } from "@themesberg/react-bootstrap";
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
export default ({ title, isRequired, keyField, formData, setFormData }) => {
    const dateFormat = 'YYYY/MM/DD';

    const handleOnChange = (value) => {
        setFormData({ ...formData, [keyField]: value ? value.format('YYYY-MM-DD') : "" });
    };

    return (
        <Form.Group id="title" className="d-flex flex-column">
            <Form.Label className="">
                {title} {isRequired ? <span className="text-danger">*</span> : ""}
            </Form.Label>
            <div>
                <Space direction="vertical">
                    <DatePicker
                        onChange={handleOnChange}
                        value={formData[keyField] ? dayjs(formData[keyField], dateFormat) : undefined}
                        format={dateFormat}
                    />
                </Space>
            </div>
        </Form.Group>
    );
};
