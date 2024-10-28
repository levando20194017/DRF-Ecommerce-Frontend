import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Table } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "../../../routes";
import ModalDeleteItem from "../../../components/common/ModalDelete";
import ModalCreateTag from "./ModalCreateTag";
import { apiDeleteTag } from "../../../services/tag";
import TagsListPagination from "./Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NUMBER_ITEM_PAGE } from "../../../enums";
import { changeTextToThreeDot, formatTime } from "../../../utils";
import Spinner from "react-bootstrap/Spinner";

export const TagTable = ({
  tags,
  allTags,
  handlePageChange,
  handleGetListTags,
  page,
  totalPages,
  loading,
}) => {
  const [tagId, setTagId] = useState(undefined);

  const modalDeleteTag = useRef(null);
  const handleOpenModalDeleteTag = (id) => {
    setTagId(id);
    modalDeleteTag.current.open();
  };
  const modalCreateTag = useRef(null);
  const handleOpenModalCreateTag = (id) => {
    setTagId(id);
    modalCreateTag.current.open();
  };
  const TableRow = (props) => {
    const { id, name, createdAt, index } = props;

    // const statusBtn = (status) => {
    //   if (status === 0) {
    //     return (
    //       <Badge bg="primary" className="me-1">
    //         Draft
    //       </Badge>
    //     );
    //   } else if (status === 1) {
    //     return (
    //       <Badge bg="success" className="me-1">
    //         Publish
    //       </Badge>
    //     );
    //   }
    // };
    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {index + (page - 1) * 20 + 1}
          </Card.Link>
        </td>
        <td>{changeTextToThreeDot(name, 50)}</td>
        <td>{formatTime(createdAt)}</td>
        <td>
          <Link to={Routes.NullLink.path} className="text-primary fw-bold">
            <FontAwesomeIcon
              icon={faEdit}
              className="me-2 fs-5"
              onClick={() => handleOpenModalCreateTag(id)}
            />
          </Link>
          <Link to={Routes.NullLink.path} className="text-primary fw-bold">
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="me-2 fs-5 text-danger"
              onClick={() => handleOpenModalDeleteTag(id)}
            />
          </Link>
        </td>
      </tr>
    );
  };
  const handleDeleteTag = async () => {
    try {
      const response = await apiDeleteTag(tagId);
      if (response.data.statusCode === 200) {
        modalDeleteTag.current.close();
        handleGetListTags();
        toast.success(
          <span onClick={() => toast.dismiss()}>Delete tag successfully</span>,
          {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      } else {
        if (
          response.data.statusCode === 404 &&
          response.data.message === "Tag is not found"
        ) {
          toast.error(
            <span onClick={() => toast.dismiss()}>This tag is not found!</span>,
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        } else {
          toast.error(
            <span onClick={() => toast.dismiss()}>Delete tag failed!</span>,
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        }
      }
    } catch (e) {
      console.log(e);
      toast.error(
        <span onClick={() => toast.dismiss()}>Delete tag failed!</span>,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };
  return (
    <>
      <ToastContainer />
      <Card border="light" className="shadow-sm mb-4">
        <Card.Body className="pb-0">
          {loading ? (
            <div
              className=" d-flex justify-content-center align-items-center"
              style={{ height: "50vh" }}
            >
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Table
              responsive
              className="table-centered table-nowrap rounded mb-0"
            >
              <thead className="thead-light">
                <tr>
                  <th className="border-0">#</th>
                  <th className="border-0">Name</th>
                  {/* <th className="border-0">Status</th> */}
                  <th className="border-0">Created At</th>
                  <th className="border-0">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag, index) => (
                  <TableRow
                    key={`page-traffic-${tag.id}`}
                    {...tag}
                    index={index}
                  />
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
        <Card.Footer>
          {totalPages > 1 && (
            <TagsListPagination
              page={page}
              pageMax={totalPages}
              onPageChange={handlePageChange}
            ></TagsListPagination>
          )}
        </Card.Footer>
      </Card>
      <ModalDeleteItem
        ref={modalDeleteTag}
        title={"Delete Tag"}
        item={"tag"}
        handleDeleteItem={handleDeleteTag}
      />
      <ModalCreateTag
        ref={modalCreateTag}
        title={"Edit Tag"}
        save={"Edit"}
        tagId={tagId}
        handleGetListTags={handleGetListTags}
        setTagId={setTagId}
        allTags={allTags}
      />
    </>
  );
};
