import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Card, Badge, Table } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { changeTextToThreeDot, formatTime } from "../../../utils";

export const TransactionTable = ({ pageIndex, pageSize, listData }) => {

    const TableRow = (props) => {
        const {
            id,
            transaction_number,
            amount,
            order_date,
            bank_code,
            bank_status,
            bank_message,
            created_at,
            index,
        } = props;
        const statusBtn = (status) => {
            if (status === "pending") {
                return (
                    <Badge bg="warning" className="me-1">
                        Pending
                    </Badge>
                );
            } else if (status === "00") {
                return (
                    <Badge bg="success" className="me-1">
                        Paid
                    </Badge>
                );
            } else if (status === "02") {
                return (
                    <Badge bg="danger" className="me-1">
                        Failed
                    </Badge>
                );
            }
        };

        return (
            <tr>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {index + (pageIndex - 1) * pageSize + 1}
                    </Card.Link>
                </td>
                <td>{transaction_number ? changeTextToThreeDot(transaction_number, 40) : "--"}</td>
                <td><div className="text-danger">{amount}</div></td>
                <td>{order_date ? formatTime(order_date) : "--"}</td>
                <td>{bank_code ? bank_code : "--"}</td>
                <td>{bank_status ? statusBtn(bank_status) : "--"}</td>
                <td>{bank_message ? bank_message : "--"}</td>
                <td>{created_at ? formatTime(created_at) : "--"}</td>
                <td>
                    <Link
                        to={`/transaction-log/${id}`}
                        className="text-primary fw-bold"
                    >
                        <FontAwesomeIcon
                            icon={faEye}
                            className="me-2 fs-5"
                        />
                    </Link>

                </td>
            </tr>
        );
    };

    return (
        <>
            <Card border="light" className="shadow-sm mb-4">
                <Card.Body className="">
                    <Table
                        responsive
                        className="table-centered table-nowrap rounded mb-0"
                    >
                        <thead className="thead-light">
                            <tr>
                                <th className="border-0">#</th>
                                <th className="border-0">TRANSACTION</th>
                                <th className="border-0">AMOUNT</th>
                                <th className="border-0">ORDER DATE</th>
                                <th className="border-0">BANK CODE</th>
                                <th className="border-0">BANK STATUS</th>
                                <th className="border-0">BANK MESSAGE</th>
                                <th className="border-0">DATE CREATED</th>
                                <th className="border-0">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listData && listData.length > 0 ? (listData.map((transaction, index) => (
                                <TableRow
                                    index={index}
                                    key={`page-traffic-${transaction.id}`}
                                    {...transaction}
                                />
                            ))) : <></>}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
};
