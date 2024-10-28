import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import { Breadcrumb } from "@themesberg/react-bootstrap";
const Title = () => {
  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4">
        <div className="w-100 mb-4 mb-xl-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Order</Breadcrumb.Item>
            <Breadcrumb.Item active>List order</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <h4>Order</h4>
        <div>
          <button className="btn-export">Export</button>
        </div>
      </div>
    </>
  );
};
export default Title;
