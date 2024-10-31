import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";

import { OrderTable } from "../../../components/product/order/Tables";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { useHistory } from "react-router-dom";

export default () => {
    const history = useHistory();

    const handleCreateOrder = async (params) => {
        // try {
        //     const response = await apiCreateOrder({ params });
        //     if (response.message === status.MESS_CREATE_PROJECT_SUCCESS) {
        //         const newArr = [response.project].concat(listProjects);
        //         setListProjects(newArr);
        //         modalCreateOrder.current.close();
        //         setTimeout(() => {
        //             toast.success(
        //                 <span onClick={() => toast.dismiss()}>
        //                     Create order success!
        //                 </span>,
        //                 {
        //                     position: "top-right",
        //                     autoClose: 5000,
        //                     hideProgressBar: false,
        //                     closeOnClick: true,
        //                     pauseOnHover: true,
        //                     draggable: true,
        //                     progress: undefined,
        //                     theme: "colored",
        //                 }
        //             );
        //         }, 0);
        //     }
        // } catch (e) {
        //     toast.error(
        //         <span onClick={() => toast.dismiss()}>
        //             {" "}
        //             Create project failed!
        //         </span>,
        //         {
        //             position: "top-right",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "colored",
        //         }
        //     );
        // }
    };

    return (
        <>
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
                <div className="d-block w-100 mb-4 mb-xl-0">
                    <Breadcrumb
                        className="d-none d-md-inline-block"
                        listProps={{
                            className: "breadcrumb-dark breadcrumb-transparent",
                        }}
                    >
                        <Breadcrumb.Item>
                            <FontAwesomeIcon icon={faHome} />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            onClick={() => history.push("/product")}
                        >
                            Product
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Order management
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <h4 className="mb-0">Order management</h4>
                    </div>
                </div>
            </div>

            <OrderTable />
        </>
    );
};
