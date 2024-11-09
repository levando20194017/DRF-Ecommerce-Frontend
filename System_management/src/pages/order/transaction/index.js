import React, { useEffect, useState } from "react";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { TransactionTable } from "../../../components/product/transaction/Tables";
import { apiGetListTransaction } from "../../../services/transaction";
import { Link } from "react-router-dom";
import { DatePicker, Space } from "antd";
import SearchInput from "../../../components/common/SearchInput";
import dayjs from 'dayjs';
import PaginationCommon from "../../../components/common/PaginationCommon";

export default () => {
    const dateFormat = 'YYYY/MM/DD';
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setToalRecords] = useState();
    const [search, setSearch] = useState("");
    const [listData, setListData] = useState([])
    const [date, setDate] = useState({
        startDate: "",
        endDate: ""
    })

    const getListTransaction = async () => {
        try {
            const params = {
                pageIndex,
                pageSize,
                textSearch: search,
                startDate: date.startDate,
                endDate: date.endDate
            }
            const response = await apiGetListTransaction(params)
            if (response.status === 200) {
                setListData(response.data.transactions)
                setToalRecords(response.data.total_items)
            }
        } catch (e) {
        }
    }
    useEffect(() => {
        getListTransaction()
    }, [pageIndex, pageSize, search, date])

    const handleOnChange = (value, keyField) => {
        setDate({ ...date, [keyField]: value ? value.format('YYYY-MM-DD') : "" });
    };

    return (
        <div className="page-content">
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
                <div className="w-100 mb-4 mb-xl-0">
                    <Breadcrumb className="d-none d-md-inline-block"
                        listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={'/order'}>Order</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>Transaction Log</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <h4 className="mb-0">Transaction Log</h4>
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3">
                <SearchInput search={search} setSearch={setSearch} />
                <div>
                    <Space direction="vertical">
                        <DatePicker
                            onChange={(value) => handleOnChange(value, "startDate")}
                            value={date.startDate ? dayjs(date.startDate, dateFormat) : undefined}
                            format={dateFormat}
                            placeholder="Start date"
                            style={{ width: "200px" }}
                        />
                    </Space>
                </div>
                <div>
                    <Space direction="vertical">
                        <DatePicker
                            onChange={(value) => handleOnChange(value, "endDate")}
                            value={date.endDate ? dayjs(date.endDate, dateFormat) : undefined}
                            format={dateFormat}
                            placeholder="End date"
                            style={{ width: "200px" }}
                        />
                    </Space>
                </div>
            </div>
            <div className="table-content">
                <TransactionTable
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    listData={listData}
                />
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
}