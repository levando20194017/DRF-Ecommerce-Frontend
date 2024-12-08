import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Card, Badge, Table } from "@themesberg/react-bootstrap";
import ModalOrderDetail from "../orderDetail/ModalOrderDetail";
import { v4 as uuidv4 } from "uuid";
import { formatPrice, formatTime } from "../../../utils";
import { apiOrderDetail } from "../../../services/order";
export const TableListOrder = ({ pageIndex, pageSize, listData }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);

  const showModal = async (id) => {
    const response = await handleGetOrderDetail(id)
    if (response.status === 200) {
      setIsOpenModal(true);
      setOrderDetail(response.data)
    }
  };
  const handleGetOrderDetail = async (id) => {
    try {
      const response = await apiOrderDetail(id);
      return response
    } catch (e) {
      console.log();
    }
  };


  const TableRow = (props) => {
    const {
      id,
      index,
      guest,
      total_cost,
      order_status,
      payment_method,
      payment_status,
      recipient_phone,
      recipient_name,
      order_date,
    } = props;

    const statusBtn = (orderStatus) => {
      if (orderStatus === "pending") {
        return (
          <Badge className="me-1 badge-pending">
            Pending
          </Badge>
        );
      } else if (orderStatus === "confirmed") {
        return (
          <Badge className="me-1 badge-confirmed">
            Confirmed
          </Badge>
        );
      } else if (orderStatus === "shipped") {
        return (
          <Badge className="me-1 badge-shipped">
            Shipped
          </Badge>
        );
      } else if (orderStatus === "delivered") {
        return (
          <Badge className="me-1 badge-delivered">
            Delivered
          </Badge>
        );
      } else if (orderStatus === "cancelled") {
        return (
          <Badge className="me-1 badge-cancelled">
            Cancelled
          </Badge>
        );
      } else if (orderStatus === "returned") {
        return (
          <Badge className="me-1 badge-returned">
            Returned
          </Badge>
        );
      } else {
        return (
          <Badge bg="info" className="me-1">
            {orderStatus}
          </Badge>
        );
      }
    };

    const statusPayment = (status) => {
      if (status === "paid") {
        return (
          <Badge bg="success" className="me-1">
            Paid
          </Badge>
        );
      } else if (status === "unpaid") {
        return (
          <Badge bg="primary" className="me-1">
            Unpaid
          </Badge>
        );
      } else if (status === "failed") {
        return (
          <Badge bg="error" className="me-1">
            {status}
          </Badge>
        );
      }
    };

    return (
      <tr>
        <td style={{ width: "2%" }}>
          <Card.Link href="#" className="text-primary fw-bold">
            {index + (pageIndex - 1) * pageSize + 1}
          </Card.Link>
        </td>
        <td>{guest.last_name + " " + guest.first_name}</td>
        <td className="text-danger">{formatPrice(total_cost)}</td>
        <td>{statusBtn(order_status)}</td>
        <td>{payment_method}</td>
        <td>{statusPayment(payment_status)}</td>
        <td>{recipient_name}</td>
        <td>{recipient_phone}</td>
        <td>{formatTime(order_date)}</td>
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
                <th className="border-0">RECEIPIENT NAME</th>
                <th className="border-0">PHONE</th>
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
        orderDetail={orderDetail}
      />
    </>
  );
};
