import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  apiCreateProduct,
  apiDetailProduct,
  apiUpdateProduct,
} from "../../services/product";
import { apiUploadImage } from "../../services/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import { useHistory, useParams } from "react-router-dom";
import { TinyMce } from "./catalog/TinyMce";
import { toastFailed, toastSuccess } from "../../utils";
import { ToastWarning } from "../common/Toast";

export const FormCreateProduct = ({
  formData
}) => {
  const history = useHistory();
  const { id } = useParams();
  const [effectShow, setEffectShow] = useState(true);
  const [isEmptyImages, setIsEmptyImages] = useState(false);
  const fileInputRef = useRef();

  //images when upload from devices
  const [images, setImages] = useState([]);
  const [imagesStorage, setImagesStorage] = useState([]);
  //Get the list containing the blob url when uploaded successfully
  const [shortDes, setShortDes] = useState("");
  const [quantity, setQuantity] = useState(undefined);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const [formContent, setFormContent] = useState({
    content: "",
  });

  const [titleError, setTitleError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [priceError, setPriceError] = useState("");

  const [loading, setLoading] = useState(false);
  const [listGallery, setListGallery] = useState([]);
  const [errorCount, setErrorCount] = useState(0);

  const getListGallery = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i].file);
      }
      const response = await apiUploadImage(formData);
      if (response.data.statusCode === 200) {
        setListGallery([...listGallery, ...response.data.data]);
        setImages([]);
        toastSuccess(response.message)
      } else {
        toastFailed(response.message)
      }
    } catch (e) {
      console.log(e);
      toastFailed("Something went wrong, please try again!")
    }
  };

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
    if (images.length !== 0) {
      getListGallery();
    }
  }, [images]);

  useEffect(() => {
    if (images.length === 0) {
      setIsEmptyImages(true);
    } else {
      setIsEmptyImages(false);
    }
  }, [images]);

  useEffect(() => {
    if (id) {
      getDetailProduct();
    }
  }, [id]);

  useEffect(() => {
    setEffectShow(false);
    setTimeout(() => {
      setEffectShow(true);
    }, 200); // Thời gian 0.5 giây (500 milliseconds)
  }, [isEmptyImages]);

  const handleChangeEditor = (value) => {
    const newForm = Object.assign(formContent);
    newForm.content = value;
    setFormContent(newForm);
  };

  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    const remainingSlots = 10 - listGallery.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);
    const selectedFilesCount = files.length;
    const totalFilesCount = listGallery.length + selectedFilesCount;

    if (totalFilesCount > 10 || listGallery.length + files.length > 10) {
      // Số lượng tệp đã chọn vượt quá 10
      // setMessageOfGallery("Only upload a maximum of 10 photos.");
      ToastWarning("Only upload a maximum of 10 photos!")
    }

    for (let i = 0; i < filesToAdd.length; i++) {
      const file = filesToAdd[i];

      if (file) {
        const maxSize = 3 * 1024 * 1024; // 3MB
        if (file?.size > maxSize) {
          // Kích thước vượt quá giới hạn
          toastFailed("Please upload photos smaller than 3MB.")
          setErrorCount((prevCount) => prevCount + 1);
          continue;
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
          continue;
        }
      }

      // if (file.type.split("/")[0] !== "image") continue;
      if (!imagesStorage.some((e) => e.name === file.name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: file.name,
            url: URL.createObjectURL(file),
            file: file,
          },
        ]);
        setImagesStorage((prevImages) => [
          ...prevImages,
          {
            name: file.name,
            url: URL.createObjectURL(file),
            file: file,
          },
        ]);
      }
    }
  }

  function deleteImage(index) {
    setListGallery((preListGallery) => {
      return preListGallery.filter((_, i) => i !== index);
    });
  }
  function onDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave(event) {
    event.preventDefault();
  }
  function onDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;

    const remainingSlots = 10 - listGallery.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    const selectedFilesCount = files.length;
    const totalFilesCount = listGallery.length + selectedFilesCount;
    if (totalFilesCount > 10 || listGallery.length + files.length > 10) {
      // Số lượng tệp đã chọn vượt quá 10
      // setMessageOfGallery("Only upload a maximum of 10 photos.");
      ToastWarning("Only upload a maximum of 10 photos!")
    }

    for (let i = 0; i < filesToAdd.length; i++) {
      const file = filesToAdd[i];

      if (file) {
        const maxSize = 3 * 1024 * 1024; // 3MB
        if (file?.size > maxSize) {
          // Kích thước vượt quá giới hạn
          toastFailed("Please upload photos smaller than 3MB.")
          setErrorCount((prevCount) => prevCount + 1);
          continue;
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
          continue;
        }
      }
      // if (file.type.split("/")[0] !== "image") continue;
      if (!imagesStorage.some((e) => e.name === file.name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: file.name,
            url: URL.createObjectURL(file),
            file: file,
          },
        ]);
        setImagesStorage((prevImages) => [
          ...prevImages,
          {
            name: file.name,
            url: URL.createObjectURL(file),
            file: file,
          },
        ]);
      }
    }
  }
  const handleRemoveAll = (e) => {
    e.preventDefault();
    setImages([]);
    setListGallery([]);
    setImagesStorage([]);
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
              <Form.Group id="title">
                <Form.Label>
                  Title <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setTitleError("");
                  }}
                  onBlur={(e) => {
                    if (title) {
                      setTitle(title.trim());
                    }
                  }}
                  maxLength={250}
                />
              </Form.Group>
              <div className="text-danger">{titleError}</div>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="short_desc">
                <Form.Label>Short description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={shortDes}
                  onChange={(e) => setShortDes(e.target.value)}
                  maxLength={100}
                  onBlur={(e) => {
                    if (shortDes) {
                      setShortDes(shortDes.trim());
                    }
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-3">
              <Form.Group id="price">
                <Form.Label>
                  Price <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={price}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const regex = /^\d+(\.\d*)?$/; // Biểu thức chính quy để kiểm tra số và dấu chấm chỉ xuất hiện 1 lần

                    if (inputValue === "" || regex.test(inputValue)) {
                      setPrice(inputValue);
                      setPriceError("");
                    }
                  }}
                />
                <div className="text-danger">{priceError}</div>
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="quantity">
                <Form.Label>
                  Quantity <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onKeyPress={(e) => {
                    const charCode = e.which || e.keyCode;
                    if (
                      charCode === 43 ||
                      charCode === 44 ||
                      charCode === 46 ||
                      charCode === 101 ||
                      charCode === 69 ||
                      charCode === 45
                    ) {
                      e.preventDefault(); // Ngăn chặn sự kiện nếu phím là dấu chấm, chữ cái "e", hoặc dấu "-"
                    }
                  }}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const sanitizedValue = inputValue.replace(/[^0-9]/g, ""); // Loại bỏ tất cả các ký tự không phải số

                    if (
                      !(sanitizedValue === "0" && inputValue.length === 1) &&
                      !sanitizedValue.includes("-") // Kiểm tra nếu giá trị đã xử lý không chứa dấu "-"
                    ) {
                      setQuantity(sanitizedValue);
                      setQuantityError("");
                    }
                  }}
                />
                <div className="text-danger">{quantityError}</div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3 gallery">
              <Form.Label>Gallery</Form.Label>
              {listGallery.length ? (
                <div style={{ float: "right" }}>
                  <button className="btn-remove" onClick={handleRemoveAll}>
                    Remove all
                  </button>
                  <input
                    name="file"
                    type="file"
                    className="file"
                    multiple
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={onFileSelect}
                    key={errorCount}
                  />
                  <button
                    className="btn-select"
                    onClick={(e) => {
                      e.preventDefault();
                      fileInputRef.current.click();
                    }}
                  >
                    Select files
                  </button>
                </div>
              ) : (
                ""
              )}

              {/* <div className="xl-avatar gallery-item">
                <Image fluid rounded src={sampleImage} />
              </div> */}
              <Card border="light" className="bg-white shadow-sm mb-4 mt-2">
                <Card.Body
                  className="upload_action text-center mt-3"
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                >
                  <div className="product-gallery">
                    {!listGallery.length ? (
                      <div className="mt-2">
                        <div className="d-flex justify-content-center align-items-center fw-bolder">
                          Drag and drop images file here.
                        </div>
                        <div className="text-center">Or</div>
                        <div className="text-center">
                          <div>
                            <input
                              name="file"
                              type="file"
                              className="file"
                              multiple
                              ref={fileInputRef}
                              style={{ display: "none" }}
                              onChange={onFileSelect}
                              key={errorCount}
                            />
                            <button
                              className="btn-select-files"
                              onClick={(e) => {
                                e.preventDefault();
                                fileInputRef.current.click();
                              }}
                            >
                              Select Files
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={
                          effectShow ? "canvas-visible" : "canvas-hidden"
                        }
                      >
                        <div className="images-show row">
                          {listGallery.map((image, index) => {
                            return (
                              <div
                                className="col-xl-2 col-lg-2 col-md-2 col-sm-2 image-item"
                                key={index}
                              >
                                <span
                                  className="delete fs-5"
                                  onClick={() => deleteImage(index)}
                                >
                                  <RiDeleteBin6Line />
                                </span>
                                <div>
                                  <img
                                    src={`${process.env.REACT_APP_IMAGE_URL}${image}`}
                                    alt="gallery"
                                    draggable="false"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Form.Label>Content</Form.Label>
          <Row>
            <Col sm={12} className="mb-3">
              <TinyMce
                handleChangeEditor={handleChangeEditor}
                data={formContent.content}
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
