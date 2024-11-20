import axios from "../api/axiosClient";

const apiGetSetting = function ({ PageIndex, PageSize }) {
    return axios.get(
        `/Setting?PageIndex=${PageIndex}&PageSize=${PageSize}`
    );
};

const apiUpdateSetting = function ({ params, id }) {
    return axios.put(`/Setting/${id}`, params);
};


export { apiGetSetting, apiUpdateSetting };
