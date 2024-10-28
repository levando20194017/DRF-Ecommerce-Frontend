import React, {useEffect, useState} from "react";
import {Breadcrumb, Container, Form, InputGroup} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {TransactionTable} from "../../../../components/product/transaction/Tables";
import {NUMBER_ITEM_PAGE, status} from "../../../../enums";
import {apiGetListTransaction} from "../../../../services/transaction";
import ListPagination from "../../../../components/common/ListPagination";
import {Link} from "react-router-dom";

export default () => {
    const [pageIndex, setPageIndex] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [merchantReference, setMerchantReference] = useState('')
    const [transactions, setTransactions] = useState({})
    useEffect(() => {
        getListTransaction()
    }, [pageIndex])

    useEffect(() => {
        getListTransaction()
    }, [merchantReference]);

    const getListTransaction = async () => {
        try {
            const params = {
                PageIndex: pageIndex,
                PageSize: NUMBER_ITEM_PAGE,
                merchantReference: merchantReference
            }
            const response = await apiGetListTransaction(params)
            if (response?.data.statusCode === status.SUCCESS) {
                setTransactions(response?.data?.data?.source)
                setTotalPages(response?.data?.data?.totalPages)
            }
        } catch (e) {
        }
    }
    const handlePageChange = (newPage) => {
        if (newPage <= totalPages) {
            setPageIndex(newPage);
        }
    };

    const handleInput = (e) => {
        const {value} = e.target
        setMerchantReference(value)
    }

    return (
        <>

            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="w-100 mb-4 mb-xl-0">
                    <Breadcrumb className="d-none d-md-inline-block"
                                listProps={{className: "breadcrumb-dark breadcrumb-transparent"}}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome}/></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={'/order'}>Order</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>Transaction Log</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <h4 className="mb-0">Transaction Log</h4>
                    </div>
                </div>
            </div>
            <Container fluid className="px-0 pb-3">
                <div className="d-flex justify-content-between w-100">
                    <div className="d-flex align-items-center">
                        <Form className="navbar-search">
                            <Form.Group id="topbarSearch">
                                <InputGroup className="input-group-merge search-bar">
                                    <InputGroup.Text><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="merchantReference"
                                        placeholder="Search"
                                        onChange={(e) => handleInput(e)}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </Container>

            <TransactionTable page={pageIndex} transactions={transactions}/>
            {totalPages > 1 && (
                <ListPagination
                    page={pageIndex}
                    pageMax={totalPages}
                    onPageChange={handlePageChange}
                ></ListPagination>
            )}
        </>
    );
}