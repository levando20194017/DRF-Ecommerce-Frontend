import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { apiOrderDetail } from "../../../services/order";
import { formatTime } from "../../../utils";
import { Badge } from "@themesberg/react-bootstrap";
import generatePDF from "react-to-pdf";

export default function ModalOrderDetail(props) {
  const { isOpenModal, setIsOpenModal, orderId, setOrderId } = props;
  const [orderDetail, setOrderDetail] = useState([]);
  const [listProducts, setListProducts] = useState([]);

  const options = {
    filename: `invoice${orderId}.pdf`,
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

  const handleGetOrderDetail = async () => {
    try {
      const response = await apiOrderDetail(orderId);
      if (response.data.statusCode === 200) {
        setOrderDetail(response.data.data);
        setListProducts(response.data.data.orderDetails);
      }
    } catch (e) {
      console.log();
    }
  };
  useEffect(() => {
    if (orderId) {
      handleGetOrderDetail();
    }
  }, [orderId]);

  const toggle = () => {
    props.toggleFromParent();
  };

  const handleOk = () => {
    setIsOpenModal(false);
  };
  const handleCancel = () => {
    setIsOpenModal(false);
    setOrderId(null);
  };
  return (
    <Modal
      isOpen={isOpenModal}
      toggle={() => {
        toggle();
      }}
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
                    <div style={{ color: "#4a5073" }}>
                      <div>Name: {orderDetail.customerName}</div>
                      {/* <div>
                        Address: 
                      </div> */}
                      {orderDetail.email && (
                        <div>Email: {orderDetail.email}</div>
                      )}
                      {orderDetail.nric && <div>NRIC: {orderDetail.nric}</div>}

                      {orderDetail.paymentMode && (
                        <div>Payment Mode: {orderDetail.paymentMode}</div>
                      )}
                      {orderDetail.contactPerson && (
                        <div>Contact Person: {orderDetail.contactPerson}</div>
                      )}
                    </div>
                  </div>
                  <div className="justify-content-between d-flex col-5 me-6">
                    <div>
                      <div>
                        <span className="fw-bolder">INVOICE ID:</span>{" "}
                        {orderDetail?.id}
                      </div>
                      <div style={{ color: "#4a5073" }}>
                        <div>
                          <span>Order Date:</span>{" "}
                          {formatTime(orderDetail?.orderDate)}
                        </div>
                        <div>
                          <span>Location Pickup:</span>{" "}
                          {orderDetail?.locationPickup
                            ? orderDetail.locationPickup
                            : "--"}
                        </div>
                        {orderDetail.transactionType && (
                          <div>
                            <span>Transaction Type:</span>{" "}
                            {orderDetail.transactionType}
                          </div>
                        )}
                        {orderDetail.collectionMode && (
                          <div>
                            <span>Collection Mode:</span>{" "}
                            {orderDetail.collectionMode}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="fw-bolder">CONTACT INFORMATION</h5>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Phone 0</th>
                        <th scope="col">Phone H</th>
                        <th scope="col">Hand Phone</th>
                        <th scope="col">Pager</th>
                        <th scope="col">Fax</th>
                        <th scope="col">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {orderDetail.phone0 ? orderDetail.phone0 : "--"}
                        </td>
                        <td>
                          {orderDetail.phoneH ? orderDetail.phoneH : "--"}
                        </td>
                        <td>
                          {orderDetail.handphone ? orderDetail.handphone : "--"}
                        </td>
                        <td>{orderDetail.pager ? orderDetail.pager : "--"}</td>
                        <td>{orderDetail.fax ? orderDetail.fax : "--"}</td>
                        <td>{orderDetail.email ? orderDetail.email : "--"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <h5 className="fw-bolder">SHIPPING ADDRESS</h5>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Shipping Address Line 1</th>
                        <th scope="col">Shipping Address Line 2</th>
                        <th scope="col">Shipping Address Line 3</th>
                        <th scope="col">Shipping Country</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {orderDetail.shippingAddressLine1
                            ? orderDetail.shippingAddressLine1
                            : "--"}
                        </td>
                        <td>
                          {orderDetail.shippingAddressLine2
                            ? orderDetail.shippingAddressLine2
                            : "--"}
                        </td>
                        <td>
                          {orderDetail.shippingAddressLine3
                            ? orderDetail.shippingAddressLine3
                            : "--"}
                        </td>
                        <td>
                          {orderDetail.shippingCountry
                            ? orderDetail.shippingCountry
                            : "--"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <h5 className="fw-bolder">USER ADDRESS</h5>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">User Address Line 1</th>
                        <th scope="col">User Address Line 2</th>
                        <th scope="col">User Address Line 3</th>
                        <th scope="col">User Country Code</th>
                        <th scope="col">User Postal Code</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {orderDetail.userAddressLine1
                            ? orderDetail.userAddressLine1
                            : "--"}
                        </td>
                        <td>
                          {orderDetail.userAddressLine2
                            ? orderDetail.userAddressLine2
                            : "--"}
                        </td>
                        <td>
                          {orderDetail.userAddressLine3
                            ? orderDetail.userAddressLine3
                            : "--"}
                        </td>
                        <td>
                          {orderDetail.userCountryCode
                            ? orderDetail.userCountryCode
                            : "--"}
                        </td>
                        <td>
                          {orderDetail.userPostalCode
                            ? orderDetail.userPostalCode
                            : "--"}
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
                        <th scope="col">NAME</th>
                        <th scope="col">CODE</th>
                        <th scope="col">PART NUMBER</th>
                        <th scope="col">SKU</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">QTY</th>
                        <th scope="col">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listProducts &&
                        listProducts.map((product) => {
                          return (
                            <tr>
                              <td>{product.productName}</td>
                              <td>{product.productCode}</td>
                              <td>{product.productPartNumber}</td>
                              <td>{product.sku ? product.sku : "---"}</td>
                              <td>{product.unitPrice} SGD</td>
                              <td>{product.quantity}</td>
                              <td>
                                {product.quantity * product.unitPrice} SGD
                              </td>
                            </tr>
                          );
                        })}
                      {/* <tr>
                              <td>{product.product.name}</td>
                              <td>{product.product.code}</td>
                              <td>{product.product.partNumber}</td>
                              <td>
                                {product.product.sku
                                  ? product.product.sku
                                  : "---"}
                              </td>
                              <td>{product.product.price} SGD</td>
                              <td>{product.product.memberPrice} SGD</td>
                              <td>{product.product.quantity}</td>
                              <td>
                                {product.product.quantity *
                                  product.product.price}{" "}
                                SGD
                              </td>
                            </tr> */}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-end  mt-5">
                  <div className="col-4">
                    <table class="table-clear table">
                      <tbody>
                        <tr>
                          <td className="text-right px-5">
                            <strong className="fw-bolder">SUBTOTAL</strong>
                          </td>
                          <td className="text-left">
                            {listProducts.reduce((total, product) => {
                              return (
                                total + product.quantity * product.unitPrice
                              );
                            }, 0)}{" "}
                            SGD
                          </td>
                        </tr>
                        <tr>
                          <td className="text-right px-5">
                            <strong className="fw-bolder">SHIPPING COST</strong>
                          </td>
                          <td className="text-left">
                            {orderDetail?.shippingCost} SGD
                          </td>
                        </tr>
                        <tr>
                          <td className="text-right px-5">
                            <strong className="fw-bolder">GST AMOUNT </strong>
                          </td>
                          <td className="text-left">
                            {orderDetail?.gstAmount} SGD
                          </td>
                        </tr>
                        <tr>
                          <td className="text-right px-5">
                            <strong className="fw-bolder">TOTAL</strong>
                          </td>
                          <td className="text-left">
                            {orderDetail?.totalCost} SGD
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
