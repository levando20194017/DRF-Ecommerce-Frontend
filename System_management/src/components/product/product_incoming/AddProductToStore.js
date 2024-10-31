import React, { useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { ToastContainer } from "react-toastify";
import { DatePicker, Space, theme } from 'antd';

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
                                        <Form.Label>Name<span className="text-danger"
                                            style={{ paddingLeft: "1px" }}>*</span></Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            maxLength={100}
                                            name="name"
                                            placeholder="Enter promotion Name"
                                            onChange={(e) => handleInput(e)}
                                        />
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
                                            Code <span className="text-danger">*</span>
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
                                            Rate <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <Form.Group id="SKU">
                                        <Form.Label>
                                            Special Price
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <Form.Group id="SKU">
                                        <Form.Label>
                                            Member Price
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="mt-3">
                                <Button variant="primary" onClick={() => handleSubmit()}>
                                    Add product to Store
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};
