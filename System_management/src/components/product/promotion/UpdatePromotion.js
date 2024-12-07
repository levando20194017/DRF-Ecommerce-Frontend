import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { ToastContainer } from "react-toastify";
import { DatePicker, Select, Space, theme } from 'antd';
import { useHistory, useParams } from "react-router-dom";
import { apiDetailPromotion, apiEditPromotion } from "../../../services/promotion";
import dayjs from 'dayjs';
import { Routes } from "../../../routes";
const optionsType = [{
    value: "percentage",
    label: "Percentage Discount"
},
{
    value: "fixed",
    label: "Fixed Discount"
},
]
const optionsStatus = [{
    value: "active",
    label: "Active"
},
{
    value: "inactive",
    label: "Inactive"
},
{
    value: "expired",
    label: "Expired"
},]


export const UpdatePromotion = () => {
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
        discount_value: "",
        discount_type: "",
        discount_type: optionsType[0].value,
        status: optionsStatus[0].value,
    })
    const { id } = useParams();

    const handleGetDetailData = async () => {
        try {
            const response = await apiDetailPromotion(id)
            if (response.status === 200) {
                const data = response.data;
                setDataDetail(data)
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        handleGetDetailData()
    }, [])

    useEffect(() => {
        if (
            dataDetail.from_date &&
            dataDetail.to_date &&
            (rangeValue.length === 0 ||
                !rangeValue[0].isSame(dayjs(dataDetail.from_date)) ||
                !rangeValue[1].isSame(dayjs(dataDetail.to_date)))
        ) {
            setRangeValue([
                dayjs(dataDetail.from_date, dateFormat),
                dayjs(dataDetail.to_date, dateFormat),
            ]);
        }
    }, [dataDetail, rangeValue]);

    const handleRangeChange = (dates) => {
        setRangeValue(dates);
        setDataDetail({ ...dataDetail, from_date: dates[0].format('YYYY-MM-DD'), to_date: dates[1].format('YYYY-MM-DD') })
    };

    const handleInput = (e, name) => {
        const newData = { ...dataDetail };
        newData[name] = e.target.value;
        setDataDetail(newData)
    }

    const handleChangeOption = (name, value) => {
        const newData = { ...dataDetail };
        newData[name] = value;
        setDataDetail(newData)
    }

    const handleUpdateData = async () => {
        try {
            const response = await apiEditPromotion(dataDetail)
            if (response.status === 200) {
                history.push(Routes.Promotion.path)
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
                                            Discount type <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Select
                                            showSearch
                                            value={dataDetail.discount_type}
                                            onChange={(value) => handleChangeOption("discount_type", value)}
                                            options={optionsType}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <Form.Group id="SKU">
                                        <Form.Label>
                                            Discount value
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            onChange={(e) => handleInput(e, "discount_value")}
                                            value={dataDetail.discount_value}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <Form.Group id="SKU">
                                        <Form.Label>
                                            Status <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Select
                                            showSearch
                                            value={dataDetail.status}
                                            onChange={(value) => handleChangeOption("status", value)}
                                            options={optionsStatus}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Label>Description</Form.Label>
                            <Row className="px-2">
                                <textarea rows={3} className="form-control" value={dataDetail.description} onChange={(e) => handleInput(e, "description")} />
                            </Row>
                            <div className="mt-3">
                                <Button variant="primary" onClick={handleUpdateData}>
                                    Update Promotion
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};
