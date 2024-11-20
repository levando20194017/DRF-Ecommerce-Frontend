import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Image, Table } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import ImageLink from "../../../assets/img/no-image.png";
import { Routes } from "../../../routes";
import { useHistory } from "react-router-dom";
import { formatTime, toastFailed, toastSuccess } from "../../../utils";
import { apiDeleteCatalog, apiDetailCatalog, apiRestoreCatalog } from "../../../services/catalog";
import { Popconfirm } from "antd";
import { ToastContainer } from "react-toastify";
import { UndoOutlined } from '@ant-design/icons';

export const CatalogTable = ({ pageIndex, pageSize, listData, getListCatalogs }) => {
    const history = useHistory();

    // Flatten the catalog tree with indentation based on the level
    const flattenArray = (tree, level = 1) => {
        const flatArray = [];

        for (const item of tree) {
            // Add item with level for indentation
            flatArray.push({ ...item, level });

            // Recursively flatten children
            if (item.children && item.children.length > 0) {
                flatArray.push(...flattenArray(item.children, level + 1));
            }
        }

        return flatArray;
    };

    const handleDeleteItem = async (id) => {
        try {
            const response = await apiDeleteCatalog(id);
            if (response.status === 200) {
                toastSuccess(response?.message);
                getListCatalogs(); // Refresh the list
            } else {
                toastFailed(response?.message);
            }
        } catch (e) {
            toastFailed('Delete catalog failed');
        }
    };

    const handleRestoreItem = async (id) => {
        try {
            const response = await apiRestoreCatalog({ id });
            if (response.status === 200) {
                toastSuccess(response?.message);
                getListCatalogs(); // Refresh the list
            } else {
                toastFailed(response?.message);
            }
        } catch (e) {
            toastFailed('Delete catalog failed');
        }
    };

    const handleClick = async (id) => {
        const response = await apiDetailCatalog(id);
        if (response.status === 200) {
            history.push(`/product/update-catalog/${id}`);
        } else {
            toastFailed(response.message);
        }
    };

    const TableRow = (props) => {
        const { index, id, name, created_at, level, delete_at, image } = props;

        // Style level for indentation
        // const rowStyle = { paddingLeft: `${(level - 1) * 20 + 10}px` }; // Indentation
        const indentation = '--- '.repeat(level - 1);
        return (
            <tr style={{ opacity: delete_at ? 0.5 : 1, backgroundColor: delete_at ? "#d1d5d8" : "#fff" }}>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {index + (pageIndex - 1) * pageSize + 1}
                    </Card.Link>
                </td>
                <td>
                    <Image src={image ? `${process.env.REACT_APP_IMAGE_URL}${image}` : ImageLink}
                        height={50} width={50}
                        className="product-thumbnail me-2" />
                </td>
                {/* <td style={rowStyle}>{name}</td> */}
                <td>{`${indentation}${name}`}</td>
                <td>{formatTime(created_at)}</td>
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
                                    onClick={() => handleClick(id)}
                                    style={{ color: "blue" }}
                                />
                            </Link>
                            <Popconfirm
                                title="Are you sure you want to delete this item?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => handleDeleteItem(id)}
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
            </tr>
        );
    };

    // Flatten the listData for rendering
    const flatCatalogs = flattenArray(listData);

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
                                <th className="border-0" style={{ width: "5%" }}>#</th>
                                <th className="border-0" style={{ width: "15%" }}>IMAGE</th>
                                <th className="border-0">NAME</th>
                                <th className="border-0">DATE CREATED</th>
                                <th className="border-0">DATE DELETED</th>
                                <th className="border-0" style={{ width: "5%" }}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flatCatalogs && flatCatalogs.length > 0 ? flatCatalogs.map((catalog, index) => (
                                <TableRow
                                    index={index}
                                    key={`catalog-${catalog.id}`}
                                    {...catalog}
                                />
                            )) : <tr><td colSpan="5">No catalogs found.</td></tr>}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
}
