import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { TinyMce } from "../product/catalog/TinyMce";
import { apiCreateBlog, apiUpdateBlog } from "../../services/blog";
import Spinner from "react-bootstrap/Spinner";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export const FormCreateBlog = ({
  formBlogData,
  setFormBlogData,
  setSelectedOptionCategory,
}) => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleChangeEditor = (value) => {
    const newForm = Object.assign(formBlogData);
    newForm.content = value;
    setFormBlogData(newForm);
  };
  const handleChangeTitle = (e) => {
    setFormBlogData({ ...formBlogData, title: e.target.value });
  };
  useEffect(() => {
    if (formBlogData.title) {
      setFormBlogData({ ...formBlogData, titleError: "" });
    }
  }, [formBlogData.title]);
  const handleChangeShortDes = (e) => {
    setFormBlogData({ ...formBlogData, shortDes: e.target.value });
  };
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (
      !formBlogData.title ||
      !formBlogData.categoryId ||
      formBlogData.tagIds.length === 0
    ) {
      setFormBlogData((prevState) => ({
        ...prevState,
        titleError: !formBlogData.title ? "Title is required!" : "",
        categoryError: !formBlogData.categoryId ? "Category is required!" : "",
        tagIdsError: formBlogData.tagIds.length === 0 ? "Tag is required!" : "",
      }));
      return;
    }
    setLoading(true);
    try {
      const dataBlog = {
        adminId: 1,
        title: formBlogData.title,
        slug: formBlogData.slug,
        shortDescription: formBlogData.shortDes,
        content: formBlogData.content,
        categoryId: formBlogData.categoryId,
        blogStatus: formBlogData.status,
        imageUrl: formBlogData.imgUrl,
        tagIds: formBlogData.tagIds,
      };
      const response = await apiCreateBlog(dataBlog);
      if (response.data.statusCode === 200) {
        history.push("/blogs");
        setTimeout(() => {
          toast.success(
            <span onClick={() => toast.dismiss()}>
              Create Blog successfully
            </span>,
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
        }, 0);
        setFormBlogData({
          adminId: "",
          title: "",
          titleError: "",
          shortDes: "",
          content: "",
          status: "Published",
          categoryId: "",
          categoryError: "",
          tags: "",
          slug: "",
          imgUrl: "",
          tagIds: [],
        });
        setSelectedOptionCategory(null);
      } else {
        toast.error(
          <span onClick={() => toast.dismiss()}> Create Blog failed!</span>,
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
    } catch (e) {
      toast.error(
        <span onClick={() => toast.dismiss()}>Create Blog failed!</span>,
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
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    if (
      !formBlogData.title ||
      !formBlogData.categoryId ||
      formBlogData.tagIds.length === 0
    ) {
      setFormBlogData((prevState) => ({
        ...prevState,
        titleError: !formBlogData.title ? "Title is required!" : "",
        categoryError: !formBlogData.categoryId ? "Category is required!" : "",
        tagIdsError: formBlogData.tagIds.length === 0 ? "Tag is required!" : "",
      }));
      return;
    }
    setLoading(true);

    try {
      const dataBlog = {
        adminId: formBlogData.adminId,
        title: formBlogData.title,
        slug: formBlogData.slug,
        shortDescription: formBlogData.shortDes,
        content: formBlogData.content,
        categoryId: formBlogData.categoryId,
        blogStatus: formBlogData.status,
        imageUrl: formBlogData.imgUrl,
        tagIds: formBlogData.tagIds,
      };
      const response = await apiUpdateBlog(id, dataBlog);
      if (response.data.statusCode === 200) {
        setTimeout(() => {
          toast.success(
            <span onClick={() => toast.dismiss()}>Edit Blog successfully</span>,
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
        }, 0);
        history.push("/blogs");
      } else {
        if (
          response.data.statusCode === 400 &&
          response.data.message === "Get record with prameter not found."
        ) {
          toast.error(
            <span onClick={() => toast.dismiss()}>
              This Blog is not found!
            </span>,
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
            <span onClick={() => toast.dismiss()}>Edit blog failed!</span>,
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
      toast.error(
        <span onClick={() => toast.dismiss()}>Edit blog failed!</span>,
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <Form onSubmit={id ? handleUpdateBlog : handleCreateBlog}>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="title">
                <Form.Label>
                  Title <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Blog Title"
                  value={formBlogData.title}
                  onChange={handleChangeTitle}
                  maxLength={50}
                />
                <div className="text-danger">{formBlogData.titleError}</div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Col md={12} className="mb-3">
                <Form.Group id="slug">
                  <Form.Label>Slug</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Blog slug"
                    value={formBlogData.slug}
                    onChange={(e) =>
                      setFormBlogData({
                        ...formBlogData,
                        slug: e.target.value,
                      })
                    }
                    maxLength={50}
                  />
                </Form.Group>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="short_desc">
                <Form.Label>Short description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={formBlogData.shortDes}
                  onChange={handleChangeShortDes}
                  maxLength={100}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Label>Content</Form.Label>
          <Row>
            <Col sm={12} className="mb-3">
              <TinyMce
                handleChangeEditor={handleChangeEditor}
                data={formBlogData.content}
              />
            </Col>
          </Row>
          <div className="mt-3">
            {loading ? (
              <div className="text-center" style={{ width: "120px" }}>
                <Spinner animation="border" variant="primary" />
              </div>
            ) : id ? (
              <Button variant="primary" type="submit">
                Edit Blog
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Create Blog
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
