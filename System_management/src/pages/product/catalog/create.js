import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { Row } from "@themesberg/react-bootstrap";
import { CreateCatalog } from "../../../components/product/catalog/CreateCatalog";
import { UpdateCatalog } from "../../../components/product/catalog/UpdateCatalog";
import { apiCreateCatalog, apiUpdateCatalog } from "../../../services/catalog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastFailed, toastSuccess } from "../../../utils";
import { useHistory, useParams } from "react-router-dom";
import { apiDetailCatalog } from "../../../services/catalog";

import './style.scss'
import { Routes } from "../../../routes";

export default () => {

    const { id } = useParams();
    const history = useHistory()
    const [catalog, setCatalog] = useState({})

    const handleCreateCatalog = async (params) => {
        if (params.name !== '') {
            try {
                const response = await apiCreateCatalog(params)
                if (response.status === 200) {
                    history.push(Routes.Catalog.path)
                    toastSuccess(response.message)
                } else {
                    toastFailed(response.message)
                }

            } catch (e) {
                toastFailed('Create Catalog Failed')
            }
        }
    }

    const handleUpdateCatalog = async (params) => {
        if (params.name !== '') {
            try {
                const response = await apiUpdateCatalog(params)
                if (response.status === 200) {
                    toastSuccess(response.message)
                    history.push(Routes.Catalog.path)
                } else {
                    toastFailed(response.message)
                }
            } catch (e) {
                toastFailed('This Catalog is not found')
            }
        }
    }

    const getDetailCatalog = async (id) => {
        try {
            const response = await apiDetailCatalog(id)
            if (response.status === 200) {
                setCatalog(response.data)
            } else {
                toastFailed(response?.message)
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        if (id) getDetailCatalog(id)
    }, [id]);

    return (
        <>
            <ToastContainer />
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
                <div className="d-block mb-4 mb-xl-0">
                    <Breadcrumb
                        listProps={{ className: "breadcrumb-primary    breadcrumb-text-light text-white" }}
                    >
                        <Breadcrumb.Item>
                            <FontAwesomeIcon icon={faHome} />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => history.push('/product/catalog')}>Catalog</Breadcrumb.Item>
                        <Breadcrumb.Item active>{id ? 'Update Catalog' : 'Create Catalog'}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>{id ? 'Update Catalog' : 'Create Catalog'}</h4>
                </div>
            </div>

            <Row>
                {id ? <UpdateCatalog handleUpdateCatalog={handleUpdateCatalog} catalog={catalog} id={id} /> :
                    <CreateCatalog handleCreateCatalog={handleCreateCatalog} />}
            </Row>
        </>
    );
};
