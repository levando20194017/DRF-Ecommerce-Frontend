import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Image, Badge, Table } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { apiDeleteBlog, apiRestoreBlog } from "../../services/blog";
import "react-toastify/dist/ReactToastify.css";
import { formatTime, toastFailed, toastSuccess } from "../../utils";
import ImageLink from "../../assets/img/no-image.png";
import { Popconfirm } from "antd";
import { UndoOutlined } from '@ant-design/icons';

export default ({
  pageIndex,
  pageSize,
  listData,
  handleGetListBlogs
}) => {
  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    }
    return str.substring(0, maxLength) + "...";
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await apiDeleteBlog(id);
      if (response.status === 200) {
        handleGetListBlogs();
        toastSuccess(response.message)
      } else {
        toastFailed(response.message)
      }
    } catch (e) {
      console.log(e);
      toastFailed("Delete blog failed!")
    }
  };

  const handleRestoreItem = async (id) => {
    try {
      const response = await apiRestoreBlog(id);
      if (response.status === 200) {
        handleGetListBlogs();
        toastSuccess(response.message)
      } else {
        toastFailed(response.message)
      }
    } catch (e) {
      console.log(e);
      toastFailed("Delete blog failed!")
    }
  };

  const TableRow = (props) => {
    const {
      id,
      index,
      image,
      title,
      category_name,
      created_at,
      delete_at,
      short_description,
      slug,
      tags,
    } = props;

    return (
      <tr style={{ opacity: delete_at ? 0.5 : 1, backgroundColor: delete_at ? "#d1d5d8" : "#fff" }}>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {index + (pageIndex - 1) * pageSize + 1}
          </Card.Link>
        </td>
        <td>
          {image ? (
            <Image
              src={`${process.env.REACT_APP_IMAGE_URL}${image}`}
              className="product-thumbnail me-2"
            />
          ) : (
            <Image src={`${ImageLink}`} className="product-thumbnail me-2" />
          )}
        </td>
        <td style={{ wordBreak: "break-word" }}>
          {title ? truncateString(title, 25) : "--"}
        </td>
        <td style={{ wordBreak: "break-word" }}>
          {slug ? truncateString(slug, 25) : "--"}
        </td>
        <td style={{ wordBreak: "break-word" }}>
          {category_name ? truncateString(category_name, 25) : "--"}
        </td>
        <td style={{ wordBreak: "break-word" }}>
          {short_description ? truncateString(short_description, 25) : "--"}
        </td>
        {/* <td>{content}</td> */}
        <td style={{ wordBreak: "break-word" }}>
          {tags}
        </td>
        <td style={{ wordBreak: "break-word" }}>
          {formatTime(created_at)}
        </td>
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
              <Link
                to={`/blogs/update-blog/${id}`}
                className="text-primary fw-bold"
              >
                <FontAwesomeIcon icon={faEdit} className="me-2 fs-5" />
              </Link>
              <Popconfirm
                title="Are you sure you want to delete this item?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleDeleteItem(id)}
                className="cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="me-2 fs-5 text-danger"
                />
              </Popconfirm>
            </div>
          }
        </td>
      </tr>
    );
  };

  return (
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
              <th className="border-0">TITLE</th>
              <th className="border-0">SLUG</th>
              <th className="border-0">CATEGORY</th>
              <th className="border-0">SHORT DES</th>
              <th className="border-0">TAGS</th>
              <th className="border-0">DATE CREATED</th>
              <th className="border-0">DATE DELETED</th>
              <th className="border-0">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {listData.map((blog, index) => (
              <TableRow
                key={`page-traffic-${blog.id}`}
                {...blog}
                index={index}
              />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
