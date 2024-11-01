import axios from "../api/axios";

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
const apiDeletePromotion = function (data) {
  return axios.put("/api/promotion/admin/delete-promotion/", data);
};

export { apiGetListPromotions, apiCreatePromotion, apiEditPromotion, apiRestorePromotion, apiDeletePromotion };
