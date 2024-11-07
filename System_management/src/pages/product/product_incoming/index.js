import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/common/Button";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { useHistory } from "react-router-dom";
import { TablePromotion } from "../../../components/product/promotion/TablePromotion";
import { Routes } from "../../../routes";
import TableProductIncoming from "../../../components/product/product_incoming/TableProductIncoming";
import SearchInput from "../../../components/common/SearchInput";
import { apiGetListProductIncoming } from "../../../services/product";
import PaginationCommon from "../../../components/common/PaginationCommon";

export default () => {
    const history = useHistory();
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setToalRecords] = useState();
    const [search, setSearch] = useState("");
    const [listData, setListData] = useState([])

    const getListProductIncoming = async () => {
        try {
            const response = await apiGetListProductIncoming({ pageIndex, pageSize, searchName: search, startDate: "", endDate: "" })
            if (response.status === 200) {
                setListData(response.data.product_incomings)
                setToalRecords(response.data.total_items)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getListProductIncoming()
    }, [pageIndex, pageSize, search])

    return (
        <div className="page-content">
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
                <div className="d-block w-100 mb-4 mb-xl-0">
                    <Breadcrumb
                        className="d-none d-md-inline-block"
                        listProps={{
                            className: "breadcrumb-dark breadcrumb-transparent",
                        }}
                    >
                        <Breadcrumb.Item>
                            <FontAwesomeIcon icon={faHome} />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            onClick={() => history.push(Routes.ProductIncoming.path)}
                        >
                            Product Incoming
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            List Products Incoming
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <h4 className="mb-0">Product Incoming management</h4>
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
                <TableProductIncoming pageIndex={pageIndex} pageSize={pageSize} listData={listData} getListProductIncoming={getListProductIncoming} />
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
