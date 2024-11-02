import axios from "../api/axiosClient";

const apiUploadImage = function (params) {
  return axios.post("/Uploads/upload-images", params);
};

export { apiUploadImage };
