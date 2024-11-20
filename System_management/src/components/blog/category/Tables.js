import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Image, Table } from "@themesberg/react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { UndoOutlined } from '@ant-design/icons';
import { Routes } from "../../../routes";
import { changeTextToThreeDot, formatTime, toastFailed, toastSuccess } from "../../../utils";
import { apiDeleteCategory, apiDetailCategory, apiRestoreCategory } from "../../../services/category";
import { Popconfirm } from "antd";

export const CategoryTable = (props) => {

    const { categories, getListCategories, pageIndex, pageSize } = props
    const history = useHistory()

    const handleDeleteCategory = async (id) => {
        try {
            const response = await apiDeleteCategory(id)
            if (response.status === 200) {
                toastSuccess(response.message)
                getListCategories()
            } else {
                toastFailed(response.message)
            }
        } catch (e) {
            toastFailed('Delete Category Failed')
        }
    }

    const handleRestoreItem = async (id) => {
        try {
            const response = await apiRestoreCategory({ category_id: id });
            if (response.status === 200) {
                toastSuccess(response?.message);
                getListCategories(); // Refresh the list
            } else {
                toastFailed(response?.message);
            }
        } catch (e) {
            toastFailed('Delete catalog failed');
        }
    }

    const handleClickEdit = async (id) => {
        try {
            const response = await apiDetailCategory(id)
            if (response.status === 200) {
                history.push(`/blogs/update-category/${id}`)
            } else {
                toastFailed(response.message)
            }
        } catch (e) {
            console.log(e);
        }
    }

    const TableRow = (props) => {
        const { id, name, created_at, delete_at, index } = props;
        return (
            <tr style={{ opacity: delete_at ? 0.5 : 1, backgroundColor: delete_at ? "#d1d5d8" : "#fff" }}>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {index + (pageIndex - 1) * pageSize + 1}
                    </Card.Link>
                </td>
                <td style={{ maxWidth: "600px" }}>{changeTextToThreeDot(name, 60)}</td>
                <td>{formatTime(created_at)}</td>
                <td>{delete_at ? formatTime(delete_at) : "---"}</td>
                <td>
                    {delete_at ?
                        <div>
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
                                    onClick={() => handleClickEdit(id)}
                                />
                            </Link>
                            <Popconfirm
                                title="Are you sure you want to delete this item?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => handleDeleteCategory(id)}
                                className="cursor-pointer"
                            >
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    className="me-2 fs-5 text-danger"
                                />
                            </Popconfirm>
                        </div>
                    }
                </td>
            </tr >
        );
    };

    return (
        <>
            <Card border="light" className="shadow-sm mb-4 table-description">
                <Card.Body className="">
                    <Table
                        responsive
                        className="table-centered table-nowrap rounded mb-0"
                    >
                        <thead className="thead-light">
                            <tr>
                                <th className="border-0">#</th>
                                <th className="border-0">NAME</th>
                                <th className="border-0">DATE CREATED</th>
                                <th className="border-0">DATE DELETED</th>
                                <th className="border-0">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories && categories.length > 0 ? categories.map((category, index) => (
                                <TableRow
                                    index={index}
                                    key={`page-traffic-${category.id}`}
                                    {...category}
                                />
                            )) : <></>}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        </>
    );
};
