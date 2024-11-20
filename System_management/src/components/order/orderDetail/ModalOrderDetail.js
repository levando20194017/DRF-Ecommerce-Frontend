import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { apiOrderDetail } from "../../../services/order";
import { formatFullTime, formatTime } from "../../../utils";
import { Badge } from "@themesberg/react-bootstrap";
import generatePDF from "react-to-pdf";

export default function ModalOrderDetail(props) {
  const { isOpenModal, orderDetail, setIsOpenModal } = props;
  const [listProducts, setListProducts] = useState([]);

  const options = {
    filename: `invoice${orderDetail.id}.pdf`,
    page: {
      margin: 20,
    },
  };
  const getTargetElement = () => document.getElementById("export-invoice");
  const downloadPdf = () => generatePDF(getTargetElement, options);

  const statusBtn = (orderStatus) => {
    if (orderStatus === "Pending") {
      return (
        <Badge
          bg="warning"
          className="ms-2 d-flex justify-content-center align-items-center mb-2"
          style={{ height: "33px" }}
        >
          {orderStatus}
        </Badge>
      );
    } else if (orderStatus === "Draft") {
      return (
        <Badge bg="primary" className="me-1">
          {orderStatus}
        </Badge>
      );
    } else {
      <Badge bg="info" className="me-1">
        {orderStatus}
      </Badge>;
    }
  };


  const handleCancel = () => {
    setIsOpenModal(false);
  };
  return (
    <Modal
      isOpen={isOpenModal}
      className={"modal-user-container"}
      size="xl"
      centered
    >
      <ModalHeader>
        <h4>INVOICE</h4>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-12 invoice px-5">
            <div id="export-invoice">
              <div className="invoice_content">
                <div className="invoice_content_header">
                  <h1>INVOICE #{orderDetail?.id}</h1>{" "}
                  {statusBtn(orderDetail.orderStatus)}
                </div>
                <div className="invoice_content_info mt-5">
                  <div className="col-7">
                    <h5 className="fw-bolder">CLIENT INFORMATION</h5>
                    <div style={{ color: "#222222" }}>
                      <div>Name: {orderDetail.guest_last_name + " " + orderDetail.guest_first_name}</div>
                      {orderDetail.guest_email && (
                        <div>Email: {orderDetail.guest_email}</div>
                      )}
                      {orderDetail.guest_address &&
                        <div>Address: {orderDetail.guest_address}</div>
                      }
                    </div>
                  </div>
                  <div className="justify-content-between d-flex col-5 me-6">
                    <div>
                      <div>
                        <span className="fw-bolder">INVOICE ID:</span>{" "}
                        {orderDetail?.id}
                      </div>
                      <div style={{ color: "#222222" }}>
                        <div>
                          <span>Order Date:</span>{" "}
                          {formatFullTime(orderDetail?.order_date)}
                        </div>
                        {orderDetail.details?.length > 0 &&
                          <div>
                            <span>Location Pickup:</span>{" "}
                            {orderDetail.details[0].location_pickup}
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="fw-bolder">CONTACT INFORMATION</h5>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Receipient name</th>
                        <th scope="col">Phone number</th>
                        <th scope="col">Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {orderDetail.recipient_name ? orderDetail.recipient_name : "--"}
                        </td>
                        <td>
                          {orderDetail.recipient_phone ? orderDetail.recipient_phone : "--"}
                        </td>
                        <td>
                          {orderDetail.shipping_address ? orderDetail.shipping_address : "--"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-5">
                  <h5 className="fw-bolder">PRODUCTS INFORMATION</h5>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">IMAGE</th>
                        <th scope="col">NAME</th>
                        <th scope="col">COLOR</th>
                        <th scope="col">RATE</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">QTY</th>
                        <th scope="col">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetail.details?.length > 0 &&
                        orderDetail.details.map((product) => {
                          return (
                            <tr>
                              <td><img src={`${process.env.REACT_APP_IMAGE_URL + product.product_image}`} width={80} height={80} style={{ borderRadius: "4px" }} /></td>
                              <td>{product.product_name}</td>
                              <td>{product.product_color}</td>
                              <td>{product.promotion_rate ? `${product.promotion_rate}%` : "---"}</td>
                              <td>{product.unit_price}</td>
                              <td>{product.quantity}</td>
                              <td>{product.promotion_rate ? Math.round(product.quantity * product.unit_price * product.promotion_rate / 100) : product.quantity * product.unit_price}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-end  mt-5">
                  <div className="col-6">
                    <table class="table">
                      <tbody>
                        <tr>
                          <td className="text-right px-5">
                            <strong className="fw-bolder">SHIPPING COST</strong>
                          </td>
                          <td className="text-left">
                            <span className="text-danger">{orderDetail?.shipping_cost}</span><span className="fw-bold ms-2">VND</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-right px-5">
                            <strong className="fw-bolder">GST AMOUNT </strong>
                          </td>
                          <td className="text-left">
                            <span className="text-danger">{orderDetail?.gst_amount}</span><span className="fw-bold ms-2">VND</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-right px-5">
                            <strong className="fw-bolder">TOTAL</strong>
                          </td>
                          <td className="text-left">
                            <span className="text-danger">{orderDetail?.total_cost}</span><span className="fw-bold ms-2">VND</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn-cancel" onClick={handleCancel}>
          Close
        </button>
        <button className="btn-export" onClick={downloadPdf}>
          Export
        </button>
      </ModalFooter>
    </Modal>
  );
}
