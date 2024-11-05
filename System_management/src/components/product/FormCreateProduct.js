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
  setFormData
}) => {
  const history = useHistory();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const getDetailProduct = async () => {
    try {
      const response = await apiDetailProduct(id);
      if (response.status === 200) {
        const data = response.data;
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


  const handleOnChangeInput = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value })
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
    setLoading(true);
    if (id) {
      try {
        const response = await apiUpdateProduct(formData);
        if (response.status === 200) {
          toastSuccess(response.message)
          history.push("/product");
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
          toastSuccess(response.message)
          history.push("/product");
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
              <div className="text-danger">{ }</div>
            </Col>
            <Col md={6} className="mb-3">
              <FormInputDate title={"Launch date"} isRequired={true} keyField={"launch_date"} formData={formData} setFormData={setFormData} />
              <div className="text-danger">{ }</div>
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
              <div className="text-danger">{ }</div>
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Color"}
                isRequired={false}
                value={formData.color}
                handleBlur={handleBlur}
                keyField={"color"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
              <div className="text-danger">{ }</div>
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Screen size"}
                isRequired={true}
                value={formData.screen_size}
                handleBlur={handleBlur}
                keyField={"screen_size"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
              <div className="text-danger">{ }</div>
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Screen technology"}
                isRequired={true}
                value={formData.screen_technology}
                handleBlur={handleBlur}
                keyField={"screen_technology"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
              <div className="text-danger">{ }</div>
            </Col>
            <Col md={4} className="mb-3">
              <FormInputText
                title={"Resolution"}
                isRequired={true}
                value={formData.resolution}
                handleBlur={handleBlur}
                keyField={"resolution"}
                formData={formData}
                setFormData={setFormData}
                maxLength={255} />
              <div className="text-danger">{ }</div>
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
              <div className="text-danger">{ }</div>
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
              <div className="text-danger">{ }</div>
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
              <div className="text-danger">{ }</div>
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
              <div className="text-danger">{ }</div>
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
              <div className="text-danger">{ }</div>
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
              <div className="text-danger">{ }</div>
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
              <div className="text-danger">{ }</div>
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
              <div className="text-danger">{ }</div>
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
              <div className="text-danger">{ }</div>
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
              <div className="text-danger">{ }</div>
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
              <div className="text-danger">{ }</div>
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
              <div className="text-danger">{ }</div>
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
