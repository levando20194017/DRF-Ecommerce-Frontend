import axios from "../api/axios";

const apiGetOrderList = function ({ PageIndex, PageSize, data }) {
  return axios.post(
    `/Orders/search?PageIndex=${PageIndex}&PageSize=${PageSize}`,
    data
  );
};
const apiOrderDetail = function (id) {
  return axios.get(`/Orders/${id}`);
};

export { apiGetOrderList, apiOrderDetail };
