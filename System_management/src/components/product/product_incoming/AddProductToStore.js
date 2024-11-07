import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { ToastContainer } from "react-toastify";
import { InputNumber, Select } from 'antd';
import FormInputFloat from "../../common/FormInputFloat";
import FormInputNumber from "../../common/FormInputNumber";
import FormInputDate from "../../common/FormInputDate";
import { apiAddProductToStore, apiGetProductList } from "../../../services/product";
import { ToastFailed, ToastSuccess } from "../../common/Toast";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../routes";

export default () => {
    const [loading, setLoading] = useState(false)
    const [optionsProduct, setOptionsProduct] = useState([])
    const history = useHistory()
    const [formData, setFormData] = useState({
        product_id: 0,
        store_id: 1,
        cost_price: 0,
        quantity_in: 0,
        vat: 0,
        shipping_cost: 0,
        effective_date: ""
    });

    const [errors, setErrors] = useState({
        product_id: "",
        cost_price: "",
        quantity_in: "",
        vat: "",
        shipping_cost: "",
        effective_date: ""
    })

    const getListProducts = async () => {
        try {
            const response = await apiGetProductList({ pageIndex: 1, pageSize: 1000, searchName: "" })
            if (response.status === 200) {
                setOptionsProduct(response.data.products.map((item) => ({
                    label: item.name,
                    value: item.id,
                    imgUrl: item.image
                })))
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getListProducts();
    }, [])

    const handleChangeProduct = (value) => {
        setFormData({ ...formData, product_id: value })
    }
    const handleSubmit = async () => {
        const newErrors = {
            product_id: formData.product_id ? "" : "Product is required!",
            cost_price: formData.cost_price ? "" : "Cost price is required!",
            quantity_in: formData.quantity_in ? "" : "Quantity is required!",
            vat: "",
            shipping_cost: "",
            effective_date: formData.effective_date ? "" : "Effective date is required!"
        }
        setErrors(newErrors)

        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        try {
            setLoading(true)
            const response = await apiAddProductToStore(formData)
            if (response.status === 200) {
                history.push(Routes.ProductIncoming.path)
                ToastSuccess("Add product to store successfully.")
            }
        } catch (e) {
            console.log(e);
            ToastFailed("Add product to store failed.")
        }
    }

    console.log(formData);


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
                                                onChange={handleChangeProduct}
                                            >
                                                {optionsProduct.map(option => (
                                                    <Select.Option key={option.value} value={option.value} label={option.label}>
                                                        <img src={`${process.env.REACT_APP_IMAGE_URL}${option.imgUrl}`} alt={option.label} style={{ width: 50, marginRight: 8 }} />
                                                        {option.label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </div>
                                        {errors.product_id && <div className="text-danger">{errors.product_id}</div>}
                                    </Form.Group>
                                </Col>
                            </Row>
                            {/* <Row>
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
                            </Row> */}
                            <Row>
                                <Col md={4} className="mb-3">
                                    <FormInputNumber
                                        title="Giá nhập"
                                        isRequired={true}
                                        keyField={"cost_price"}
                                        formData={formData}
                                        setFormData={setFormData} />
                                    {errors.cost_price && <div className="text-danger">{errors.cost_price}</div>}
                                </Col>
                                <Col md={4} className="mb-3">
                                    <FormInputNumber
                                        title="Số lượng"
                                        isRequired={true}
                                        keyField={"quantity_in"}
                                        formData={formData}
                                        setFormData={setFormData} />
                                    {errors.quantity_in && <div className="text-danger">{errors.quantity_in}</div>}
                                </Col>
                                <Col md={4} className="mb-3">
                                    <FormInputFloat
                                        title={"Thuế"}
                                        isRequired={true}
                                        keyField={"vat"}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                    {errors.vat && <div className="text-danger">{errors.vat}</div>}
                                </Col>
                            </Row>

                            <Row>
                                <Col md={4} className="mb-3">
                                    <FormInputNumber
                                        title={"Phí vận chuyển"}
                                        isRequired={true}
                                        keyField={"shipping_cost"}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                    {errors.shipping_cost && <div className="text-danger">{errors.shipping_cost}</div>}
                                </Col>
                                <Col md={4} className="mb-3">
                                    <FormInputDate
                                        title={"Ngày nhập"}
                                        isRequired={true}
                                        keyField={"effective_date"}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                    {errors.effective_date && <div className="text-danger">{errors.effective_date}</div>}
                                </Col>
                            </Row>

                            <div className="mt-3">
                                <Button variant="primary" onClick={handleSubmit}>
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
