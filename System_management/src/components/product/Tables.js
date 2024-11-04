import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Image, Table } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../../routes";
import ModalDeleteItem from "../../components/common/ModalDelete";
import { useHistory } from "react-router-dom";
import ListPagination from "../../components/common/ListPagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { status } from "../../enums/common";
import { NUMBER_ITEM_PAGE_PRODUCT } from "../../enums/common";
import { apiDeleteProduct } from "../../services/product";
import ImageLink from "../../assets/img/no-image.png";

import { formatTime, toastFailed, toastSuccess } from "../../utils/index";
import { apiGetListCatalogs } from "../../services/catalog";

export const ProductTable = ({
  page,
  setPage,
  listProducts,
  pageMax,
}) => {
  const history = useHistory();
  const [listCatalogs, setListCatalogs] = useState([]);

  const handlePageChange = (newPage) => {
    if (newPage <= pageMax) {
      setPage(newPage);
    }
  };
  const handleDeleteItem = async (id) => {
    try {
      const response = await apiDeleteProduct(id);
      if (response.status === 200) {
        toastSuccess(response.message)
      } else {
        toastFailed(response.message)
      }
    } catch (e) {
      toastFailed("Delete product failed!")
    }
  };

  const TableRow = (props) => {
    const {
      id,
      index,
      sku,
      imageUrl,
      name,
      catalogId,
      createdAt,
    } = props;
    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {index + (page - 1) * NUMBER_ITEM_PAGE_PRODUCT + 1}
          </Card.Link>
        </td>
        <td width={80}>
          {imageUrl ? (
            <Image
              src={`${process.env.REACT_APP_IMAGE_URL}${imageUrl}`}
              className="product-thumbnail me-2"
            />
          ) : (
            <Image src={`${ImageLink}`} className="product-thumbnail me-2" />
          )}
        </td>
        <td>{sku ? sku : "--"}</td>
        <td>{name ? name : "--"}</td>`
        <td>
          {catalogId
            ? listCatalogs.find((catalog) => {
              return catalog.id === catalogId;
            })?.name
            : ""}
        </td>
        <td>{formatTime(createdAt)}</td>
        <td>
          <Link to={Routes.NullLink.path} className="text-primary fw-bold">
            <FontAwesomeIcon
              icon={faEdit}
              className="me-2 fs-5"
              onClick={() => history.push(`/product/${id}`)}
            />
          </Link>
          <Link to={Routes.NullLink.path} className="text-primary fw-bold">
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="me-2 fs-5 text-danger"
            />
          </Link>
        </td>
      </tr>
    );
  };

  const handleGetListCatalogs = async () => {
    try {
      const params = {
        PageIndex: 1,
        PageSize: 1000,
        parentId: "",
      };
      const response = await apiGetListCatalogs(params);
      if (response?.data.statusCode === status.SUCCESS)
        setListCatalogs(response?.data?.data?.source);
      setListCatalogs(flattenArray(response?.data?.data?.source));
    } catch (e) {
      console.log(e);
    }
  };

  const flattenArray = (tree, level = 0) => {
    const flatArray = [];

    for (const item of tree) {
      flatArray.push(item);

      if (item.subCatalogs.length > 0) {
        flatArray.push(...flattenArray(item.subCatalogs));
      }
    }

    return flatArray;
  };

  useEffect(() => {
    handleGetListCatalogs();
  }, []);

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
                <th className="border-0">SKU</th>
                <th className="border-0">NAME</th>
                <th className="border-0">PRICE</th>
                <th className="border-0">MEMBER PRICE</th>
                <th className="border-0">CATALOG</th>
                <th className="border-0">DATE CREATED</th>
                <th className="border-0">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {listProducts
                ? listProducts.map((product, index) => (
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
        <Card.Footer>
          {pageMax > 1 && (
            <ListPagination
              page={page}
              pageMax={pageMax}
              onPageChange={handlePageChange}
            ></ListPagination>
          )}
        </Card.Footer>
      </Card>
    </>
  );
};
