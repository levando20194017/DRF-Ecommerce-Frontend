import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import { Breadcrumb } from "@themesberg/react-bootstrap";
const TitleInvoice = () => {
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
            <Breadcrumb.Item active>Invoice</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    </>
  );
};
export default TitleInvoice;
