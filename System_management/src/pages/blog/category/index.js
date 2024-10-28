import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faPlus} from "@fortawesome/free-solid-svg-icons";
import {CategoryTable} from "../../../components/blog/category/Tables";
import Button from "../../../components/common/Button";
import {Breadcrumb} from "@themesberg/react-bootstrap";
import {useHistory} from "react-router-dom";
import {NUMBER_ITEM_PAGE, status} from "../../../enums";
import {
    apiDeleteCategory,
    apiGetListCategories,
} from "../../../services/category";
import {toast, ToastContainer} from "react-toastify";
import ListPagination from "../../../components/common/ListPagination";
import ModalDeleteItem from "../../../components/common/ModalDelete";
import {toastFailed} from "../../../utils";
import "./style.scss"
export default () => {
    const modalDeleteCategory = useRef(null);
    const [pageIndex, setPageIndex] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [categories, setCategories] = useState({})
    const [deleteId, setDeleteId] = useState('')
    const history = useHistory();

    useEffect(() => {
        getListCategories()
    }, [pageIndex]);

    const getListCategories = async () => {
        try {
            const params = {
                PageIndex: pageIndex,
                PageSize: 20
            }
            const response = await apiGetListCategories(params)
            if (response?.data.statusCode === status.SUCCESS)
                setCategories(response?.data?.data?.source)
            setTotalPages(response?.data?.data?.totalPages)
        } catch (e) {
        }
    }
    const handleClickButtonDelete = (category) => {
        setDeleteId(category?.id)
        modalDeleteCategory.current.open()
    }
    const handlePageChange = (newPage) => {
        if (newPage <= totalPages) {
            setPageIndex(newPage);
        }
    };

    const handleDeleteCategory = async () => {
        try {
            const response = await apiDeleteCategory(deleteId)
            if (response?.data.statusCode === status.SUCCESS) {
                setCategories(categories.filter((item) => item?.id !== deleteId))
                setTimeout(() => {
                    toast.success(<span onClick={() => toast.dismiss()}>Delete Category successfully</span>, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        onClose: () => getListCategories(),
                    });
                }, 0);
                modalDeleteCategory.current.close()
            } else if(response?.data.statusCode === 404) {
                toastFailed('This category is not found')
                modalDeleteCategory.current.close()
            } else {
                toastFailed('This category can not be deleted because of having blogs')
                modalDeleteCategory.current.close()
            }
        }catch (e) {
            toastFailed('Delete Category Failed')
        }
    }

    return (
        <>
            <ToastContainer/>
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block w-100 mb-4 mb-xl-0">
                    <Breadcrumb
                        className="d-none d-md-inline-block"
                        listProps={{
                            className: "breadcrumb-dark breadcrumb-transparent",
                        }}
                    >
                        <Breadcrumb.Item>
                            <FontAwesomeIcon icon={faHome}/>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => history.push("/blogs")}>
                            Blog
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active onClick={() => history.push("/blogs/categories")}>
                            Category management
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <h4 className="mb-0">Category management</h4>
                        <Button
                            icon={faPlus}
                            className="background-primary"
                            variant="secondary"
                            onClick={() => history.push("/blogs/create-category")}
                        >
                            Create Category
                        </Button>
                    </div>
                </div>
            </div>

            <CategoryTable
                page={pageIndex}
                categories={categories}
                handleClickButtonDelete={handleClickButtonDelete}
            />
            {totalPages > 1 && (
                <ListPagination
                    page={pageIndex}
                    pageMax={totalPages}
                    onPageChange={handlePageChange}
                ></ListPagination>
            )}
            <ModalDeleteItem
                ref={modalDeleteCategory}
                title={"Delete Category"}
                item={"category"}
                handleDeleteItem={handleDeleteCategory}
            />
        </>
    );
};
