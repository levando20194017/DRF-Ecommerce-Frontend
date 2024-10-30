import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { Row } from "@themesberg/react-bootstrap";
import { CreatePromotion } from "../../../components/product/promotion/CreatePromotion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router-dom";
import { Routes } from "../../../routes";

export default () => {

    const { id } = useParams();
    const history = useHistory()

    const handleCreateCatalog = async (params) => {

    }

    return (
        <>
            <ToastContainer />
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
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
                        <Breadcrumb.Item onClick={() => history.push(Routes.Promotion.path)}>Promotion</Breadcrumb.Item>
                        <Breadcrumb.Item active>{id ? 'Update Promotion' : 'Create Promotion'}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>{id ? 'Update Promotion' : 'Create Promotion'}</h4>
                </div>
            </div>

            <Row>
                <CreatePromotion handleCreateCatalog={handleCreateCatalog} />
            </Row>
        </>
    );
};
