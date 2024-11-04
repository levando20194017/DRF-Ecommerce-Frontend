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
import { listProductType } from "../../enums";
import { toastFailed } from "../../utils";
import { apiUploadImage } from "../../services/image";
import { ToastSuccess } from "../../components/common/Toast";

export default () => {
  const [listCatalogs, setListCatalogs] = useState([]);
  const [listPromotions, setListPromotions] = useState([]);
  const [avtProduct, setAvtProduct] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [formData, setFormData] = useState({
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
    telephoto_camera: "",
    ultra_wide_camera: "",
    video_recording: "",
    camera_features: "",
    front_camera: "",
    chipset: "",
    gpu: "",
    nfc: false,
    sim_type: "",
    network_support: "",
    gps_support: "",
    storage_capacity: undefined,
    dimensions: "",
    weight: undefined,
    back_material: "",
    frame_material: "",
    water_resistance: "",
    os_version: "",
    security_features: "",
    other_features: "",
    audio_technologies: "",
    charging_technology: "",
    charging_port: "",
    wifi: "",
    bluetooth: "",
  })

  const { id } = useParams();

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
        searchName: ""
      };
      const response = await apiGetListCatalogs(params);
      if (response.status === 200)
        setListCatalogs(response.data.catalogs);
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetListPromotions = async () => {
    try {
      const response = await apiGetListPromotions({
        pageIndex: 1,
        pageSize: 10000,
        searchName: ""
      });
      if (response.status === 200) {
        setListPromotions(response.data.promotions);
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
      const formData = new FormData();
      formData.append("files", avtProduct.file);
      const response = await apiUploadImage(formData);
      if (response.status === 200) {
        ToastSuccess(response.message)
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

  return (
    <>
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
          <FormCreateProduct formData={formData} />
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
                  <Form.Label>
                    Product Type <span className="text-danger">*</span>
                  </Form.Label>

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

                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <Form.Label>
                    Promotion <span className="text-danger">*</span>
                  </Form.Label>
                  <div>
                    <Form.Group id="promotion">

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
