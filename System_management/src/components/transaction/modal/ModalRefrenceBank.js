import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Modal, Card, Table } from "@themesberg/react-bootstrap";
import { changeTextToThreeDot, formatTime } from "../../../utils";

const ModalReferenceBank = (props, ref) => {
    const [showModal, setShowModal] = useState(false);
    const [banks, setBanks] = useState()

    const close = () => setShowModal(false);
    const open = (value) => {
        setBanks(value)
        setShowModal(true);
    };
    useImperativeHandle(ref, () => ({
        open,
        close,
    }));
    const TableRow = (props) => {
        const {
            index,
            amount,
            transactionReference,
            typeReference,
            createdAt,
        } = props;

        return (
            <tr>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {index + 1}
                    </Card.Link>
                </td>
                <td>{amount ? amount : "--"}</td>
                <td>{transactionReference ? changeTextToThreeDot(transactionReference, 40) : "--"}</td>
                <td>{typeReference ? changeTextToThreeDot(typeReference, 40) : "--"}</td>
                <td>{formatTime(createdAt)}</td>
            </tr>
        );
    };

    return (
        <>
            <Modal as={Modal.dialog} centered show={showModal} onHide={close} className="bank-modal">
                <Modal.Body>
                    <Card border="light" className="shadow-sm mb-4">
                        <Card.Body className="">
                            <Table
                                responsive
                                className="table-centered table-nowrap rounded mb-0"
                            >
                                <thead className="thead-light">
                                    <tr>
                                        <th className="border-0">#</th>
                                        <th className="border-0">AMOUNT</th>
                                        <th className="border-0">TRANSACTION REFERENCE</th>
                                        <th className="border-0">TYPE</th>
                                        <th className="border-0">DATE CREATED</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {banks && banks.length > 0 ? (banks.map((bank, index) => (
                                        <TableRow
                                            key={`page-traffic-${bank.id}`}
                                            index={index}
                                            {...bank}
                                        />
                                    ))) : <></>}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    );
};
export default forwardRef(ModalReferenceBank);
