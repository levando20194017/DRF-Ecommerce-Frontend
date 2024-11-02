import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useApi = (initialUrl = '', initialMethod = 'GET', initialParams = {}, initialData = {}, options = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState(initialUrl);
    const [method, setMethod] = useState(initialMethod);
    const [params, setParams] = useState(initialParams);
    const [requestData, setRequestData] = useState(initialData);

    // Hàm để gọi API
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let response;
            if (method.toUpperCase() === 'GET') {
                response = await axios.get(url, { params, ...options });
            } else if (method.toUpperCase() === 'POST') {
                response = await axios.post(url, requestData, { ...options });
            } else if (method.toUpperCase() === 'PUT') {
                response = await axios.put(url, requestData, { ...options });
            } else if (method.toUpperCase() === 'DELETE') {
                response = await axios.delete(url, { data: requestData, ...options });
            }
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url, method, params, requestData, options]);

    // Gọi API khi URL, phương thức, params hoặc requestData thay đổi
    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [url, method, params, requestData, fetchData]);

    // Cập nhật URL, phương thức, Params, và dữ liệu yêu cầu để gọi lại API
    const updateUrl = (newUrl) => setUrl(newUrl);
    const updateMethod = (newMethod) => setMethod(newMethod);
    const updateParams = (newParams) => setParams(newParams);
    const updateRequestData = (newData) => setRequestData(newData);

    return { data, error, loading, updateUrl, updateMethod, updateParams, updateRequestData, refetch: fetchData };
};

export default useApi;
