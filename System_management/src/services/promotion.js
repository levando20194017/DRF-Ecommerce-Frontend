import axios from "../api/axios";

const apiGetListPromotions = function ({ PageIndex, PageSize }) {
  return axios.get(
    `/Promotion/get-all?PageIndex=${PageIndex}&PageSize=${PageSize}`
  );
};
const apiCreatePromotion = function ({ params }) {
  return axios.post("/Promotion/add", params);
};

export { apiGetListPromotions, apiCreatePromotion };
