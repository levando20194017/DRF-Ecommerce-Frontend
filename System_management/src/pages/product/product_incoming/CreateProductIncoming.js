import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { Row } from "@themesberg/react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router-dom";
import { Routes } from "../../../routes";
import AddProductToStore from "../../../components/product/product_incoming/AddProductToStore";

export default () => {

    const { id } = useParams();
    const history = useHistory()

    const handleCreate = async (params) => {

    }

    return (
        <>
            <ToastContainer />
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
                <div className="d-block mb-4 mb-xl-0">
                    <Breadcrumb
                        className="d-none d-md-inline-block"
                        listProps={{
                            className: "breadcrumb-dark breadcrumb-transparent",
                        }}
                    >
                        <Breadcrumb.Item>
                            <FontAwesomeIcon icon={faHome} />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => history.push(Routes.ProductIncoming.path)}>Product Incoming</Breadcrumb.Item>
                        <Breadcrumb.Item active>Add product to Store</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Add product to Store</h4>
                </div>
            </div>

            <Row>
                <AddProductToStore handleCreate={handleCreate} />
            </Row>
        </>
    );
};
