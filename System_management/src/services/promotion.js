import axios from "../api/axiosClient";

const apiGetListPromotions = function ({ pageIndex, pageSize, promotionName }) {
  return axios.get(
    `/api/promotion/admin/search-promotions/?page_index=${pageIndex}&page_size=${pageSize}&name=${promotionName}`
  );
};
const apiCreatePromotion = function (data) {
  return axios.post("/api/promotion/admin/create-new-promotion/", data);
};
const apiEditPromotion = function (data) {
  return axios.put("/api/promotion/admin/edit-promotion/", data);
};
const apiRestorePromotion = function (data) {
  return axios.put("/api/promotion/admin/restore-promotion/", data);
};
const apiDeletePromotion = function (id) {
  return axios.delete(`/api/promotion/admin/delete-promotion/?id=${id}`);
};
const apiDetailPromotion = function (id) {
  return axios.get(`/api/promotion/admin/get-detail-promotion/?id=${id}`);
};

export { apiGetListPromotions, apiCreatePromotion, apiEditPromotion, apiRestorePromotion, apiDeletePromotion, apiDetailPromotion };
