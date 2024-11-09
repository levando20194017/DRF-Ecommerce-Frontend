import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Card, Badge, Table } from "@themesberg/react-bootstrap";
import ModalOrderDetail from "../orderDetail/ModalOrderDetail";
import { v4 as uuidv4 } from "uuid";
import { formatTime } from "../../../utils";
export const TableListOrder = ({ pageIndex, pageSize, listData }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const showModal = (id) => {
    setIsOpenModal(true);
    setOrderId(id);
  };
  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
    setOrderId(null);
  };

  const TableRow = (props) => {
    const {
      id,
      index,
      transactionNumber,
      totalCost,
      orderStatus,
      gstAmount,
      shippingCost,
      locationPickup,
      customerName,
      email,
      createdAt,
    } = props;

    const statusBtn = (orderStatus) => {
      if (orderStatus === "Pending") {
        return (
          <Badge bg="warning" className="me-1">
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

    return (
      <tr>
        <td style={{ width: "2%" }}>
          <Card.Link href="#" className="text-primary fw-bold">
            {index + (pageIndex - 1) * pageSize + 1}
          </Card.Link>
        </td>
        <td>{transactionNumber ? transactionNumber : "--"}</td>
        <td>{customerName ? customerName : "--"}</td>
        <td>{locationPickup ? locationPickup : "--"}</td>
        <td>{email ? email : "--"}</td>
        <td>{statusBtn(orderStatus)}</td>
        <td>{formatTime(createdAt)}</td>
        <td className="text-center">
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon={faEye}
            className="me-2 fs-5"
            onClick={() => showModal(id)}
          />
        </td>
      </tr>
    );
  };

  return (
    <>
      <Card border="light" className="shadow-sm mb-4">
        <Card.Body className="">
          <Table
            responsive
            className="table-centered table-nowrap rounded mb-0"
          >
            <thead className="thead-light">
              <tr>
                <th className="border-0">#</th>
                <th className="border-0">GUEST</th>
                <th className="border-0">TOTAL COST</th>
                <th className="border-0">ORDER STATUS</th>
                <th className="border-0">PAYMENT METHOD</th>
                <th className="border-0">PAYMENT STATUS</th>
                <th className="border-0">PHONE</th>
                <th className="border-0">RECEIPIENT NAME</th>
                <th className="border-0">ORDER DATE</th>
                <th className="border-0">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((order, index) => {
                const id = uuidv4();
                return <TableRow key={id} {...order} index={index} />;
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <ModalOrderDetail
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        toggleFromParent={toggleModal}
        setOrderId={setOrderId}
        orderId={orderId}
      />
    </>
  );
};
