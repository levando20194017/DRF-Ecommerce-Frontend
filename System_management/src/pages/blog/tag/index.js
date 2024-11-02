import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";

import { TagTable } from "../../../components/blog/tag/Tables";
import Button from "../../../components/common/Button";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import ModalCreateTag from "../../../components/blog/tag/ModalCreateTag";
import { useHistory } from "react-router-dom";
import { apiGetListTags } from "../../../services/tag";
import SearchInput from "../../../components/common/SearchInput";
import { toastFailed } from "../../../utils";
import PaginationCommon from "../../../components/common/PaginationCommon";
import { ToastContainer } from "react-toastify";

export default () => {
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setToalRecords] = useState();
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const modalCreateTag = useRef(null);
  const history = useHistory();
  const handleOpenModalCreateTag = () => {
    modalCreateTag.current.open();
  };
  const handleGetAllTags = async () => {
    setLoading(true);
    try {
      const response = await apiGetListTags({ pageIndex, pageSize, searchName: search });
      if (response.status === 200) {
        setAllTags(response.data.tags);
        setToalRecords(response.data.total_items)
        setTotalPages(response.data.total_pages)
      } else {
        toastFailed(response.message)
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(async () => {
    handleGetAllTags();
  }, [pageIndex, pageSize, search]);

  return (
    <div className="page-content">
      <ToastContainer />
      <ModalCreateTag
        ref={modalCreateTag}
        title={"Create Tag"}
        handleGetListTags={handleGetAllTags}
        allTags={allTags}
      />
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
        <div className="d-block w-100 mb-4 mb-xl-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{
              className: "breadcrumb-dark breadcrumb-transparent",
            }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => history.push("/blogs")}>
              Blog
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Tag management</Breadcrumb.Item>
          </Breadcrumb>
          <div className="d-flex w-100 justify-content-between align-items-center">
            <h4 className="mb-0">Tag management</h4>
            <Button
              icon={faPlus}
              className="background-primary"
              variant="secondary"
              onClick={() => handleOpenModalCreateTag()}
            >
              Create Tag
            </Button>
          </div>
        </div>
      </div>
      <SearchInput search={search} setSearch={setSearch} />
      <div className="table-content">
        <TagTable
          loading={loading}
          allTags={allTags}
          handleGetListTags={handleGetAllTags}
          pageIndex={pageIndex}
          pageSize={pageSize}
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
