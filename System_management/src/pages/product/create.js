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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changeTextToThreeDot } from "../../utils";
import { listProductType } from "../../enums";
import { useMsal} from '@azure/msal-react';

export default () => {
  const [status, setStatus] = useState("Published");
  const [listCatalogs, setListCatalogs] = useState([]);
  const [listPromotions, setListPromotions] = useState([]);
  const [catalog, setCatalog] = useState(1);
  const [promotion, setPromotion] = useState(1);
  const [labels, setLabels] = useState([]);
  const [avtProduct, setAvtProduct] = useState("");
  const [proType, setProType] = useState(listProductType[0]);
  const [mainAvatar, setMainAvatar] = useState([]);
  const [errorCount, setErrorCount] = useState(0);
  const { instance,  accounts} = useMsal();

  const { id } = useParams();

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
        PageIndex: 1,
        PageSize: 1000,
        parentId: "",
        token: accounts[0].idToken
      };
      const response = await apiGetListCatalogs(params);
      if (response?.data.statusCode === status.SUCCESS)
        setListCatalogs(response?.data?.data?.source);
      setListCatalogs(flattenArray(response?.data?.data?.source));
    } catch (e) {
      console.log(e);
    }
  };

  const flattenArray = (tree, level = 0) => {
    const flatArray = [];

    for (const item of tree) {
      flatArray.push(item);

      if (item.subCatalogs.length > 0) {
        flatArray.push(...flattenArray(item.subCatalogs));
      }
    }

    return flatArray;
  };

  const handleGetListPromotions = async () => {
    try {
      const response = await apiGetListPromotions({
        PageIndex: 1,
        PageSize: 1000,
      });
      if (response.data.statusCode === 200) {
        setListPromotions(response.data.data.source);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleGetListCatalogs();
    handleGetListPromotions();
  }, []);

  // const handleStatusChange = (event) => {
  //   const selectedStatus = event.target.value;
  //   setStatus(selectedStatus);
  // };
  const handleCatalogChange = (event) => {
    const selectedCatalog = event.target.value;
    setCatalog(selectedCatalog);
  };

  const handlePromotionChange = (event) => {
    const selectedPromotion = event.target.value;
    setPromotion(selectedPromotion);
  };
  const handleProductTypeChange = (event) => {
    const selectedProType = event.target.value;
    setProType(selectedProType);
  };

  const handleLabelChange = (event) => {
    const { value } = event.target;
    let updatedSelectedLabels = [...labels];

    if (updatedSelectedLabels.includes(value)) {
      updatedSelectedLabels = updatedSelectedLabels.filter(
        (labelSelected) => labelSelected !== value
      );
    } else {
      updatedSelectedLabels.push(value);
    }

    setLabels(updatedSelectedLabels);
  };
  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
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
          <FormCreateProduct
            status={status}
            catalog={catalog}
            labels={labels}
            avtProduct={avtProduct}
            promotion={promotion}
            proType={proType}
            setStatus={setStatus}
            setListCatalogs={setListCatalogs}
            setCatalog={setCatalog}
            setAvtProduct={setAvtProduct}
            setLabels={setLabels}
            setListPromotions={setListPromotions}
            setProType={setProType}
            setPromotion={setPromotion}
            mainAvatar={mainAvatar}
            setMainAvatar={setMainAvatar}
            listProductType={listProductType}
          />
        </Col>

        <Col xs={12} xl={3}>
          <Row>
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <div className="d-xl-flex flex-column align-items-center d-">
                    <div className="xl-avatar">
                      {mainAvatar.length !== 0 ? (
                        <Image
                          fluid
                          rounded
                          src={`${process.env.REACT_APP_IMAGE_URL}${mainAvatar[0]}`}
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
                  <div>
                    <Form.Group id="promotion">
                      <Form.Select
                        value={proType}
                        onChange={handleProductTypeChange}
                      >
                        {listProductType &&
                          listProductType.map((protype) => {
                            return <option value={protype}>{protype}</option>;
                          })}
                      </Form.Select>
                    </Form.Group>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {/* <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <p className="mb-4">Status</p>
                  <div>
                    <Form.Group id="status">
                      <Form.Select value={status} onChange={handleStatusChange}>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </Card.Body>
              </Card>
            </Col> */}
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <Form.Label>
                    Catalog <span className="text-danger">*</span>
                  </Form.Label>
                  <div>
                    <Form.Group id="category">
                      <Form.Select
                        value={catalog}
                        onChange={handleCatalogChange}
                      >
                        {listCatalogs.length > 0 &&
                          listCatalogs.map((catalog) => (
                            <option value={catalog.id}>
                              {catalog.level === 0
                                ? changeTextToThreeDot(catalog.name, 20)
                                : catalog.level === 1
                                ? "\u00A0\u00A0\u00A0\u00A0" +
                                  changeTextToThreeDot(catalog.name, 20)
                                : "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0" +
                                  changeTextToThreeDot(catalog.name, 20)}
                            </option>
                          ))}
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
                    Promotion <span className="text-danger">*</span>
                  </Form.Label>
                  <div>
                    <Form.Group id="promotion">
                      <Form.Select
                        value={promotion}
                        onChange={handlePromotionChange}
                      >
                        {listPromotions &&
                          listPromotions.map((promotion) => {
                            return (
                              <option value={promotion.id}>
                                {promotion.name}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </Form.Group>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <Form.Label>Labels</Form.Label>
                  <div>
                    <Form.Group id="label">
                      <Form.Check
                        label="New arrival"
                        id="new_arrival"
                        htmlFor="new_arrival"
                        value="New arrival"
                        onChange={handleLabelChange}
                        checked={labels.includes("New arrival")}
                      />
                      <Form.Check
                        label="Sale"
                        id="sale"
                        htmlFor="sale"
                        value="Sale"
                        onChange={handleLabelChange}
                        checked={labels.includes("Sale")}
                      />
                      <Form.Check
                        label="Special Offer"
                        id="special_offer"
                        htmlFor="special_offer"
                        onChange={handleLabelChange}
                        value="Special Offer"
                        checked={labels.includes("Special Offer")}
                      />
                    </Form.Group>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {/* <Col xs={12}>
                            <ChooseTagWidget title="Tags" />
                        </Col> */}
          </Row>
        </Col>
      </Row>
    </>
  );
};
