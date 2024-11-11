import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import Button from "../../components/common/Button";
import { useHistory } from "react-router-dom";
import TableBlog from "../../components/blog/TableBlog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchInput from "../../components/common/SearchInput";
import { apiGetListBlogs } from "../../services/blog";
import PaginationCommon from "../../components/common/PaginationCommon";
import { Spinner } from "reactstrap";

export default () => {
  const history = useHistory();

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setToalRecords] = useState();
  const [search, setSearch] = useState("");
  const [listData, setListData] = useState([])
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleGetListBlogs = async () => {
    try {
      setLoading(true);
      const response = await apiGetListBlogs({ pageIndex, pageSize, name: search, tag: "" })
      if (response.status === 200) {
        setListData(response.data.blogs)
        setToalRecords(response.data.total_items)
        setTotalPages(response.data.total_pages)
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetListBlogs()
  }, [pageIndex, pageSize, search])
  return (
    <>
      <ToastContainer />
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
        <div className="w-100 mb-4 mb-xl-0">
          <Breadcrumb
            listProps={{ className: "breadcrumb-primary    breadcrumb-text-light text-white" }}
            style={{ width: "250px" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Blog</Breadcrumb.Item>
            <Breadcrumb.Item active>Blog management</Breadcrumb.Item>
          </Breadcrumb>
          <div className="d-flex w-100 justify-content-between align-items-center">
            <h4 className="mb-0">Blog management</h4>
            <Button
              icon={faPlus}
              className="background-primary"
              variant="secondary"
              onClick={() => history.push("/blogs/create")}
            >
              Create Blog
            </Button>
          </div>

        </div>
      </div>
      <SearchInput search={search} setSearch={setSearch} />
      <div className="table-content">
        {loading ?
          <div className=" d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
          </div>
          :
          <TableBlog
            pageIndex={pageIndex}
            pageSize={pageSize}
            listData={listData}
            handleGetListBlogs={handleGetListBlogs}
          />
        }
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
    </>
  );
};
