import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";

import { CatalogTable } from "../../../components/product/catalog/Tables";
import Button from "../../../components/common/Button";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { useHistory } from "react-router-dom";
import { apiGetListCatalogs } from "../../../services/catalog";
import PaginationCommon from "../../../components/common/PaginationCommon";
import SearchInput from "../../../components/common/SearchInput";

export default () => {
    const history = useHistory();
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setToalRecords] = useState();
    const [search, setSearch] = useState("");
    const [listData, setListData] = useState([])

    const getListCatalogs = async () => {
        try {
            const response = await apiGetListCatalogs({ pageIndex, pageSize, textSearch: search })
            if (response.status === 200) {
                setListData(response.data.data)
                setToalRecords(response.data.total_items)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getListCatalogs()
    }, [pageIndex, pageSize, search])
    return (
        <div className="page-content">
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
                <div className="d-block w-100 mb-4 mb-xl-0">
                    <Breadcrumb
                        listProps={{ className: "breadcrumb-primary    breadcrumb-text-light text-white" }}
                        style={{ width: "290px" }}
                    >
                        <Breadcrumb.Item>
                            <FontAwesomeIcon icon={faHome} />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            onClick={() => history.push("/product")}
                        >
                            Product
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Catalog management
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <h4 className="mb-0">Catalog management</h4>
                        <Button
                            icon={faPlus}
                            className="background-primary"
                            variant="secondary"
                            onClick={() =>
                                history.push("/product/create-catalog")
                            }
                        >
                            Create Catalog
                        </Button>
                    </div>
                </div>
            </div>

            <SearchInput search={search} setSearch={setSearch} />
            <div className="table-content">
                <CatalogTable pageIndex={pageIndex} pageSize={pageSize} listData={listData} getListCatalogs={getListCatalogs} />
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
