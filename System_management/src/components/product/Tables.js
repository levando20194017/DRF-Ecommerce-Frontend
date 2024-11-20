import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Image, Table } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../../routes";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiDeleteProduct, apiDetailProduct, apiRestoreProduct } from "../../services/product";
import ImageLink from "../../assets/img/no-image.png";

import { formatTime, toastFailed, toastSuccess } from "../../utils/index";
import { Popconfirm } from "antd";
import { UndoOutlined } from '@ant-design/icons';

export const ProductTable = ({
  pageIndex,
  pageSize,
  listData,
  handleGetListProducts
}) => {
  const history = useHistory();

  const handleDeleteItem = async (id) => {
    try {
      const response = await apiDeleteProduct(id);
      if (response.status === 200) {
        toastSuccess(response.message)
        handleGetListProducts()
      } else {
        toastFailed(response.message)
      }
    } catch (e) {
      toastFailed("Delete product failed!")
    }
  };

  const handleEdit = async (id) => {
    const response = await apiDetailProduct(id)
    if (response.status === 200) {
      history.push(`/product/update-product/${id}`)
    }
  }


  const handleRestoreItem = async (id) => {
    try {
      const response = await apiRestoreProduct({ id });
      if (response.status === 200) {
        toastSuccess(response?.message);
        handleGetListProducts()
      } else {
        toastFailed(response?.message);
      }
    } catch (e) {
      toastFailed('Delete catalog failed');
    }
  }

  const TableRow = (props) => {
    const {
      id,
      index,
      image,
      price,
      name,
      catalog_name,
      promotion_name,
      product_type,
      created_at,
      delete_at,
    } = props;
    return (
      <tr style={{ opacity: delete_at ? 0.5 : 1, backgroundColor: delete_at ? "#d1d5d8" : "#fff" }}>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {index + (pageIndex - 1) * pageSize + 1}
          </Card.Link>
        </td>
        <td width={80}>
          {image ? (
            <Image
              src={`${process.env.REACT_APP_IMAGE_URL}${image}`}
              className="product-thumbnail me-2"
            />
          ) : (
            <Image src={`${ImageLink}`} className="product-thumbnail me-2" />
          )}
        </td>
        <td>{name ? name : "--"}</td>
        <td><div className="text-danger">{price}</div></td>
        <td>{catalog_name}</td>
        <td>{promotion_name ? promotion_name : "---"}</td>
        <td>{product_type}</td>
        <td>{formatTime(created_at)}</td>
        <td>{delete_at ? formatTime(delete_at) : "---"}</td>
        <td>
          {delete_at ?
            <div className="text-center">
              <Popconfirm
                title="Are you sure you want to restore this item?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleRestoreItem(id)}
                className="cursor-pointer text-center"
              >
                <UndoOutlined style={{ color: "green", opacity: 1, fontSize: "25px" }} className="cursor-pointer" />
              </Popconfirm>
            </div>
            :
            <div className="d-flex gap-3">
              <Link to={Routes.NullLink.path} className="text-primary fw-bold">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="me-2 fs-5"
                  onClick={() => handleEdit(id)}
                />
              </Link>
              <Popconfirm
                title="Are you sure delete this Item?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleDeleteItem(id)}
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="me-2 fs-5 text-danger cursor-pointer"
                />
              </Popconfirm>
            </div>}
        </td>
      </tr>
    );
  };

  return (
    <>
      <ToastContainer />
      <Card border="light" className="shadow-sm mb-4">
        <Card.Body className="">
          <Table
            responsive
            className="table-centered table-nowrap rounded mb-0"
          >
            <thead className="thead-light">
              <tr>
                <th className="border-0">#</th>
                <th className="border-0">IMAGE</th>
                <th className="border-0">NAME</th>
                <th className="border-0">PRICE</th>
                <th className="border-0">CATALOG</th>
                <th className="border-0">PROMOTION</th>
                <th className="border-0">PRODUCT TYPE</th>
                <th className="border-0">DATE CREATED</th>
                <th className="border-0">DATE DELETED</th>
                <th className="border-0">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {listData
                ? listData.map((product, index) => (
                  <TableRow
                    index={index}
                    key={`page-traffic-${product.id}`}
                    {...product}
                  />
                ))
                : ""}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
