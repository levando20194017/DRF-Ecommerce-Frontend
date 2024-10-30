import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Form, Image, InputGroup, Table } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import ImageLink from "../../../assets/img/no-image.png"
import { Routes } from "../../../routes";
import ModalDeleteItem from "../../../components/common/ModalDelete";
import { useHistory } from "react-router-dom";
import { formatTime, toastFailed, toastSuccess } from "../../../utils";
import { changeTextToThreeDot } from "../../../utils";
import ListPagination from "../../common/ListPagination";
import { ToastContainer } from "react-toastify";
import { status } from "../../../enums";
import { Popconfirm } from "antd";

export const TablePromotion = (props) => {
    const [data, setData] = useState([
        {
            name: "Do",
            code: "Do",
            description: "Do xin chao ca nha,Do xin chao ca nha,Do xin chao ca nha,Do xin chao ca nha,Do xin chao ca nha,Do xin chao ca nha",
            rate: 0,
            specialPrice: 0,
            memberPrice: 0,
            fromDate: "1970-01-01",
            endDate: "1970-01-01",
            createdAt: "1970-01-01"
        },
        {
            name: "Do",
            code: "Do",
            description: "Do xin chao ca nha",
            rate: 0,
            specialPrice: 0,
            memberPrice: 0,
            fromDate: "1970-01-01",
            endDate: "1970-01-01",
            createdAt: "1970-01-01"
        },
        {
            name: "Do",
            code: "Do",
            description: "Do xin chao ca nha",
            rate: 0,
            specialPrice: 0,
            memberPrice: 0,
            fromDate: "1970-01-01",
            endDate: "1970-01-01",
            createdAt: "1970-01-01"
        }, {
            name: "Do",
            code: "Do",
            description: "Do xin chao ca nha",
            rate: 0,
            specialPrice: 0,
            memberPrice: 0,
            fromDate: "1970-01-01",
            endDate: "1970-01-01",
            createdAt: "1970-01-01"
        }
    ])
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
        const { id, index, name, code, description, rate, specialPrice, memberPrice, fromDate, endDate, createdAt } = props;
        return (
            <tr>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {index + 1}
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
                <td className="text-danger">{rate}%</td>
                <td className="text-danger">{specialPrice}</td>
                <td className="text-danger">{memberPrice}</td>
                <td>{formatTime(fromDate)}</td>
                <td>{formatTime(endDate)}</td>
                <td>{formatTime(createdAt)}</td>
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
                                <th className="border-0">NAME</th>
                                <th className="border-0">CODE</th>
                                <th className="border-0">DESCRIPTION</th>
                                <th className="border-0">RATE</th>
                                <th className="border-0">SPECIAL_PRICE</th>
                                <th className="border-0">MEMBER_PRICE</th>
                                <th className="border-0">FROM_DATE</th>
                                <th className="border-0">END_DATE</th>
                                <th className="border-0">CREATED_AT</th>
                                <th className="border-0">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? data.map((promotion, index) => (
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
