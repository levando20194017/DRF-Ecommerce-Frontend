import axios from "../api/axiosClient";

const apiGetOrderList = function ({ pageIndex, pageSize, startDate, endDate, orderStatus, paymentStatus }) {
  return axios.get(
    `/api/order/admin/get-list-orders/?page_index=${pageIndex}&page_size=${pageSize}&start_date=${startDate}&end_date=${endDate}&order_status=${orderStatus}&payment_status=${paymentStatus}`
  );
};
const apiOrderDetail = function (id) {
  return axios.get(`/api/order/admin/get-order-detail/?order_id=${id}`);
};

const apiUpdateOrderStatus = function (data) {
  return axios.put(`/api/order/admin/update-order-status/`, { order_id: data.id, order_status: data.orderStatus });
};

const apiUpdatePaymentStatus = function (data) {
  return axios.put(`/api/order/admin/update-payment-status/`, { order_id: data.id, order_status: data.paymentStatus });
};
export { apiGetOrderList, apiOrderDetail, apiUpdateOrderStatus, apiUpdatePaymentStatus };
