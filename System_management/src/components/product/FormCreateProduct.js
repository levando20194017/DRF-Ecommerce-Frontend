import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import {
  apiCreateProduct,
  apiDetailProduct,
  apiUpdateProduct,
} from "../../services/product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import { useHistory, useParams } from "react-router-dom";
import { TinyMce } from "./catalog/TinyMce";
import { toastFailed, toastSuccess } from "../../utils";
import FormInputText from "../common/FormInputText";
import FormInputFloat from "../common/FormInputFloat";
import FormInputNumber from "../common/FormInputNumber";
import ListGallery from "./ListGallery";
import FormInputDate from "../common/FormInputDate";

export const FormCreateProduct = ({
  formData,
  setFormData,
  errors,
  setErrors
}) => {
  const history = useHistory();
  const [dataDetail, setDataDetail] = useState()
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [listGallery, setListGallery] = useState([]);

  const getDetailProduct = async () => {
    try {
      const response = await apiDetailProduct(id);
      if (response.status === 200) {
        setDataDetail(response.data)
        if (response.data.gallery) {
          setListGallery(response.data.gallery.split(","))
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) {
      getDetailProduct();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setFormData({ ...dataDetail })
    }
  }, [id, dataDetail])

  const handleOnChangeInput = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value })
    setErrors({ ...errors, [name]: "" })
  }

  const handleBlur = (name) => {
    setFormData({ ...formData, [name]: formData[name].trim() })
  }
  const handleChangeEditor = (value) => {
    const newForm = Object.assign(formData);
    newForm.description = value;
    setFormData(newForm);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name ? "" : "Name is required!",
      launch_date: formData.launch_date ? "" : "Launch date is required!",
      image: formData.image ? "" : "Image is required!",
      color: formData.color ? "" : "Color is required!",
      gallery: formData.gallery ? "" : "Gallery is required!",
      price: formData.price ? "" : "Price is required!",
      product_type: formData.product_type ? "" : "Product type is required!",
      screen_size: formData.screen_size ? "" : "Screen size is required!",
      main_camera: formData.main_camera ? "" : "Main camera is required!",
      front_camera: formData.front_camera ? "" : "Front camera is required!",
      chipset: formData.chipset ? "" : "Chipset is required!",
      gpu: formData.gpu ? "" : "GPU is required!",
      storage_capacity: formData.storage_capacity ? "" : "Storage capacity is required!",
      dimensions: formData.dimensions ? "" : "Dimensions is required!",
      weight: formData.weight ? "" : "Weight is required!",
      catalog: formData.catalog ? "" : "Catalog is required!"
    }
    setErrors(newErrors)

    if (Object.values(newErrors).some(error => error)) {
      return;
    }
    setLoading(true);
    if (id) {
      try {
        const response = await apiUpdateProduct(formData);
        if (response.status === 200) {
          history.push("/product");
          toastSuccess(response.message)
        } else {
          toastFailed(response.message)
        }
      } catch (e) {
        console.log(e);
        toastFailed("Update Product failed!")
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await apiCreateProduct(formData);
        if (response.status === 200) {
          history.push("/product");
          toastSuccess(response.message)
        } else {
          toastFailed(response.message)
        }
      } catch (e) {
        console.log(e);
        toastFailed("Create Product failed!")
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <ToastContainer />
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <FormInputText
                title={"Name"}
                isRequired={true}
                value={formData.name}
                handleBlur={handleBlur}
                keyField={"name"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </Col>
            <Col md={6} className="mb-3">
              <FormInputDate title={"Launch date"} isRequired={true} keyField={"launch_date"} formData={formData} setFormData={setFormData} />
              {errors.launch_date && <div className="text-danger">{errors.launch_date}</div>}
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="short_desc">
                <Form.Label>Short description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={formData.short_description}
                  onChange={(e) => handleOnChangeInput(e, "short_description")}
                  maxLength={100}
                  onBlur={() => handleBlur("short_description")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-3">
              <FormInputFloat
                title={"Price"}
                isRequired={true}
                value={formData.price}
                keyField={"price"}
                formData={formData}
                setFormData={setFormData}
              />
              {errors.price && <div className="text-danger">{errors.price}</div>}
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Product type"}
                isRequired={true}
                value={formData.product_type}
                handleBlur={handleBlur}
                keyField={"product_type"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
              {errors.product_type && <div className="text-danger">{errors.product_type}</div>}
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Color"}
                isRequired={true}
                value={formData.color}
                handleBlur={handleBlur}
                keyField={"color"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
              {errors.color && <div className="text-danger">{errors.color}</div>}
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mb-3">
              <FormInputFloat
                title={"Screen size"}
                isRequired={true}
                value={formData.screen_size}
                keyField={"screen_size"}
                formData={formData}
                setFormData={setFormData}
              />
              {errors.screen_size && <div className="text-danger">{errors.screen_size}</div>}
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Screen technology"}
                isRequired={false}
                value={formData.screen_technology}
                handleBlur={handleBlur}
                keyField={"screen_technology"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Resolution"}
                isRequired={false}
                value={formData.resolution}
                handleBlur={handleBlur}
                keyField={"resolution"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
            </Col>
          </Row>

          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="short_desc">
                <Form.Label>Screen features</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={formData.screen_features}
                  onChange={(e) => handleOnChangeInput(e, "screen_features")}
                  maxLength={100}
                  onBlur={() => handleBlur("screen_features")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Main camera"}
                isRequired={true}
                value={formData.main_camera}
                handleBlur={handleBlur}
                keyField={"main_camera"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
              {errors.main_camera && <div className="text-danger">{errors.main_camera}</div>}
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Video recording"}
                isRequired={false}
                value={formData.video_recording}
                handleBlur={handleBlur}
                keyField={"video_recording"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Camera features"}
                isRequired={false}
                value={formData.camera_features}
                handleBlur={handleBlur}
                keyField={"camera_features"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Front camera"}
                isRequired={true}
                value={formData.front_camera}
                handleBlur={handleBlur}
                keyField={"front_camera"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
              {errors.front_camera && <div className="text-danger">{errors.front_camera}</div>}
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Chipset"}
                isRequired={true}
                value={formData.chipset}
                handleBlur={handleBlur}
                keyField={"chipset"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
              {errors.chipset && <div className="text-danger">{errors.chipset}</div>}
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"GPU"}
                isRequired={true}
                value={formData.gpu}
                handleBlur={handleBlur}
                keyField={"gpu"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
              {errors.gpu && <div className="text-danger">{errors.gpu}</div>}
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Network support"}
                isRequired={false}
                value={formData.network_support}
                handleBlur={handleBlur}
                keyField={"network_support"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Storage capacity"}
                isRequired={true}
                value={formData.storage_capacity}
                handleBlur={handleBlur}
                keyField={"storage_capacity"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
              {errors.storage_capacity && <div className="text-danger">{errors.storage_capacity}</div>}
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Dimensions"}
                isRequired={true}
                value={formData.dimensions}
                handleBlur={handleBlur}
                keyField={"dimensions"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
              {errors.dimensions && <div className="text-danger">{errors.dimensions}</div>}
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Charging"}
                isRequired={false}
                value={formData.charging}
                handleBlur={handleBlur}
                keyField={"charging"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Wifi"}
                isRequired={false}
                value={formData.wifi}
                handleBlur={handleBlur}
                keyField={"wifi"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Bluetooth"}
                isRequired={false}
                value={formData.bluetooth}
                handleBlur={handleBlur}
                keyField={"bluetooth"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
            </Col>
          </Row>

          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="short_desc">
                <Form.Label>Security features</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={formData.security_features}
                  onChange={(e) => handleOnChangeInput(e, "security_features")}
                  maxLength={100}
                  onBlur={() => handleBlur("security_features")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="short_desc">
                <Form.Label>Other information</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={formData.other_info}
                  onChange={(e) => handleOnChangeInput(e, "other_info")}
                  maxLength={100}
                  onBlur={() => handleBlur("other_info")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12} className="mb-3 gallery">
              <ListGallery
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                listGallery={listGallery}
                setListGallery={setListGallery}
              />
            </Col>
          </Row>
          <Form.Label>Description</Form.Label>
          <Row>
            <Col sm={12} className="mb-3">
              <TinyMce
                handleChangeEditor={handleChangeEditor}
                data={formData.description}
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
                Update Product
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Create Product
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
