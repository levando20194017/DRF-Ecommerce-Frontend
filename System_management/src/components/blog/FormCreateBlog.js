import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { TinyMce } from "../product/catalog/TinyMce";
import { apiCreateBlog, apiUpdateBlog } from "../../services/blog";
import Spinner from "react-bootstrap/Spinner";
import { useParams, useHistory } from "react-router-dom";
import { toastFailed, toastSuccess } from "../../utils";
import { Routes } from "../../routes";

export const FormCreateBlog = ({
  formBlogData,
  setFormBlogData,
  setSelectedOptionCategory
}) => {
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("mintadmin_userData")).user_infor
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
      !formBlogData.slug ||
      !formBlogData.categoryId
    ) {
      setFormBlogData((prevState) => ({
        ...prevState,
        titleError: !formBlogData.title ? "Title is required!" : "",
        categoryError: !formBlogData.categoryId ? "Category is required!" : "",
      }));
      return;
    }
    setLoading(true);
    try {
      const dataBlog = {
        admin_id: userData.id,
        title: formBlogData.title,
        slug: formBlogData.slug,
        short_description: formBlogData.shortDes,
        content: formBlogData.content,
        category_id: formBlogData.categoryId,
        image: formBlogData.imgUrl,
        tag_ids: formBlogData.tagIds,
      };
      const response = await apiCreateBlog(dataBlog);
      if (response.status === 200) {
        history.push(Routes.Blog.path);
        toastSuccess(response.message)
      } else {
        toastFailed(response.message)
      }
    } catch (e) {
      toastFailed("Create Blog failed!")
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    if (
      !formBlogData.title ||
      !formBlogData.slug ||
      !formBlogData.categoryId
    ) {
      setFormBlogData((prevState) => ({
        ...prevState,
        titleError: !formBlogData.title ? "Title is required!" : "",
        categoryError: !formBlogData.categoryId ? "Category is required!" : "",
      }));
      return;
    }
    setLoading(true);

    try {
      const dataBlog = {
        admin_id: userData.id,
        blog_id: id,
        title: formBlogData.title,
        slug: formBlogData.slug,
        short_description: formBlogData.shortDes,
        content: formBlogData.content,
        category_id: formBlogData.categoryId,
        image: formBlogData.imgUrl,
        tag_ids: formBlogData.tagIds,
      };
      const response = await apiUpdateBlog(dataBlog);
      if (response.status === 200) {
        toastSuccess(response.message)
        history.push(Routes.Blog.path);
      } else {
        toastFailed(response.message)
      }
    } catch (e) {
      toastFailed("Edit blog failed!")
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
                  <Form.Label>Slug <span className="text-danger">*</span> </Form.Label>
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
