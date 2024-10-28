import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {Breadcrumb} from "@themesberg/react-bootstrap";
import {Row} from "@themesberg/react-bootstrap";
import {CreateCatalog} from "../../../components/product/catalog/CreateCatalog";
import {UpdateCatalog} from "../../../components/product/catalog/UpdateCatalog";
import {apiCreateCatalog, apiUpdateCatalog} from "../../../services/catalog";
import {status} from "../../../enums";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {toastSuccess, toastFailed} from "../../../utils";
import {useHistory, useParams} from "react-router-dom";
import {apiDetailCatalog} from "../../../services/catalog";
import { useMsal} from '@azure/msal-react';

import './style.scss'

export default () => {

    const {id} = useParams();
    const [catalog, setCatalog] = useState({})
    const [statusCode, setStatusCode] = useState('')
    const history = useHistory()
    const { instance,  accounts} = useMsal();

    useEffect(() => {
        if (id) getDetailCatalog(id, accounts[0].idToken)

    }, [id]);
    const handleCreateCatalog = async (params) => {
        if (params.name !== '') {
            try {
                const response = await apiCreateCatalog({params}, accounts[0].idToken)
                if (response?.data.statusCode === status.SUCCESS) {
                    setTimeout(() => {
                        toast.success(<span onClick={() => toast.dismiss()}>Create Catalog successfully</span>, {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }, 0);
                    history.push('/product/catalog')
                }
                if (response?.data.statusCode === status.ERROR) {
                    toastFailed(response?.data.message)
                }
                if (response?.data.statusCode === status.ERROR_SUB) {
                    toastFailed(response?.data.message)
                }
            } catch (e) {
                toastFailed('Create Catalog Failed')
            }
        }
    }

    const handleUpdateCatalog = async (params, id) => {
        if (params.name !== '') {
            try {
                const response = await apiUpdateCatalog({params, id}, accounts[0].idToken)
                if (response?.data.statusCode === status.SUCCESS) {
                    setTimeout(() => {
                        toast.success(<span onClick={() => toast.dismiss()}>Update Catalog successfully</span>, {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }, 0);
                    history.push('/product/catalog')
                }
                if (response?.data.statusCode === status.ERROR) {
                    toastFailed('This Catalog is not found')
                }
                if (response?.data.statusCode === status.ERROR_SUB) {
                    toastFailed(response?.data.message)
                }
                if (response?.data.statusCode === 404) {
                    toastFailed('This Catalog is not found')
                }
                if (response?.statusCode === 400) {
                    toastFailed('This Catalog is not found')
                }
            } catch (e) {
                toastFailed('This Catalog is not found')
            }
        }
    }

    const getDetailCatalog = async (id) => {
        try {
            const response = await apiDetailCatalog(id, accounts[0].idToken)
            if (response?.data.statusCode === status.SUCCESS) {
                setCatalog(response?.data?.data)
            }
            if (response?.data.statusCode === 404) {
                toastFailed('This Catalog is not found')
            }
        } catch (e) {

        }
    }

    return (
        <>
            <ToastContainer/>
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-xl-0">
                    <Breadcrumb
                        className="d-none d-md-inline-block"
                        listProps={{
                            className: "breadcrumb-dark breadcrumb-transparent",
                        }}
                    >
                        <Breadcrumb.Item>
                            <FontAwesomeIcon icon={faHome}/>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => history.push('/product/catalog')}>Catalog</Breadcrumb.Item>
                        <Breadcrumb.Item active>{id ? 'Update Catalog' : 'Create Catalog'}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>{id ? 'Update Catalog' : 'Create Catalog'}</h4>
                </div>
            </div>

            <Row>
                {id ? <UpdateCatalog handleUpdateCatalog={handleUpdateCatalog} catalog={catalog}/> :
                    <CreateCatalog handleCreateCatalog={handleCreateCatalog}/>}
            </Row>
        </>
    );
};
