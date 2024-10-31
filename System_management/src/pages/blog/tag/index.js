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

export default () => {
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allTags, setAllTags] = useState([]);
  const [totalTags, setTotalTags] = useState(0);
  const [loading, setLoading] = useState(false);

  const modalCreateTag = useRef(null);
  const history = useHistory();
  const handleOpenModalCreateTag = () => {
    modalCreateTag.current.open();
  };
  const handleGetAllTags = async () => {
    setLoading(true);
    try {
      const params = {
        PageIndex: 1,
        PageSize: totalTags,
      };
      const response = await apiGetListTags(params);
      if (response.data.statusCode === 200) {
        setAllTags(response.data.data.source);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (totalTags) {
      handleGetAllTags();
    }
  }, [totalTags]);
  const handleGetListTags = async () => {
    try {
      const params = {
        PageIndex: page,
        PageSize: 20,
      };
      const response = await apiGetListTags(params);
      if (response.data.statusCode === 200) {
        if (response.data.data.source.length === 0 && page - 1 > 0) {
          setPage(page - 1);
        } else {
          setTags(response.data.data.source);
          setTotalPages(response.data.data.totalPages);
          setTotalTags(response.data.data.totalRecords);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(async () => {
    handleGetListTags();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
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
      <SearchInput />

      <TagTable
        tags={tags}
        allTags={allTags}
        handlePageChange={handlePageChange}
        handleGetListTags={handleGetListTags}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        loading={loading}
      />
      <ModalCreateTag
        ref={modalCreateTag}
        title={"Create Tag"}
        handleGetListTags={handleGetListTags}
        allTags={allTags}
      />
    </>
  );
};
