import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Table } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "../../../routes";
import { useHistory } from "react-router-dom";
import { formatTime, toastFailed, toastSuccess } from "../../../utils";
import { changeTextToThreeDot } from "../../../utils";
import { ToastContainer } from "react-toastify";
import { Popconfirm } from "antd";
import { apiDeletePromotion, apiDetailPromotion, apiRestorePromotion } from "../../../services/promotion";
import { UndoOutlined } from '@ant-design/icons';
import { discountType } from "../../../enums/common";

export const TablePromotion = ({ pageIndex, pageSize, listData, handleGetListPromotions }) => {
    const history = useHistory()

    const handleDeleteItem = async (id) => {
        try {
            const response = await apiDeletePromotion(id)
            if (response.status == 200) {
                toastSuccess(response.message)
                handleGetListPromotions()
            }
        } catch (e) {

        }
    }
    const handleEdit = async (id) => {
        const response = await apiDetailPromotion(id)
        if (response.status === 200) {
            history.push(`/product/update-promotion/${id}`)
        }
    }

    const handleRestoreItem = async (id) => {
        try {
            const response = await apiRestorePromotion({ id });
            if (response.status === 200) {
                toastSuccess(response?.message);
                handleGetListPromotions(); // Refresh the list
            } else {
                toastFailed(response?.message);
            }
        } catch (e) {
            toastFailed('Delete catalog failed');
        }
    }

    const TableRow = (props) => {
        const { id, index, name, code, description, discount_value, discount_type, from_date, to_date, delete_at } = props;
        return (
            <tr style={{ opacity: delete_at ? 0.5 : 1, backgroundColor: delete_at ? "#d1d5d8" : "#fff" }}>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {index + (pageIndex - 1) * pageSize + 1}
                    </Card.Link>
                </td>
                <td>
                    {changeTextToThreeDot(name, 20)}
                </td>
                <td>
                    {changeTextToThreeDot(code, 20)}
                </td>
                <td>
                    {changeTextToThreeDot(description, 50)}
                </td>
                <td className="text-danger">{discount_value}{discount_type === discountType.percentage ? "%" : "đ"}</td>
                <td>{discount_type}</td>
                <td>{formatTime(from_date)}</td>
                <td>{formatTime(to_date)}</td>
                {/* <td>{formatTime(created_at)}</td> */}
                <td>{delete_at ? formatTime(delete_at) : "---"}</td>
                <td>
                    {delete_at ?
                        <div className="text-center">
                            <Popconfirm
                                title="Are you sure you want to restore this item?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => handleRestoreItem(id)}
                                className="cursor-pointer text-center"
                            >
                                <UndoOutlined style={{ color: "green", opacity: 1, fontSize: "25px" }} className="cursor-pointer" />
                            </Popconfirm>
                        </div>
                        :
                        <div className="d-flex gap-3">
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
                            >
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    className="me-2 fs-5 text-danger cursor-pointer"
                                />
                            </Popconfirm>
                        </div>
                    }
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
                                <th className="border-0">NAME</th>
                                <th className="border-0">CODE</th>
                                <th className="border-0">DESCRIPTION</th>
                                <th className="border-0">DISCOUNT</th>
                                <th className="border-0">DISCOUNT_TYPE</th>
                                {/* <th className="border-0">SPECIAL_PRICE</th>
                                <th className="border-0">MEMBER_PRICE</th> */}
                                <th className="border-0">FROM_DATE</th>
                                <th className="border-0">END_DATE</th>

                                <th className="border-0">DELETED_AT</th>
                                <th className="border-0">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listData && listData.length > 0 ? listData.map((promotion, index) => (
                                <TableRow
                                    index={index}
                                    key={`page-traffic-${promotion.id}`}
                                    {...promotion}
                                />
                            )) : <></>}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
};
