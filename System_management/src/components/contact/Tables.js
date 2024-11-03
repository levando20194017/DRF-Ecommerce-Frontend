import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Table } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../../routes";
import { pageContact } from "../../data/tables";

export const ContactTable = () => {
    const TableRow = (props) => {
        const { id, fullName, email, phone, content, createdAt } = props;

        return (
            <tr>
                <td>
                    <Card.Link
                        href={Routes.NullLink.path}
                        className="text-primary fw-bold"
                    >
                        {id}
                    </Card.Link>
                </td>
                <td>{fullName}</td>
                <td>{email ? email : "--"}</td>
                <td>{phone ? phone : "--"}</td>
                <td>{createdAt}</td>
                <td>
                    <Link
                        to={Routes.NullLink.path}
                        className="text-primary fw-bold"
                    >
                        <FontAwesomeIcon icon={faEdit} className="me-2 fs-5" />
                    </Link>
                    <Link
                        to={Routes.NullLink.path}
                        className="text-primary fw-bold"
                    >
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="me-2 fs-5 text-danger"
                        />
                    </Link>
                </td>
            </tr>
        );
    };

    return (
        <Card border="light" className="shadow-sm mb-4">
            <Card.Body className="">
                <Table
                    responsive
                    className="table-centered table-nowrap rounded mb-0"
                >
                    <thead className="thead-light">
                        <tr>
                            <th className="border-0">#</th>
                            <th className="border-0">FULL NAME</th>
                            <th className="border-0">EMAIL</th>
                            <th className="border-0">PHONE</th>
                            <th className="border-0">DATE CREATED</th>
                            <th className="border-0">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageContact.map((contact) => (
                            <TableRow
                                key={`page-traffic-${contact.id}`}
                                {...contact}
                            />
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};
