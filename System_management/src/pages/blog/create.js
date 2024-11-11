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
import { Select } from "antd";
import { useParams } from "react-router-dom";
import { apiGetListTags } from "../../services/tag";
import { toastFailed, toastSuccess } from "../../utils";

export default () => {
  const { id } = useParams();

  const [formBlogData, setFormBlogData] = useState({
    title: "",
    titleError: "",
    shortDes: "",
    content: "",
    categoryId: "",
    categoryError: "",
    tags: "",
    slug: "",
    imgUrl: "",
    tagIds: [],
    tagIdsError: "",
  });
  const [listCategories, setListCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOptionCategory, setSelectedOptionCategory] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [listTags, setListTags] = useState([]);
  const [optionsTag, setOptionsTag] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagChange = (selectedOptions) => {
    setFormBlogData({ ...formBlogData, tagIds: selectedOptions, tagIdsError: "" });
  };

  const handleGetListCategories = async () => {
    try {
      const params = {
        pageIndex: 1,
        pageSize: 10000,
        searchName: ""
      };
      const response = await apiGetListCategories(params);
      if (response.status === 200) {
        const categories = response.data.categories
        setListCategories(categories);
        if (!id) {
          //Set initial value of category
          if (categories.length !== 0) {
            setSelectedOptionCategory({
              value: categories[0].id,
              label: categories[0].name,
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
        pageIndex: 1,
        pageSize: 10000,
        searchName: ""
      };
      const response = await apiGetListTags(params);
      if (response.status === 200) {
        setListTags(response.data.tags);
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
        if (response.status === 200) {
          const data = response.data;
          if (data) {
            setFormBlogData({
              title: data.title,
              adminId: data.admin_id,
              categoryId: data.category,
              content: data.content,
              slug: data.slug,
              imgUrl: data.image,
              tags: data.tag_names,
              shortDes: data.short_description,
              tagIds: data.tags.split(",").map(Number)
            });
          }
        }
      };
      fetchData();
    } else {
      setFormBlogData({
        title: "",
        titleError: "",
        shortDes: "",
        content: "",
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
    // setSelectedOptionCategory(selectedOption);
    setFormBlogData({
      ...formBlogData,
      categoryId: selectedOption,
      categoryError: "",
    });
  };
  useEffect(() => {
    if (formBlogData.categoryId) {
      setFormBlogData({ ...formBlogData, categoryError: "" });
    }
  }, [formBlogData.categoryId]);

  const isValidFileUploaded = (file) => {
    if (file) {
      const validExtensions = ['png', 'jpeg', 'jpg', 'gif']
      const fileExtension = file.type.split('/')[1]
      return validExtensions.includes(fileExtension)
    }
  }

  const handleChooseFile = (e) => {
    const maxSize = 3 * 1024 * 1024;
    if (!isValidFileUploaded(e.target.files[0])) {
      toastFailed('Please select PNG, GIF or JPG file.')
      setErrorCount((prevCount) => prevCount + 1);
    } else if (e.target.files[0]?.size > maxSize) {
      toastFailed('Please upload photos smaller than 3MB.')
      setErrorCount((prevCount) => prevCount + 1);
    } else {
      handleUploadImage(e.target.files[0])
    }
  }
  const handleUploadImage = async (file) => {
    try {
      let formData = new FormData()
      formData.append('file', file);
      const response = await apiUploadImage(formData)
      if (response.status === 200) {
        setFormBlogData({ ...formBlogData, imgUrl: response.img_url });
        toastSuccess(response.message)
      } else {
        toastFailed(response.message)
      }
    } catch (e) {
      toastFailed('Something went wrong, please try again !')
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb
            listProps={{ className: "breadcrumb-primary    breadcrumb-text-light text-white" }}
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
                            onChange={handleChooseFile}
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
                  <Form.Label>
                    Category <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="mt-2">
                    <div className="text-left">
                      <Select
                        showSearch
                        placeholder="Select a category"
                        value={formBlogData.categoryId}
                        onChange={handleChangeCategory}
                        options={options}
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
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <Form.Label>
                    Tags
                  </Form.Label>
                  <div className="mt-2">
                    <div className="text-left"></div>
                    <Select
                      mode="multiple"
                      placeholder="Select tags"
                      // value={optionsTag}
                      value={formBlogData.tagIds.length > 0 ? formBlogData.tagIds : undefined}
                      options={optionsTag}
                      onChange={handleTagChange}
                      style={{
                        width: '100%',
                      }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
