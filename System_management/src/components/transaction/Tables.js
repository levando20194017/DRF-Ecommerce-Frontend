import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {Card, Badge, Table} from "@themesberg/react-bootstrap";
import {Link} from "react-router-dom";
import {changeTextToThreeDot, formatTime} from "../../../utils";
import {NUMBER_ITEM_PAGE} from "../../../enums";

export const TransactionTable = (props) => {
    const {transactions, page} = props
    const getMemberPrice = (price) => {
        return (
            <>
                <span> ${price}</span>
            </>
        );
    };
    const TableRow = (props) => {
        const {
            id,
            transactionNumber,
            amount,
            orderDate,
            bankCode,
            bankStatus,
            createdAt,
            index, page
        } = props;
        const statusBtn = (productStatus) => {
            if (productStatus === 0) {
                return (
                    <Badge bg="warning" className="me-1">
                        Due
                    </Badge>
                );
            } else if (productStatus === 1) {
                return (
                    <Badge bg="success" className="me-1">
                        Paid
                    </Badge>
                );
            } else if (productStatus === 2) {
                return (
                    <Badge bg="danger" className="me-1">
                        Cancelled
                    </Badge>
                );
            }
        };

        return (
            <tr>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {index + (page - 1) * NUMBER_ITEM_PAGE + 1}
                    </Card.Link>
                </td>
                <td>{transactionNumber ? changeTextToThreeDot(transactionNumber, 40) : "--"}</td>
                <td>{amount ? getMemberPrice(amount) : "--"}</td>
                <td>{bankCode ? bankCode : "--"}</td>
                <td>{orderDate ? formatTime(orderDate) : "--"}</td>
                <td>{bankStatus ? statusBtn(bankStatus) : "--"}</td>
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
                            <th className="border-0">BANK CODE</th>
                            <th className="border-0">ORDER DATE</th>
                            <th className="border-0">BANK STATUS</th>
                            <th className="border-0">ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions && transactions.length > 0 ? (transactions.map((transaction, index) => (
                            <TableRow
                                index={index}
                                page={page}
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
