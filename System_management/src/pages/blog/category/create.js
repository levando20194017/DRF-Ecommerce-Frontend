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
import { Routes } from "../../../routes";

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
            if (response.status === 200) {
                setCategory(response.data)
            }
        } catch (e) {

        }
    }

    const handleCreateCategory = async (data) => {
        if (data.name !== '') {
            try {
                const response = await apiCreateCategory(data)
                if (response.status === 200) {
                    history.push('/blogs/categories')
                } else {
                    toastFailed(response.message)
                }
            } catch (e) {
                toastFailed('Create Category Failed')
            }
        }
    }

    const handleUpdateCategory = async (data) => {
        if (data.name !== '') {
            const formData = { ...data, category_id: id }
            try {
                const response = await apiUpdateCategory(formData)
                if (response.status === 200) {
                    history.push(Routes.BlogCategory.path)
                } else {
                    toastFailed(response.message)
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
                        listProps={{ className: "breadcrumb-primary    breadcrumb-text-light text-white" }}
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
                    {id ?
                        <UpdateCategory
                            handleUpdateCategory={handleUpdateCategory}
                            category={category} />
                        :
                        <CreateCategory handleCreateCategory={handleCreateCategory} />}

                </Col>
            </Row>
        </>
    );
};
