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

export default () => {
  const history = useHistory();

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleGetListBlogs = async () => {
    setLoading(true);
    try {

    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(async () => {
    setBlogs([]);
    handleGetListBlogs();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
        <div className="w-100 mb-4 mb-xl-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
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
      <SearchInput />
      <TableBlog
        blogs={blogs}
        handlePageChange={handlePageChange}
        page={page}
        totalPages={totalPages}
        handleGetListBlogs={handleGetListBlogs}
        loading={loading}
      />
    </>
  );
};
