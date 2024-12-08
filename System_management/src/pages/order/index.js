import React, { useState, useEffect } from "react";
import { TableListOrder } from "../../components/order/listOrder/TableListOrder";
import Title from "../../components/order/listOrder/Title";
import SearchInput from "../../components/order/listOrder/SearchInput";
import "./style.scss";
import { apiGetOrderList } from "../../services/order";
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import { useHistory } from "react-router-dom";
import PaginationCommon from "../../components/common/PaginationCommon";

const ListOrder = () => {
  const dateFormat = 'YYYY/MM/DD';
  const history = useHistory();
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setToalRecords] = useState();
  const [search, setSearch] = useState("");
  const [listData, setListData] = useState([])
  const [date, setDate] = useState({
    startDate: "",
    endDate: ""
  })
  const handleGetListOrder = async () => {
    try {
      const response = await apiGetOrderList({
        pageIndex, pageSize, startDate: date.startDate, endDate: date.endDate, orderStatus, paymentStatus
      });
      if (response.status === 200) {
        setListData(response.data.orders)
        setToalRecords(response.data.total_items)
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleGetListOrder();
  }, [pageIndex, pageSize, date])

  const handleOnChange = (value, keyField) => {
    setDate({ ...date, [keyField]: value ? value.format('YYYY-MM-DD') : "" });
  };

  return (
    <div className="order page-content">
      <Title />
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
        <TableListOrder
          pageIndex={pageIndex}
          pageSize={pageSize}
          listData={listData}
          setListData={setListData}
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
};
export default ListOrder;
