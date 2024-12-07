
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from '@themesberg/react-bootstrap';

import { ContactTable } from "../../components/contact/Tables";
import SearchInput from "../../components/common/SearchInput";
import PaginationCommon from "../../components/common/PaginationCommon";
import { apiGetlistContacts } from "../../services/contact";

export default () => {
    const [listData, setListData] = useState([])
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setToalRecords] = useState();
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    const getListData = async () => {
        try {
            const params = {
                pageIndex: pageIndex,
                pageSize: pageSize,
                searchName: search
            }
            const response = await apiGetlistContacts(params)
            if (response.status === 200) {
                setListData(response.data.contacts)
                setToalRecords(response.data.total_items)
                setTotalPages(response.data.total_pages)
            }
        } catch (e) {
        }
    }

    useEffect(() => {
        getListData()
    }, [pageIndex, pageSize, search])

    return (
        <div className="page-content">
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
                <div className="d-block mb-4 mb-xl-0">
                    <Breadcrumb listProps={{ className: "breadcrumb-primary    breadcrumb-text-light text-white" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Contact</Breadcrumb.Item>
                        <Breadcrumb.Item active>Contact list</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Contact list</h4>
                </div>
            </div>
            <SearchInput search={search} setSearch={setSearch} />
            <div className="table-content">
                <ContactTable
                    listData={listData}
                    getListData={getListData}
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
