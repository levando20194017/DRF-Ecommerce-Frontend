import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/common/Button";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../routes";
import SearchInput from "../../../components/common/SearchInput";
import { apiGetListProductInStore } from "../../../services/product";
import PaginationCommon from "../../../components/common/PaginationCommon";
import TableProductInStore from "../../../components/product/product_in_store/TableProductInStore";

export default () => {
    const history = useHistory();
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setToalRecords] = useState();
    const [search, setSearch] = useState("");
    const [listData, setListData] = useState([])

    const getListProductInStore = async () => {
        try {
            const response = await apiGetListProductInStore({
                pageIndex,
                pageSize,
                searchName: search,
                storeId: 1
            })
            if (response.status === 200) {
                setListData(response.data.products)
                setToalRecords(response.data.total_items)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getListProductInStore()
    }, [pageIndex, pageSize, search])


    return (
        <div className="page-content">
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
                <div className="d-block w-100 mb-4 mb-xl-0">
                    <Breadcrumb
                        listProps={{ className: "breadcrumb-primary    breadcrumb-text-light text-white" }}
                        style={{ width: "260px" }}
                    >
                        <Breadcrumb.Item>
                            <FontAwesomeIcon icon={faHome} />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            onClick={() => history.push(Routes.Product.path)}
                        >
                            Product
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Products In Store
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <h4 className="mb-0">Products in store management</h4>
                        <Button
                            icon={faPlus}
                            className="background-primary"
                            variant="secondary"
                            onClick={() =>
                                history.push(Routes.ProductIncomingAdd.path)
                            }
                        >
                            Add product to Store
                        </Button>
                    </div>
                </div>
            </div>
            <SearchInput search={search} setSearch={setSearch} />
            <div className="table-content">
                <TableProductInStore pageIndex={pageIndex} pageSize={pageSize} listData={listData} />
            </div>
            <div className="bottom-pagination">
                <PaginationCommon
                    totalRecords={totalRecords}
                    pageSize={pageSize}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    setPageSize={setPageSize} />
            </div>
        </div>
    );
};
