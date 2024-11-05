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
    newForm.content = value;
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
            <Col md={12} className="mb-3">
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
            <Col md={3} className="mb-3">
              <FormInputFloat
                title={"Price"}
                isRequired={true}
                value={formData.price}
                keyField={"price"}
                formData={formData}
                setFormData={setFormData}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3 gallery">
              <ListGallery
              />
            </Col>
          </Row>
          <Form.Label>Content</Form.Label>
          <Row>
            <Col sm={12} className="mb-3">
              <TinyMce
                handleChangeEditor={handleChangeEditor}
                data={formData.content}
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
