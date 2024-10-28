import axios from "../api/axios";

const apiUploadImage = function (params) {
  return axios.post("/Uploads/upload-images", params);
};

export { apiUploadImage };
