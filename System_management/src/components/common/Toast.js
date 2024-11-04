import React from "react";
import { toast } from "react-toastify";

export const ToastFailed = (title) => {
  setTimeout(() => {
    toast.error(<span onClick={() => toast.dismiss()}>{title}</span>, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }, 0);
};
export const ToastSuccess = (title) => {
  setTimeout(() => {
    toast.success(<span onClick={() => toast.dismiss()}>{title}</span>, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }, 0);
};
export const ToastWarning = (title) => {
  setTimeout(() => {
    toast.warning(<span onClick={() => toast.dismiss()}>{title}</span>, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }, 0);
};
