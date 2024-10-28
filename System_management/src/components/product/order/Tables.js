import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Card, Table } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../../../routes";
import { pageOrder } from "../../../data/tables";
import ModalDeleteItem from "../../common/ModalDelete";
import { useHistory } from "react-router-dom";

export const OrderTable = () => {
    const modalDeleteOrder = useRef(null);
    const history = useHistory();
    const TableRow = (props) => {
        const { id, name, description, createdAt } = props;
        return (
            <tr>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {id}
                    </Card.Link>
                </td>
                <td>{name}</td>
                <td>{description}</td>
                <td>{createdAt}</td>
                <td>
                    <Link
                        to={Routes.NullLink.path}
                        className="text-primary fw-bold"
                    >
                        <FontAwesomeIcon
                            icon={faEdit}
                            className="me-2 fs-5"
                            onClick={() => history.push("/order/detail")}
                        />
                    </Link>
                </td>
            </tr>
        );
    };

    return (
        <>
            <Card border="light" className="shadow-sm mb-4">
                <Card.Body className="pb-0">
                    <Table
                        responsive
                        className="table-centered table-nowrap rounded mb-0"
                    >
                        <thead className="thead-light">
                            <tr>
                                <th className="border-0">#</th>
                                <th className="border-0">TRANSACTION NUMBER</th>
                                <th className="border-0">GUEST</th>
                                <th className="border-0">TOTAL COST</th>
                                <th className="border-0">ORDER DATE</th>
                                <th className="border-0">GST AMOUNT</th>
                                <th className="border-0">SHIPPING COST</th>
                                <th className="border-0">LOCATION PICKUP</th>
                                <th className="border-0">STATUS</th>
                                <th className="border-0">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageOrder.map((order) => (
                                <TableRow
                                    key={`page-traffic-${order.id}`}
                                    {...order}
                                />
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <ModalDeleteItem
                ref={modalDeleteOrder}
                title={"Delete Order"}
                item={"order"}
            />
        </>
    );
};
