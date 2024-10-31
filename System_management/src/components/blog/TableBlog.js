import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Image, Badge, Table } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../../routes";
import ModalDeleteItem from "../common/ModalDelete";
import BlogListPagination from "./BlogListPagination";
import { NUMBER_ITEM_PAGE } from "../../enums";
import { apiGetListCategories } from "../../services/category";
import { apiDeleteBlog } from "../../services/blog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatTime } from "../../utils";
import Spinner from "react-bootstrap/Spinner";
import { apiGetListTags } from "../../services/tag";
import ImageLink from "../../assets/img/no-image.png";

export default ({
  blogs,
  handlePageChange,
  page,
  totalPages,
  handleGetListBlogs,
  loading,
}) => {
  const [blogId, setBlogId] = useState(undefined);
  const [listCategories, setListCategories] = useState([]);
  const [listTags, setListTags] = useState([]);
  const modalDeleteBlog = useRef(null);
  const handleOpenModalDeleteBlog = (id) => {
    setBlogId(id);
    modalDeleteBlog.current.open();
  };
  const handleGetListCategories = async () => {
    try {
      const params = {
        PageIndex: 1,
        PageSize: 1000,
      };
      const response = await apiGetListCategories(params);
      if (response.data.statusCode === 200) {
        setListCategories(response.data.data.source);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleGetListTags = async () => {
    try {
      const params = {
        PageIndex: 1,
        PageSize: 1000,
      };
      const response = await apiGetListTags(params);
      if (response.data.statusCode === 200) {
        setListTags(response.data.data.source);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleGetListCategories();
    handleGetListTags();
  }, []);
  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    }
    return str.substring(0, maxLength) + "...";
  };

  const TableRow = (props) => {
    const {
      id,
      index,
      imageUrl,
      title,
      categoryId,
      blogStatus,
      createdAt,
      shortDescription,
      // content,
      slug,
      blogTag,
    } = props;
    const statusBtn = (blogStatus) => {
      if (blogStatus === "Published") {
        return (
          <Badge bg="info" className="me-1">
            Published
          </Badge>
        );
      } else if (blogStatus === "Draft") {
        return (
          <Badge bg="primary" className="me-1">
            Draft
          </Badge>
        );
      } else if (blogStatus === "Pending" || blogStatus === "PENDING") {
        return (
          <Badge bg="warning" className="me-1">
            Pending
          </Badge>
        );
      } else if (blogStatus === "POSTED") {
        return (
          <Badge bg="success" className="me-1">
            Posted
          </Badge>
        );
      } else {
        return (
          <Badge bg="danger" className="me-1">
            {blogStatus}
          </Badge>
        );
      }
    };

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {index + (page - 1) * NUMBER_ITEM_PAGE + 1}
          </Card.Link>
        </td>
        <td>
          {imageUrl ? (
            <Image
              src={`${process.env.REACT_APP_IMAGE_URL}${imageUrl}`}
              className="product-thunmbnail me-2"
            />
          ) : (
            <Image src={`${ImageLink}`} className="product-thunmbnail me-2" />
          )}
        </td>
        <td style={{ width: "15%", wordBreak: "break-word" }}>
          {title ? truncateString(title, 25) : "--"}
        </td>
        <td style={{ width: "15%", wordBreak: "break-word" }}>
          {slug ? truncateString(slug, 25) : "--"}
        </td>
        <td style={{ width: "15%", wordBreak: "break-word" }}>
          {categoryId
            ? truncateString(
              listCategories.find((category) => category.id === categoryId)
                ?.name || "--",
              25
            )
            : "--"}
        </td>
        <td style={{ width: "15%", wordBreak: "break-word" }}>
          {shortDescription ? truncateString(shortDescription, 25) : "--"}
        </td>
        {/* <td>{content}</td> */}
        <td style={{ width: "15%", wordBreak: "break-word" }}>
          {blogTag.length
            ? truncateString(
              blogTag
                .map((tag) => {
                  return listTags.find((tagItem) => {
                    return tagItem.id === tag.tagId;
                  })?.name;
                })
                .join("-"),
              25
            )
            : "--"}
        </td>
        <td>{statusBtn(blogStatus)}</td>
        <td style={{ width: "15%", wordBreak: "break-word" }}>
          {formatTime(createdAt)}
        </td>
        <td>
          <Link
            to={`/blogs/update-blog/${id}`}
            className="text-primary fw-bold"
          >
            <FontAwesomeIcon icon={faEdit} className="me-2 fs-5" />
          </Link>
          <Link to={Routes.NullLink.path} className="text-primary fw-bold">
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="me-2 fs-5 text-danger"
              onClick={() => handleOpenModalDeleteBlog(id)}
            />
          </Link>
        </td>
      </tr>
    );
  };

  const handleDeleteBlog = async () => {
    try {
      const response = await apiDeleteBlog(blogId);
      if (response.data.statusCode === 200) {
        modalDeleteBlog.current.close();
        handleGetListBlogs();
        toast.success(
          <span onClick={() => toast.dismiss()}>Delete Blog successfully</span>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      } else {
        if (response.data.statusCode === 400) {
          toast.error(
            <span onClick={() => toast.dismiss()}>
              This Blog is not found!
            </span>,
            {
              position: "top-right",
              autoClose: 5000,
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
            <span onClick={() => toast.dismiss()}>Delete blog failed!</span>,
            {
              position: "top-right",
              autoClose: 5000,
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
        <span onClick={() => toast.dismiss()}>Delete blog failed!</span>,
        {
          position: "top-right",
          autoClose: 5000,
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
      <Card border="light" className="shadow-sm mb-4">
        <Card.Body className="">
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
                  <th className="border-0">IMAGE</th>
                  <th className="border-0">TITLE</th>
                  <th className="border-0">SLUG</th>
                  <th className="border-0">CATEGORY</th>
                  <th className="border-0">SHORT DES</th>
                  {/* <th className="border-0">CONTENT</th> */}
                  <th className="border-0">TAGS</th>
                  <th className="border-0">STATUS</th>
                  <th className="border-0">DATE CREATED</th>
                  <th className="border-0">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <TableRow
                    key={`page-traffic-${blog.id}`}
                    {...blog}
                    index={index}
                  />
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
        <Card.Footer>
          {totalPages > 1 && (
            <BlogListPagination
              page={page}
              pageMax={totalPages}
              onPageChange={handlePageChange}
            ></BlogListPagination>
          )}
        </Card.Footer>
      </Card>
      <ModalDeleteItem
        ref={modalDeleteBlog}
        title={"Delete Blog"}
        item={"blog"}
        handleDeleteItem={handleDeleteBlog}
      />
    </>
  );
};
