import React from "react";
import { toast } from "react-toastify";

export const formatTime = (inputTime) => {
    const date = new Date(inputTime);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const toastSuccess = (title) => {
    setTimeout(() => {
        toast.success(<span onClick={() => toast.dismiss()}>{title}</span>, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }, 0);
};

export const toastFailed = (title) => {
    setTimeout(() => {
        toast.error(<span onClick={() => toast.dismiss()}>{title}</span>, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }, 0);
};

export const changeTextToThreeDot = (string, maxLength) => {
    if (string?.length > maxLength) {
        return string.substring(0, maxLength) + '...';
    } else {
        return string
    }
}
