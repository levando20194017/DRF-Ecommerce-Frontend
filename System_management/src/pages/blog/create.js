import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { Col, Row, Form, Card, Image } from "@themesberg/react-bootstrap";
import { FormCreateBlog } from "../../components/blog/FormCreateBlog";
import { ChooseTagWidget } from "../../components/blog/ProfileWidget";
import BlogImage from "../../assets/img/no-image.png";
import "./style.css";
import { apiUploadImage } from "../../services/image";
import { apiGetListCategories } from "../../services/category";
import { apiDetailBlog } from "../../services/blog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { apiGetListTags } from "../../services/tag";

export default () => {
  const { id } = useParams();
  const [formBlogData, setFormBlogData] = useState({
    adminId: 1,
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
    tagIdsError: "",
  });
  const [blogImg, setBlogImg] = useState({});
  const [listCategories, setListCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOptionCategory, setSelectedOptionCategory] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [listTags, setListTags] = useState([]);
  const [optionsTag, setOptionsTag] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
    const selectedIds = selectedOptions.map((option) => option.value);
    setFormBlogData({ ...formBlogData, tagIds: selectedIds, tagIdsError: "" });
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
        if (!id) {
          //Set initial value of category
          if (response.data.data.source.length !== 0) {
            setSelectedOptionCategory({
              value: response.data.data.source[0].id,
              label: response.data.data.source[0].name,
            });
          }
        }
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

  useEffect(() => {
    if (listCategories.length !== 0) {
      const newOptions = listCategories.map((category) => {
        return {
          value: category.id,
          label: category.name,
        };
      });
      setOptions(newOptions);
    }
  }, [listCategories]);

  useEffect(() => {
    if (listTags.length !== 0) {
      const newOptions = listTags.map((tag) => {
        return {
          value: tag.id,
          label: tag.name,
        };
      });
      setOptionsTag(newOptions);
    }
  }, [listTags]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await apiDetailBlog(id);
        if (response.data.statusCode === 200) {
          const data = response.data.data;
          if (data) {
            setFormBlogData({
              title: data.title,
              adminId: data.adminId,
              status: data.blogStatus,
              categoryId: data.categoryId,
              content: data.content,
              slug: data.slug,
              imgUrl: data.imageUrl,
              tags: data.blogTag,
              shortDes: data.shortDescription,
              tagIds: data.blogTag.map((tag) => {
                return tag.tagId;
              }),
            });

            const resOfListTags = await apiGetListTags({
              PageIndex: 1,
              PageSize: 1000,
            });

            if (resOfListTags.data.statusCode === 200) {
              const dataOfTags = resOfListTags.data.data.source;
              let newSelectedTags = [];

              data.blogTag
                .map((tag) => {
                  return tag.tagId;
                })
                .forEach((item) => {
                  const tagItemOfId = dataOfTags.find((tag) => {
                    return tag.id === item;
                  });
                  newSelectedTags.push({
                    value: tagItemOfId?.id,
                    label: tagItemOfId?.name,
                  });
                });

              setSelectedTags(newSelectedTags);
            }

            const resOfListCategories = await apiGetListCategories({
              PageIndex: 1,
              PageSize: 1000,
            });
            if (resOfListCategories.data.statusCode === 200) {
              const dataOfCategory = resOfListCategories.data.data.source;

              if (dataOfCategory.length !== 0) {
                const categoryDataOfId = dataOfCategory.find((category) => {
                  return category.id === data.categoryId;
                });
                setSelectedOptionCategory({
                  value: categoryDataOfId?.id,
                  label: categoryDataOfId?.name,
                });
              }
            }
          }
        }
      };
      fetchData();
    } else {
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
      setSelectedTags([]);
      //Set initial value of category
      if (listCategories?.length !== 0) {
        setSelectedOptionCategory({
          value: listCategories[0].id,
          label: listCategories[0].name,
        });
      } else {
        setSelectedOptionCategory(null);
      }
    }
  }, [id]);

  const handleChangeCategory = (selectedOption) => {
    setSelectedOptionCategory(selectedOption);
  };
  useEffect(() => {
    const selectedCategory = selectedOptionCategory?.value;
    setFormBlogData({
      ...formBlogData,
      categoryId: selectedCategory,
      categoryError: "",
    });
  }, [selectedOptionCategory]);
  useEffect(() => {
    if (formBlogData.categoryId) {
      setFormBlogData({ ...formBlogData, categoryError: "" });
    }
    if (id) {
      if (listCategories.length !== 0) {
        const categoryOfId = listCategories.find((category) => {
          return category.id === formBlogData.categoryId;
        });
        setSelectedOptionCategory({
          value: categoryOfId.id,
          label: categoryOfId.name,
        });
      }
    }
  }, [formBlogData.categoryId]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 3 * 1024 * 1024; // 3MB
      if (file?.size > maxSize) {
        // Kích thước vượt quá giới hạn
        toast.error(
          <span onClick={() => toast.dismiss()}>
            Please upload photos smaller than 3MB.
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
        setErrorCount((prevCount) => prevCount + 1);
        return;
      }
      if (
        !(
          file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png" ||
          file.type === "image/gif"
        )
      ) {
        toast.error(
          <span onClick={() => toast.dismiss()}>
            Please select PNG, GIF or JPG file.
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
        setErrorCount((prevCount) => prevCount + 1);
        return;
      }

      setBlogImg({
        name: file.name,
        url: URL.createObjectURL(file),
        file: file,
      });
      setErrorCount((prevCount) => prevCount + 1);
    }
  };
  const handleGetImageBlogUrl = async () => {
    try {
      const formData = new FormData();
      if (blogImg?.file) {
        formData.append("files", blogImg.file);
        const response = await apiUploadImage(formData);
        if (response.data.statusCode === 200) {
          setFormBlogData({ ...formBlogData, imgUrl: response.data.data[0] });
          toast.success(
            <span onClick={() => toast.dismiss()}>
              Upload image successfully!
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
            <span onClick={() => toast.dismiss()}> Upload image failed!</span>,
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
        <span onClick={() => toast.dismiss()}>
          Something went wrong, please try again!
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
    }
  };
  useEffect(() => {
    handleGetImageBlogUrl();
  }, [blogImg]);

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setFormBlogData({ ...formBlogData, status: selectedStatus });
  };

  return (
    <>
      <ToastContainer />
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{
              className: "breadcrumb-dark breadcrumb-transparent",
            }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Blog</Breadcrumb.Item>
            {id ? (
              <Breadcrumb.Item active>Edit Blog</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item active>Create New Blog</Breadcrumb.Item>
            )}
          </Breadcrumb>

          {id ? <h4>Edit Blog</h4> : <h4>Create New Blog</h4>}
        </div>
      </div>
      <Row>
        <Col xs={12} xl={9}>
          <FormCreateBlog
            formBlogData={formBlogData}
            setFormBlogData={setFormBlogData}
            setSelectedOptionCategory={setSelectedOptionCategory}
          />
        </Col>

        <Col xs={12} xl={3}>
          <Row>
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <div className="d-xl-flex flex-column align-items-center d-">
                    <div className="xl-avatar">
                      {formBlogData.imgUrl ? (
                        <Image
                          fluid
                          rounded
                          src={`${process.env.REACT_APP_IMAGE_URL}${formBlogData.imgUrl}`}
                        />
                      ) : (
                        <Image fluid rounded src={BlogImage} />
                      )}
                    </div>
                    <div className="file-field mt-3">
                      <div className="d-flex justify-content-xl-center ms-xl-3">
                        <div className="d-flex">
                          <span className="icon icon-md">
                            <FontAwesomeIcon
                              icon={faPaperclip}
                              className="me-3"
                            />
                          </span>
                          <input
                            type="file"
                            key={errorCount}
                            onChange={handleImageChange}
                          />
                          <div className="d-md-block text-start">
                            <div className="fw-normal text-dark mb-1">
                              Choose Image
                            </div>
                            <div className="text-gray small">
                              JPG, GIF or PNG. Max size of 3MB
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <Form.Label>Status</Form.Label>
                  <div className="mt-3">
                    <Form.Group id="status">
                      <Form.Select
                        value={formBlogData.status}
                        onChange={handleStatusChange}
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <Form.Label>
                    Category <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="mt-3">
                    <div className="text-left">
                      <Select
                        value={selectedOptionCategory}
                        onChange={handleChangeCategory}
                        options={options}
                        isSearchable
                      />
                    </div>
                  </div>
                  {formBlogData.categoryError && (
                    <div className="text-danger">
                      {formBlogData.categoryError}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12}>
              <ChooseTagWidget
                title="Tags"
                listTags={listTags}
                optionsTag={optionsTag}
                handleTagChange={handleTagChange}
                formBlogData={formBlogData}
                selectedTags={selectedTags}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
