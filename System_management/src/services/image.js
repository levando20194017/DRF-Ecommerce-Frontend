import axios from "../api/axiosClient";

const apiUploadImage = function (formData) {
  return axios.post("/api/admin/upload-image/", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const apiGetListGallery = function (formData) {
  return axios.post("/api/product/admin/upload-gallery/", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};


export { apiUploadImage, apiGetListGallery };
