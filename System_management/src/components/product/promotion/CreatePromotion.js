import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { ToastContainer } from "react-toastify";
import { DatePicker, Space, theme } from 'antd';
import { useHistory, useParams } from "react-router-dom";
import { apiCreatePromotion, apiDetailPromotion, apiEditPromotion } from "../../../services/promotion";
import dayjs from 'dayjs';
import { Routes } from "../../../routes";
import { toastFailed } from "../../../utils";

export const CreatePromotion = () => {
    const [error, setError] = useState("");
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';
    const history = useHistory()

    const [rangeValue, setRangeValue] = useState([]);

    const [dataDetail, setDataDetail] = useState({
        name: "",
        code: "",
        from_date: undefined,
        to_date: undefined,
        rate: "",
        special_price: "",
        member_price: ""
    })

    const handleRangeChange = (dates) => {
        setRangeValue(dates);
        setDataDetail({ ...dataDetail, from_date: dates[0].format('YYYY-MM-DD'), to_date: dates[1].format('YYYY-MM-DD') })
    };

    const handleInput = (e, name) => {
        const newData = { ...dataDetail };
        newData[name] = e.target.value;
        setDataDetail(newData)
    }

    const handleCreateData = async () => {
        try {
            const response = await apiCreatePromotion(dataDetail)
            if (response.status === 200) {
                history.push(Routes.Promotion.path)
            } else {
                toastFailed(response.message)
            }
        } catch (e) {
            console.log(e);
        }
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
                                            onChange={(e) => handleInput(e, "name")}
                                            value={dataDetail.name}
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
                                            onChange={(e) => handleInput(e, "code")}
                                            value={dataDetail.code}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8} className="mb-3">
                                    <Form.Group id="SKU" className="form-from_date">
                                        <Form.Label>
                                            From Date <span className="text-danger">*</span>
                                        </Form.Label>
                                        <div>
                                            <Space size={20} direction="vertical">
                                                <RangePicker
                                                    value={rangeValue}
                                                    format={dateFormat}
                                                    onChange={handleRangeChange}
                                                />
                                            </Space>
                                        </div>
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
                                            onChange={(e) => handleInput(e, "rate")}
                                            value={dataDetail.rate}
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
                                            onChange={(e) => handleInput(e, "special_price")}
                                            value={dataDetail.special_price}
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
                                            value={dataDetail.member_price}
                                            onChange={(e) => handleInput(e, "member_price")}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Label>Description</Form.Label>
                            <Row className="px-2">
                                <textarea rows={3} className="form-control" value={dataDetail.description} onChange={(e) => handleInput(e, "description")} />
                            </Row>
                            <div className="mt-3">
                                <Button variant="primary" onClick={handleCreateData}>
                                    Create Promotion
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};
