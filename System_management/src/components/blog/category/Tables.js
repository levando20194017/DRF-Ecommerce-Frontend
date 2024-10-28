import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Card, Image, Table} from "@themesberg/react-bootstrap";
import {Link, useHistory} from "react-router-dom";

import {Routes} from "../../../routes";
import ModalDeleteItem from "../../../components/common/ModalDelete";
import {changeTextToThreeDot, formatTime} from "../../../utils";
import {NUMBER_ITEM_PAGE} from "../../../enums";

export const CategoryTable = (props) => {

    const {categories, handleClickButtonDelete, page} = props
    const history = useHistory()
    const handleClickDelete = (category) => {
        handleClickButtonDelete(category);
    };

    const TableRow = (props) => {
        const {id, name, createdAt, index, page} = props;
        return (
            <tr>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {index + (page - 1) * NUMBER_ITEM_PAGE + 1}
                    </Card.Link>
                </td>
                <td style={{maxWidth: "600px"}}>{changeTextToThreeDot(name, 60)}</td>
                <td>{formatTime(createdAt)}</td>
                <td>
                    <Link
                        to={Routes.NullLink.path}
                        className="text-primary fw-bold"
                    >
                        <FontAwesomeIcon
                            icon={faEdit}
                            className="me-2 fs-5"
                            onClick={() => history.push(`/blogs/update-category/${id}`)}
                        />
                    </Link>
                    <Link
                        to={Routes.NullLink.path}
                        className="text-primary fw-bold"
                    >
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="me-2 fs-5 text-danger"
                            onClick={() => handleClickDelete(props)}
                        />
                    </Link>
                </td>
            </tr>
        );
    };

    return (
        <>
            <Card border="light" className="shadow-sm mb-4 table-description">
                <Card.Body className="pb-0">
                    <Table
                        responsive
                        className="table-centered table-nowrap rounded mb-0"
                    >
                        <thead className="thead-light">
                        <tr>
                            <th className="border-0">#</th>
                            <th className="border-0">NAME</th>
                            <th className="border-0">DATE CREATED</th>
                            <th className="border-0">ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories && categories.length > 0 ? categories.map((category, index) => (
                            <TableRow
                                index={index}
                                page={page}
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
