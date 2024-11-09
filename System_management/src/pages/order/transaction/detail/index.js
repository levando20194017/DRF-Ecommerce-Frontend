import React, { useEffect, useState } from "react";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { apiDetailTransaction } from "../../../../services/transaction";
import { status } from "../../../../enums";
import { DetailTransactionTable } from "../../../../components/transaction/DetailTable";
import "./style.scss"

export default () => {
    const [transaction, setTransaction] = useState({})
    const [transactionDetails, setTransactionDetails] = useState({})
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            getDetailTransaction()
        }
    }, [id])

    const getDetailTransaction = async () => {
        try {
            const response = await apiDetailTransaction(id)
            if (response?.data.statusCode === status.SUCCESS) {
                setTransaction(response?.data?.data)
                setTransactionDetails(response?.data?.data?.transactionDetails)
            }
        } catch (e) {

        }
    }

    return (
        <>
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
                <div className="w-100 mb-4 mb-xl-0">
                    <Breadcrumb className="d-none d-md-inline-block"
                        listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/order'}>Order</Link>

                        </Breadcrumb.Item>
                        <Breadcrumb.Item> <Link to={'/transaction-log'}>Transaction Log</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{transaction?.transactionNumber}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <h4 className="mb-0">Transaction Detail : {transaction?.transactionNumber}</h4>
                    </div>
                </div>
            </div>

            <DetailTransactionTable transactionDetails={transactionDetails} />

        </>
    );
}