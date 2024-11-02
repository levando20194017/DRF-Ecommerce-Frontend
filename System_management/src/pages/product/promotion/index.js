import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/common/Button";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { useHistory } from "react-router-dom";
import { TablePromotion } from "../../../components/product/promotion/TablePromotion";
import { Routes } from "../../../routes";
import { apiGetListPromotions } from "../../../services/promotion";
import SearchInput from "../../../components/common/SearchInput";
import PaginationCommon from "../../../components/common/PaginationCommon";
import { ToastContainer } from "react-toastify";

export default () => {
    const history = useHistory();
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setToalRecords] = useState();
    const [search, setSearch] = useState("");
    const [listData, setListData] = useState([])

    const handleGetListPromotions = async () => {
        try {
            const response = await apiGetListPromotions({ pageIndex, pageSize, promotionName: search })
            if (response.status === 200) {
                setListData(response.data.promotions)
                setToalRecords(response.data.total_items)
            }

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        handleGetListPromotions()
    }, [pageIndex, pageSize, search])

    return (
        <div className="page-content">
            <ToastContainer />
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
                            onClick={() => history.push(Routes.Product.path)}
                        >
                            Product
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Catalog management
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <h4 className="mb-0">Promotion management</h4>
                        <Button
                            icon={faPlus}
                            className="background-primary"
                            variant="secondary"
                            onClick={() =>
                                history.push(Routes.PromotionCreate.path)
                            }
                        >
                            Create Promotion
                        </Button>
                    </div>
                </div>
            </div>
            <SearchInput search={search} setSearch={setSearch} />
            <div className="table-content">
                <TablePromotion listData={listData} handleGetListPromotions={handleGetListPromotions} />
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
