import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { Col, Row } from "@themesberg/react-bootstrap";
import { CreateCategory } from "../../../components/blog/category/CreateCategory";
import {
    apiCreateCategory,
    apiDetailCategory,
    apiUpdateCategory
} from "../../../services/category";
import { status } from "../../../enums";
import { toast, ToastContainer } from "react-toastify";
import { toastFailed, toastSuccess } from "../../../utils";
import { useHistory, useParams } from "react-router-dom";
import { UpdateCategory } from "../../../components/blog/category/UpdateCategory";

export default () => {
    const { id } = useParams();
    const [category, setCategory] = useState()
    const history = useHistory()

    useEffect(() => {
        if (id) getCatagory(id)
    }, [id]);

    const getCatagory = async () => {
        try {
            const response = await apiDetailCategory(id)
            if (response?.data.statusCode === status.SUCCESS) {
                setCategory(response?.data?.data)
            }
        } catch (e) {

        }
    }

    const handleCreateCategory = async (params) => {
        if (params.name !== '') {
            try {
                const response = await apiCreateCategory({ params })
                if (response?.data.statusCode === status.SUCCESS) {
                    setTimeout(() => {
                        toast.success(<span onClick={() => toast.dismiss()}>Create Category successfully</span>, {
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
                    history.push('/blogs/categories')
                }
                if (response?.data.statusCode === status.ERROR) {
                    toastFailed('Category is duplicated')
                }
            } catch (e) {
                toastFailed('Create Category Failed')
            }
        }
    }

    const handleUpdateCategory = async (params, id) => {
        if (params.name !== '') {
            try {
                const response = await apiUpdateCategory({ params, id })
                if (response?.data.statusCode === status.SUCCESS) {
                    setTimeout(() => {
                        toast.success(<span onClick={() => toast.dismiss()}>Edit Category successfully</span>, {
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
                    history.push('/blogs/categories')
                }
                if (response?.data.statusCode === status.ERROR) {
                    toastFailed('Category is duplicated')
                }
                if (response?.data.statusCode === 404) {
                    toastFailed('This category is not found')
                }
            } catch (e) {
                toastFailed('Edit Category Failed')
            }
        }
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
                        <Breadcrumb.Item onClick={() => history.push("/blogs/categories")}>Category</Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            {id ? 'Edit Category' : 'Create Category'}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <h4> {id ? 'Edit Category' : 'Create Category'}</h4>
                </div>
            </div>
            <Row>
                <Col xs={12} xl={9}>
                    {id ? <UpdateCategory handleUpdateCategory={handleUpdateCategory}
                        category={category} /> :
                        <CreateCategory handleCreateCategory={handleCreateCategory} />}

                </Col>
            </Row>
        </>
    );
};
