import React, {useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {Card, Table} from "@themesberg/react-bootstrap";
import {changeTextToThreeDot} from "../../../utils";
import ModalReferenceBank from "./modal/ModalRefrenceBank";

export const DetailTransactionTable = (props) => {
    const {transactionDetails} = props
    const modalReferenceBank = useRef(null)

    const TableRow = (props) => {
        const {
            msgId,
            txnStatus,
            txnStatusCode,
            txnStatusDescription,
            referenceBanks,
            index
        } = props;
        const handleClick = () => {
            modalReferenceBank.current.open(referenceBanks)
        }

        return (
            <tr>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {index + 1}
                    </Card.Link>
                </td>
                <td>{msgId ? changeTextToThreeDot(msgId, 40) : "--"}</td>
                <td>{txnStatusDescription ? changeTextToThreeDot(txnStatusDescription, 40) : "--"}</td>
                <td>{txnStatus ? changeTextToThreeDot(txnStatus, 40) : "--"}</td>
                <td>{txnStatusCode ? changeTextToThreeDot(txnStatusCode, 40) : "--"}</td>
                <td>
                    {
                        referenceBanks.length > 0 ? (<div>
                            <FontAwesomeIcon
                                icon={faEye}
                                onClick={() => handleClick()}
                                className="me-2 fs-5 cursor"
                            />
                        </div>) : <></>
                    }

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
                            <th className="border-0">MSG ID</th>
                            <th className="border-0">DESCRIPTION</th>
                            <th className="border-0">STATUS</th>
                            <th className="border-0">STATUS CODE</th>
                            <th className="border-0">BANK</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactionDetails && transactionDetails.length > 0 ? (transactionDetails.map((item, index) => (
                            <TableRow
                                index={index}
                                key={`page-traffic-${item.id}`}
                                {...item}
                            />
                        ))) : <></>}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <div className="bank-table">
                <ModalReferenceBank
                    ref={modalReferenceBank}/>
            </div>

        </>
    );
};
