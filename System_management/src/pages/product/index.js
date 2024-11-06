import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import Button from "../../components/common/Button";
import { useHistory } from "react-router-dom";

import { ProductTable } from "../../components/product/Tables";
import ProductSearch from "../../components/product/ProductSearch";
import { apiGetProductList, apiProductSearch } from "../../services/product";
import { NUMBER_ITEM_PAGE_PRODUCT } from "../../enums";
import SearchInput from "../../components/common/SearchInput";
import PaginationCommon from "../../components/common/PaginationCommon";

export default () => {
  const history = useHistory();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setToalRecords] = useState();
  const [search, setSearch] = useState("");
  const [listData, setListData] = useState([])
  const [totalPages, setTotalPages] = useState(1);

  const handleGetListProducts = async () => {
    try {
      const response = await apiGetProductList({
        pageIndex, pageSize, searchName: search
      })
      if (response.status === 200) {
        setListData(response.data.products)
        setToalRecords(response.data.total_items)
        setTotalPages(response.data.total_pages)
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetListProducts();
  }, [pageIndex, pageSize, search])

  return (
    <div className="page-content">
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
      <SearchInput search={search} setSearch={setSearch} />
      <div className="table-content">
        <ProductTable
          pageIndex={pageIndex}
          pageSize={pageSize}
          listData={listData}
          handleGetListProducts={handleGetListProducts}
        />
      </div>
      {totalPages > 1 &&
        <div className="bottom-pagination">
          <PaginationCommon
            totalRecords={totalRecords}
            pageSize={pageSize}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize} />
        </div>
      }
    </div>
  );
};
