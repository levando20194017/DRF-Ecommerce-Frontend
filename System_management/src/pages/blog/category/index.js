import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { CategoryTable } from "../../../components/blog/category/Tables";
import Button from "../../../components/common/Button";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { useHistory } from "react-router-dom";
import {
    apiGetListCategories,
} from "../../../services/category";
import { ToastContainer } from "react-toastify";
import "./style.scss"
import SearchInput from "../../../components/common/SearchInput";
import PaginationCommon from "../../../components/common/PaginationCommon";
export default () => {
    const [categories, setCategories] = useState([])
    const history = useHistory();
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setToalRecords] = useState();
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    const getListCategories = async () => {
        try {
            const params = {
                pageIndex: pageIndex,
                pageSize: pageSize,
                searchName: search
            }
            const response = await apiGetListCategories(params)
            if (response.status === 200) {
                setCategories(response.data.categories)
                setToalRecords(response.data.total_items)
                setTotalPages(response.data.total_pages)
            }
        } catch (e) {
        }
    }

    useEffect(() => {
        getListCategories()
    }, [pageIndex, pageSize, search])

    return (
        <div className="page-content">
            <ToastContainer />
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
                <div className="d-block w-100 mb-4 mb-xl-0">
                    <Breadcrumb
                        listProps={{ className: "breadcrumb-primary    breadcrumb-text-light text-white" }}
                        style={{ width: "270px" }}
                    >
                        <Breadcrumb.Item>
                            <FontAwesomeIcon icon={faHome} />
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
            <SearchInput search={search} setSearch={setSearch} />
            <div className="table-content">
                <CategoryTable
                    categories={categories}
                    getListCategories={getListCategories}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                />
            </div>
            {totalPages > 1 &&
                <div className="bottom-pagination">
                    <PaginationCommon
                        totalRecords={totalRecords}
                        pageSize={pageSize}
                        pageIndex={pageIndex}
                        setPageIndex={setPageIndex}
                        setPageSize={setPageSize} />
                </div>
            }
        </div>
    );
};
