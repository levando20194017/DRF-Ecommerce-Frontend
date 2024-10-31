import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Table, Image } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "../../../routes";
import { formatTime, toastFailed, toastSuccess } from "../../../utils";
import { changeTextToThreeDot } from "../../../utils";
import ListPagination from "../../common/ListPagination";
import { ToastContainer } from "react-toastify";
import { Popconfirm } from "antd";
import ImageLink from "../../../assets/img/no-image.png";

export default (props) => {
    const [data, setData] = useState([])
    const modalDelete = useRef(null)
    const [pageIndex, setPageIndex] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [pageSize, setPageSize] = useState(10);

    const handleOpenModalDelete = (id) => {

    }
    const handleDeleteItem = () => {

    }

    const getListData = async () => {
        try {
            const params = {
                PageIndex: pageIndex,
                PageSize: 10,
            }

            // if (response?.data.statusCode === status.SUCCESS)
        } catch (e) {
        }
    }

    useEffect(() => {
        getListData();
    }, [pageIndex])

    const handleEdit = async (id) => {
        // const response = await apiDetailPromtion(id)
        // if (response.status === 200) {
        //     history.push(Routes.PromotionUpdate.path)
        // }       
    }

    const TableRow = (props) => {
        const { id, index, product_image, product_name, cost_price, quantity_in, vat, shipping_cost, effective_date } = props;
        return (
            <tr>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {index + 1}
                    </Card.Link>
                </td>
                <td>
                    <Image src={!product_image ? ImageLink : `${process.env.REACT_APP_IMAGE_URL}${product_image}`}
                        className="product-thunmbnail me-2" />
                </td>
                <td>
                    {changeTextToThreeDot(product_name, 20)}
                </td>
                <td className="text-danger">{cost_price}</td>
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
                    >
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="me-2 fs-5 text-danger cursor-pointer"
                            onClick={() => handleOpenModalDelete(id)}
                        />
                    </Popconfirm>
                </td>
            </tr>
        );
    };
    const handlePageChange = (newPage) => {
        if (newPage <= totalPages) {
            setPageIndex(newPage);
        }
    };

    return (
        <>
            <ToastContainer />
            <Card border="light" className="shadow-sm mb-4">
                <Card.Body className="pb-0">
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
                            {data && data.length > 0 ? data.map((product, index) => (
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
            {totalPages > 1 && (
                <ListPagination
                    page={pageIndex}
                    pageMax={totalPages}
                    onPageChange={handlePageChange}
                ></ListPagination>
            )}

            {/* <PaginationCommon
                totalRecord={totalRecord}
                pageSize={pageSize}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                setPageSize={setPageSize} /> */}
        </>
    );
};
