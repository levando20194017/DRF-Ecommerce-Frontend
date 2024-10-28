import React, { useState, useEffect } from "react";
import { TableListOrder } from "../../components/order/listOrder/TableListOrder";
import Title from "../../components/order/listOrder/Title";
import OrderSearch from "../../components/order/listOrder/OrderSearch";
import "./style.scss";
import { NUMBER_ITEM_PAGE } from "../../enums";
import { apiGetOrderList } from "../../services/order";
const ListOrder = () => {
  const [listOrder, setListOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchOrder, setSearchOrder] = useState("");

  const handleGetListOrder = async () => {
    const params = {
      PageIndex: searchOrder === "" ? page : 1,
      PageSize: NUMBER_ITEM_PAGE,
      data: {
        transactionNumber: searchOrder,
        fromOrderDate: "",
        toOrderDate: "",
        orderStatus: "",
        locationPickup: "",
      },
    };

    try {
      const response = await apiGetOrderList(params);
      setListOrder(response.data.source);
      setTotalPages(response.data.totalPages);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleGetListOrder();
  }, [page, searchOrder]);

  return (
    <div className="order">
      <Title />
      <OrderSearch search={searchOrder} setSearch={setSearchOrder} />
      <TableListOrder
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        listOrder={listOrder}
      />
    </div>
  );
};
export default ListOrder;
