import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Table } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "../../../routes";
import { apiDeleteTag, apiRestoreTag } from "../../../services/tag";
import "react-toastify/dist/ReactToastify.css";
import { changeTextToThreeDot, formatTime, toastFailed, toastSuccess } from "../../../utils";
import Spinner from "react-bootstrap/Spinner";
import { Popconfirm } from "antd";
import { UndoOutlined } from '@ant-design/icons';
import ModalUpdateTag from "./ModalUpdateTag";

export const TagTable = ({
  loading,
  allTags,
  handleGetListTags,
  pageIndex,
  pageSize,
}) => {
  const [tagId, setTagId] = useState(undefined);

  const modalUpdateTag = useRef(null);
  const handleOpenModalUpdateTag = (id) => {
    setTagId(id);
    modalUpdateTag.current.open();
  };

  const handleRestoreItem = async (id) => {
    try {
      const response = await apiRestoreTag({ id });
      if (response.status === 200) {
        toastSuccess(response?.message);
        handleGetListTags()
      } else {
        toastFailed(response?.message);
      }
    } catch (e) {
      toastFailed('Delete catalog failed');
    }
  }

  const handleDeleteTag = async (id) => {
    try {
      const response = await apiDeleteTag(id);
      if (response.status === 200) {
        handleGetListTags();
        toastSuccess(response.message)
      } else {
        toastFailed(response.message)
      }
    } catch (e) {
      console.log(e);
      toastFailed("Delete tag failed!")
    }
  };

  const TableRow = (props) => {
    const { id, name, created_at, delete_at, index } = props;

    return (
      <tr style={{ opacity: delete_at ? 0.5 : 1, backgroundColor: delete_at ? "#d1d5d8" : "#fff" }}>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {index + (pageIndex - 1) * pageSize + 1}
          </Card.Link>
        </td>
        <td>{changeTextToThreeDot(name, 50)}</td>
        <td>{formatTime(created_at)}</td>
        <td>{delete_at ? formatTime(delete_at) : "---"}</td>
        <td>
          {delete_at ?
            <div>
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
                  onClick={() => handleOpenModalUpdateTag(id)}
                />
              </Link>
              <Popconfirm
                title="Are you sure you want to delete this item?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleDeleteTag(id)}
                className="cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="me-2 fs-5 text-danger"
                />
              </Popconfirm>
            </div>}
        </td>
      </tr>
    );
  };
  return (
    <>
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
                  <th className="border-0">CREATED AT</th>
                  <th className="border-0">DELETED AT</th>
                  <th className="border-0">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {allTags.map((tag, index) => (
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
      </Card>
      <ModalUpdateTag
        ref={modalUpdateTag}
        title={"Edit Tag"}
        tagId={tagId}
        handleGetListTags={handleGetListTags}
      />
    </>
  );
};
