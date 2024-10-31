import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import Button from "../../components/common/Button";
import { useHistory } from "react-router-dom";

import { ProductTable } from "../../components/product/Tables";
import ProductSearch from "../../components/product/ProductSearch";
import { apiProductSearch } from "../../services/product";
import { NUMBER_ITEM_PAGE_PRODUCT } from "../../enums";

export default () => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [listProducts, setListProducts] = useState([]);
  const [pageMax, setPageMax] = useState(1);
  const [searchName, setSearchName] = useState("");

  const getListProducts = async () => {
    const params = {
      PageIndex: page,
      PageSize: NUMBER_ITEM_PAGE_PRODUCT,
      data: {
        catalogId: 0,
        name: searchName,
        label: "",
        productType: "",
      },
    };
    try {
      await apiProductSearch(params).then((response) => {
        if (response.data.data) {
          if (response.data.data.source.length === 0 && page - 1 > 0) {
            setPage(page - 1);
          } else {
            setListProducts(response?.data?.data?.source);
            setPageMax(response?.data.data.totalPages);
          }
        } else {
          setListProducts([]);
          setPageMax(1);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getListProducts();
  }, [page, searchName]);

  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2">
        <div className="w-100 mb-xl-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Product</Breadcrumb.Item>
            <Breadcrumb.Item active>Product management</Breadcrumb.Item>
          </Breadcrumb>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Product management</h4>
            <Button
              icon={faPlus}
              className="background-primary"
              variant="secondary"
              onClick={() => history.push("/product/create")}
            >
              Create Product
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <ProductSearch setSearchName={setSearchName} searchName={searchName} />
      </div>
      <div className="mt-2">
        <ProductTable
          page={page}
          setPage={setPage}
          pageMax={pageMax}
          listProducts={listProducts}
          getListProducts={getListProducts}
        />
      </div>
    </>
  );
};
