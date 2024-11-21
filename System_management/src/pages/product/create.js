import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { Col, Row, Form, Card, Image } from "@themesberg/react-bootstrap";
import { FormCreateProduct } from "../../components/product/FormCreateProduct";
import CatalogImage from "../../assets/img/no-image.png";
import "./style.scss";
import { apiGetListCatalogs } from "../../services/catalog";
import { apiGetListPromotions } from "../../services/promotion";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toastFailed } from "../../utils";
import { apiUploadImage } from "../../services/image";
import { ToastSuccess } from "../../components/common/Toast";
import FormInputText from "../../components/common/FormInputText";
import { Select, TreeSelect } from "antd";
import FormInputFloat from "../../components/common/FormInputFloat";

export default () => {
  const [optionsPromotion, setOptionsPromotion] = useState([])
  const [avtProduct, setAvtProduct] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [treeData, setTreeData] = useState([]);
  const userData = JSON.parse(localStorage.getItem("mintadmin_userData"))?.user_infor

  const [formData, setFormData] = useState({
    admin: userData?.id,
    catalog: undefined,
    promotion: undefined,
    name: "",
    launch_date: undefined,
    short_description: "",
    description: "",
    image: "",
    gallery: "",
    price: undefined,
    color: "",
    product_type: "",
    screen_size: "",
    screen_technology: "",
    resolution: "",
    screen_features: "",
    main_camera: "",
    video_recording: "",
    camera_features: "",
    front_camera: "",
    chipset: "",
    gpu: "",
    network_support: "",
    storage_capacity: undefined,
    dimensions: "",
    weight: undefined,
    version: "",
    security_features: "",
    charging: "",
    wifi: "",
    bluetooth: "",
    other_info: ""
  })

  const [errors, setErrors] = useState({
    name: "",
    launch_date: "",
    image: "",
    gallery: "",
    price: "",
    product_type: "",
    screen_size: "",
    main_camera: "",
    front_camera: "",
    chipset: "",
    gpu: "",
    storage_capacity: "",
    dimensions: "",
    weight: "",
    catalog: ""
  })

  const { id } = useParams();

  // Function to map catalog data to tree data format
  const mapCatalogToTreeData = (catalogs) => {
    return catalogs.map(catalog => {
      return {
        title: catalog.name,
        value: catalog.id,
        children: mapCatalogToTreeData(catalog.children), // Recursive mapping for children
      };
    });
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 3 * 1024 * 1024; // 3MB
      if (file?.size > maxSize) {
        // Kích thước vượt quá giới hạn
        toastFailed("Please upload photos smaller than 3MB.")
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
        toastFailed("Please select PNG, GIF or JPG file.")
        setErrorCount((prevCount) => prevCount + 1);
        return;
      }

      setAvtProduct({
        name: file.name,
        url: URL.createObjectURL(file),
        file: file,
      });
      setErrorCount((prevCount) => prevCount + 1);
    }
  };

  const handleGetListCatalogs = async () => {
    try {
      const params = {
        pageIndex: 1,
        pageSize: 10000,
        textSearch: ""
      };
      const response = await apiGetListCatalogs(params);
      if (response.status === 200) {
        const mappedData = mapCatalogToTreeData(response.data.data); // Gọi hàm mapping
        setTreeData(mappedData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetListPromotions = async () => {
    try {
      const response = await apiGetListPromotions({
        pageIndex: 1,
        pageSize: 10000,
        promotionName: ""
      });
      if (response.status === 200) {
        setOptionsPromotion(response.data.promotions.map((item) => ({
          value: item.id,
          label: item.name
        })))
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleGetListCatalogs();
    handleGetListPromotions();
  }, []);

  const getAvtProductLink = async () => {
    try {
      const formImageData = new FormData();
      formImageData.append("file", avtProduct.file);
      const response = await apiUploadImage(formImageData);
      if (response.status === 200) {
        ToastSuccess(response.message)
        setFormData({ ...formData, image: response.img_url })
        setErrors({ ...errors, image: "" })
      } else {
        toastFailed("Upload image failed!")
      }
    } catch (e) {
      console.log(e);
      toastFailed("Upload image failed!")
    }
  };
  useEffect(() => {
    if (avtProduct) {
      getAvtProductLink();
    }
  }, [avtProduct]);

  const handleBlur = (name) => {
    setFormData({ ...formData, [name]: formData[name].trim() })
  }

  const handleChangePromotion = (value) => {
    setFormData({ ...formData, promotion: value })
  }

  const onChangeCatalog = (newValue) => {
    setFormData({ ...formData, catalog: newValue })
    setErrors({ ...errors, catalog: "" })
  };


  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb
            listProps={{ className: "breadcrumb-primary    breadcrumb-text-light text-white" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Product</Breadcrumb.Item>
            {id ? (
              <Breadcrumb.Item active>Update Product</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item active>Create Product</Breadcrumb.Item>
            )}
          </Breadcrumb>
          <h4>{id ? "Update Product" : "Create Product"}</h4>
        </div>
      </div>
      <Row>
        <Col xs={12} xl={9}>
          <FormCreateProduct formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
        </Col>

        <Col xs={12} xl={3}>
          <Row>
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <div className="d-xl-flex flex-column align-items-center d-">
                    <div className="xl-avatar">
                      {formData.image ? (
                        <Image
                          fluid
                          rounded
                          src={`${process.env.REACT_APP_IMAGE_URL}${formData.image}`}
                        />
                      ) : (
                        <Image fluid rounded src={CatalogImage} />
                      )}
                    </div>
                    {errors.image && <div className="text-danger">{errors.image}</div>}
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
                              JPG, GIF or PNG.
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
                  <FormInputText
                    title={"Version"}
                    isRequired={false}
                    value={formData.version}
                    handleBlur={handleBlur}
                    keyField={"version"}
                    formData={formData}
                    setFormData={setFormData}
                    maxLength={255}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <FormInputFloat
                    title={"Weight"}
                    isRequired={true}
                    value={formData.weight}
                    keyField={"weight"}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  {errors.weight && <div className="text-danger">{errors.weight}</div>}
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <Form.Label>
                    Catalog <span className="text-danger">*</span>
                  </Form.Label>
                  <div>
                    <Form.Group id="category">
                      <TreeSelect
                        style={{
                          width: '100%',
                        }}
                        dropdownStyle={{
                          maxHeight: 400,
                          overflow: 'auto',
                        }}
                        value={formData.catalog}
                        treeData={treeData}
                        placeholder="Please select"
                        treeDefaultExpandAll
                        onChange={onChangeCatalog}
                      />
                    </Form.Group>
                    {errors.catalog && <div className="text-danger">{errors.catalog}</div>}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <Form.Label>
                    Promotion
                  </Form.Label>
                  <div>
                    <Form.Group id="promotion">
                      <Select
                        showSearch
                        placeholder="Select a promotion"
                        value={formData.promotion}
                        onChange={handleChangePromotion}
                        options={optionsPromotion}
                      />
                    </Form.Group>
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
