import axios from "../api/axiosClient";

const apiUploadImage = function (formData) {
  return axios.post("/api/admin/upload-image/", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export { apiUploadImage };
