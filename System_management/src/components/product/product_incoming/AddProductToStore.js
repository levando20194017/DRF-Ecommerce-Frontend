import React, { useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { ToastContainer } from "react-toastify";
import { DatePicker, Select, Space, theme } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

export default (props) => {
    const [error, setError] = useState("")
    const handleInput = (e) => {

    }

    const handleSubmit = () => {

    }

    return (
        <>
            <ToastContainer />
            <Col xs={12} xl={9}>
                <Card border="light" className="bg-white shadow-sm mb-4">
                    <Card.Body>
                        <Form>
                            <Row>
                                <Col md={12} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Sản phẩm<span className="text-danger"
                                            style={{ paddingLeft: "1px" }}>*</span></Form.Label>
                                        <div>
                                            <Select
                                                showSearch
                                                placeholder="Chọn sản phẩm"
                                                optionFilterProp="label"
                                                options={[]}
                                            />
                                        </div>
                                        {
                                            error ? (<div className="text-danger">{error}</div>) : <></>
                                        }
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Cửa hàng<span className="text-danger"
                                            style={{ paddingLeft: "1px" }}>*</span></Form.Label>
                                        <div>
                                            <Select
                                                showSearch
                                                placeholder="Chọn cửa hàng"
                                                optionFilterProp="label"
                                                options={[]}
                                            />
                                        </div>
                                        {
                                            error ? (<div className="text-danger">{error}</div>) : <></>
                                        }
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} className="mb-3">
                                    <Form.Group id="SKU">
                                        <Form.Label>
                                            Giá nhập <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <Form.Group id="SKU">
                                        <Form.Label>
                                            Số lượng <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <Form.Group id="SKU">
                                        <Form.Label>
                                            Thuế <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={4} className="mb-3">
                                    <Form.Group id="SKU">
                                        <Form.Label>
                                            Phí vận chuyển <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <Form.Group id="SKU">
                                        <Form.Label>
                                            Ngày nhập
                                        </Form.Label>
                                        <div>
                                            <DatePicker
                                                defaultValue={dayjs('2019-09-03', dateFormat)}
                                                minDate={dayjs('2019-08-01', dateFormat)}
                                                maxDate={dayjs('2020-10-31', dateFormat)}
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="mt-3">
                                <Button variant="primary" onClick={() => handleSubmit()}>
                                    Thêm sản phẩm
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};
