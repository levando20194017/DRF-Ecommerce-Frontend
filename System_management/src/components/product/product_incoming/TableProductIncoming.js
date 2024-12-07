import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Table, Image } from "@themesberg/react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Routes } from "../../../routes";
import { formatPrice, formatTime, toastFailed, toastSuccess } from "../../../utils";
import { changeTextToThreeDot } from "../../../utils";
import { ToastContainer } from "react-toastify";
import { Popconfirm } from "antd";
import ImageLink from "../../../assets/img/no-image.png";
import { apiDeleteProductIncoming, apiDetailProductIncoming } from "../../../services/product";

export default ({
    pageIndex,
    pageSize,
    listData,
    getListProductIncoming
}) => {
    const history = useHistory()

    const handleDeleteItem = async (id) => {
        try {
            const response = await apiDeleteProductIncoming(id);
            if (response.status === 200) {
                toastSuccess(response?.message);
                getListProductIncoming(); // Refresh the list
            } else {
                toastFailed(response?.message);
            }
        } catch (e) {
            toastFailed('Delete product incoming failed');
        }
    }

    const handleEdit = async (id) => {
        const response = await apiDetailProductIncoming(id);
        if (response.status === 200) {
            history.push(`/product/update-product-incoming/${id}`);
        } else {
            toastFailed(response.message);
        }
    }

    const TableRow = (props) => {
        const { id, index, product_image, product_name, cost_price, quantity_in, vat, shipping_cost, effective_date } = props;
        return (
            <tr>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {index + (pageIndex - 1) * pageSize + 1}
                    </Card.Link>
                </td>
                <td>
                    <Image src={!product_image ? ImageLink : `${process.env.REACT_APP_IMAGE_URL}${product_image}`}
                        className="product-thumbnail me-2" />
                </td>
                <td>
                    {changeTextToThreeDot(product_name, 20)}
                </td>
                <td className="text-danger">{formatPrice(cost_price)}</td>
                <td>
                    {quantity_in}
                </td>
                <td className="text-danger">{vat}</td>
                <td className="text-danger">{shipping_cost}</td>
                <td>{formatTime(effective_date)}</td>
                <td>
                    <Link
                        to={Routes.NullLink.path}
                        className="text-primary fw-bold"
                    >
                        <FontAwesomeIcon
                            icon={faEdit}
                            className="me-2 fs-5"
                            onClick={() => handleEdit(id)}
                        />
                    </Link>
                    <Popconfirm
                        title="Are you sure delete this Item?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDeleteItem(id)}
                        className="cursor-pointer"
                    >
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="me-2 fs-5 text-danger cursor-pointer"
                        />
                    </Popconfirm>
                </td>
            </tr>
        );
    };

    return (
        <>
            <ToastContainer />
            <Card border="light" className="shadow-sm mb-4">
                <Card.Body className="">
                    <Table
                        responsive
                        className="table-centered table-nowrap rounded mb-0"
                    >
                        <thead className="thead-light">
                            <tr>
                                <th className="border-0" style={{ width: "3%" }}>#</th>
                                <th className="border-0">IMAGE</th>
                                <th className="border-0">NAME</th>
                                <th className="border-0">COST</th>
                                <th className="border-0">QUANTITY IN</th>
                                <th className="border-0">VAT</th>
                                <th className="border-0">SHIPPING COST</th>
                                <th className="border-0">DATE ADD</th>
                                <th className="border-0">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listData && listData.length > 0 ? listData.map((product, index) => (
                                <TableRow
                                    index={index}
                                    key={`page-traffic-${product.id}`}
                                    {...product}
                                />
                            )) : <></>}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
};
