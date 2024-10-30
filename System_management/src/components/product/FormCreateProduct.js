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
import { listMaterials } from "../../enums";

export const FormCreateProduct = ({
  // status,
  catalog,
  promotion,
  labels,
  avtProduct,
  proType,
  setStatus,
  setCatalog,
  setAvtProduct,
  setLabels,
  setProType,
  setPromotion,
  mainAvatar,
  setMainAvatar,
  listProductType,
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
  const [memberPrice, setMemberPrice] = useState("");
  const [quantity, setQuantity] = useState(undefined);
  const [weight, setWeight] = useState("");
  const [diameter, setDiameter] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [material, setMaterial] = useState(listMaterials[0]);
  const [title, setTitle] = useState("");
  const [sku, setSku] = useState("");
  const [proCode, setProcode] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [price, setPrice] = useState("");
  const [priority, setPriority] = useState("");
  const [finishing, setFinishing] = useState("");
  const [countryOfIssue, setCountryOfIssue] = useState("");
  const [faceValue, setFaceValue] = useState("");
  const [specialEffects, setSpecialEffects] = useState("");
  const [mintage, setMintage] = useState("");
  const [year, setYear] = useState("");

  const [formContent, setFormContent] = useState({
    content: "",
  });

  const [titleError, setTitleError] = useState("");
  const [skuError, setSkuError] = useState("");
  const [proCodeError, setProCodeError] = useState("");
  const [partNumberError, setPartNumberError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [priceError, setPriceError] = useState("");

  const [loading, setLoading] = useState(false);
  const [listGallery, setListGallery] = useState([]);
  const [lengthOfListGallery, setLengthOfListGallery] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const getAvtProductLink = async () => {
    try {
      const formData = new FormData();
      formData.append("files", avtProduct.file);
      const response = await apiUploadImage(formData);
      if (response.data.statusCode === 200) {
        setMainAvatar(response.data.data);
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

  const getDetailProduct = async () => {
    try {
      const response = await apiDetailProduct(id);
      if (response.data.statusCode === 200) {
        const data = response.data.data;
        setShortDes(data.shortDescription ? data.shortDescription : "");
        setMemberPrice(data.memberPrice ? data.memberPrice : "");
        setQuantity(data.quantity);
        setWeight(data.weight ? data.weight : "");
        setDiameter(data.diameter ? data.diameter : "");
        setDimensions(data.dimensions);
        setTitle(data.name);
        setSku(data.sku);
        setProcode(data.code);
        setPartNumber(data.partNumber);
        setPrice(data.price);
        setPriority(data.priority ? data.priority : "");
        setFormContent({ content: data.description });
        setCatalog(data.catalogId);
        setLabels(data.label.split(","));
        setProType(data.productType);
        setPromotion(data.promotionId);
        setMaterial(data.material);
        setMainAvatar(data.imageUrl.split(","));
        setFinishing(data.finishing ? data.finishing : "");
        setCountryOfIssue(data.countryOfIssue ? data.countryOfIssue : "");
        setFaceValue(data.faceValue ? data.faceValue : "");
        setSpecialEffects(data.specialEffects ? data.specialEffects : "");
        setMintage(data.mintage ? data.mintage : "");
        setYear(data.year ? data.year : "");
        if (data.gallery) {
          setListGallery(data.gallery.split(","));
          setLengthOfListGallery(data.gallery.split(",").length);
        } else {
          setListGallery([]);
          setLengthOfListGallery(0);
        }
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
    if (avtProduct) {
      getAvtProductLink();
    }
  }, [avtProduct]);

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
    } else {
      setImages([]);
      setImagesStorage([]);
      setShortDes("");
      setMemberPrice("");
      setQuantity("");
      setWeight("");
      setDiameter("");
      setDimensions("");
      setTitle("");
      setSku("");
      setProcode("");
      setPartNumber("");
      setPrice("");
      setPriority("");
      setFormContent({ content: "" });
      setStatus("Published");
      setCatalog(1);
      setAvtProduct("");
      setLabels([]);
      setProType(listProductType[0]);
      setPromotion(1);
      setMaterial(listMaterials[0]);
      setListGallery([]);
      setLengthOfListGallery(0);
      setMainAvatar([]);
      setFinishing("");
      setCountryOfIssue("");
      setFaceValue("");
      setSpecialEffects("");
      setMintage("");
      setYear("");
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
      toast.warning(
        <span onClick={() => toast.dismiss()}>
          Only upload a maximum of 10 photos!
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

    for (let i = 0; i < filesToAdd.length; i++) {
      const file = filesToAdd[i];

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
    if (index - lengthOfListGallery >= 0) {
      setImagesStorage((images) => {
        return images.filter((_, i) => i !== index - lengthOfListGallery);
      });
    }
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
      toast.warning(
        <span onClick={() => toast.dismiss()}>
          Only upload a maximum of 10 photos!
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

    for (let i = 0; i < filesToAdd.length; i++) {
      const file = filesToAdd[i];

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

  const handleMaterialChange = (event) => {
    const selectedPromotion = event.target.value;
    setMaterial(selectedPromotion);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const dataSend = {
      sku,
      code: proCode,
      partNumber,
      catalogId: catalog,
      name: title,
      shortDescription: shortDes,
      description: formContent.content,
      productType: proType,
      promotionId: promotion,
      imageUrl: mainAvatar[0],
      price: parseFloat(price),
      memberPrice: parseFloat(memberPrice) ? parseFloat(memberPrice) : "",
      quantity: parseInt(quantity, 10),
      gallery: listGallery.length !== 0 ? listGallery.join(",") : "",
      weight: parseFloat(weight) ? parseFloat(weight) : "",
      diameter: parseFloat(diameter) ? parseFloat(diameter) : "",
      dimensions,
      material,
      label: labels.length !== 0 ? labels.join(",") : "",
      year: parseInt(year, 10) ? parseInt(year, 10) : "",
      mintage: parseInt(mintage, 10) ? parseInt(mintage, 10) : "",
      countryOfIssue,
      finishing,
      faceValue,
      specialEffects,
      priority: parseInt(priority, 10) ? parseInt(priority, 10) : "",
    };
    if (
      !price === "" ||
      title === "" ||
      !quantity ||
      sku === "" ||
      proCode === "" ||
      partNumber === ""
    ) {
      if (!price) {
        setPriceError("Price is required!");
      }
      if (title === "") {
        setTitleError("Title is required!");
      }
      if (!quantity) {
        setQuantityError("Quantity is required!");
      }
      if (sku === "") {
        setSkuError("SKU is required!");
      }
      if (proCode === "") {
        setProCodeError("Product Code is required!");
      }
      if (partNumber === "") {
        setPartNumberError("Part Number is required!");
      }
    } else {
      setLoading(true);
      if (id) {
        try {
          const response = await apiUpdateProduct(id, dataSend);
          if (response.data.statusCode === 200) {
            setTimeout(() => {
              toast.success(
                <span onClick={() => toast.dismiss()}>
                  Update Product successfully!
                </span>,
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                }
              );
            });
            history.push("/product");
          } else {
            if (
              response.data.statusCode === 400 &&
              response.data.message === "Get record with prameter not found."
            ) {
              toast.error(
                <span onClick={() => toast.dismiss()}>
                  This Product is not found!
                </span>,
                {
                  position: "top-right",
                  autoClose: 5000,
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
                <span onClick={() => toast.dismiss()}>
                  {" "}
                  Update Product failed!
                </span>,
                {
                  position: "top-right",
                  autoClose: 5000,
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
              {" "}
              Update Product failed!
            </span>,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const response = await apiCreateProduct(dataSend);
          if (response.data.statusCode === 200) {
            setTimeout(() => {
              toast.success(
                <span onClick={() => toast.dismiss()}>
                  Create Product successfully!
                </span>,
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                }
              );
            });
            history.push("/product");
          } else {
            if (response.data.statusCode === 400) {
              if (
                response.data.message ===
                "Product code already exist. Please type another product code."
              ) {
                setProCodeError("Product code is duplicated");
                toast.error(
                  <span onClick={() => toast.dismiss()}>
                    Product code is duplicated
                  </span>,
                  {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  }
                );
              }
              if (
                response.data.message ===
                "Product SKU already exist. Please type another product SKU."
              ) {
                setSkuError("SKU is duplicated");
                toast.error(
                  <span onClick={() => toast.dismiss()}>
                    SKU is duplicated
                  </span>,
                  {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  }
                );
              }
              if (
                response.data.message ===
                "Product part number already exist. Please type another product part number."
              ) {
                setPartNumberError("Part Number is duplicated");
                toast.error(
                  <span onClick={() => toast.dismiss()}>
                    Part Number is duplicated
                  </span>,
                  {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  }
                );
              }
            } else {
              toast.error(
                <span onClick={() => toast.dismiss()}>
                  Create Product failed!
                </span>,
                {
                  position: "top-right",
                  autoClose: 5000,
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
              {" "}
              Create Product failed!
            </span>,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        } finally {
          setLoading(false);
        }
      }
    }
  };
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <ToastContainer />
      <Card.Body>
        <Form onSubmit={handleCreateProduct}>
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
              <Form.Group id="SKU">
                <Form.Label>
                  SKU <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={sku}
                  onChange={(e) => {
                    setSku(e.target.value);
                    setSkuError("");
                  }}
                  onBlur={(e) => {
                    if (sku) {
                      setSku(sku.trim());
                    }
                  }}
                  maxLength={50}
                />
                <div className="text-danger">{skuError}</div>
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="code">
                <Form.Label>
                  Product Code <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={proCode}
                  onChange={(e) => {
                    setProcode(e.target.value);
                    setProCodeError("");
                  }}
                  onBlur={(e) => {
                    if (proCode) {
                      setProcode(proCode.trim());
                    }
                  }}
                  maxLength={50}
                />
                <div className="text-danger">{proCodeError}</div>
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="part_number">
                <Form.Label>
                  Part number <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={partNumber}
                  onChange={(e) => {
                    setPartNumber(e.target.value);
                    setPartNumberError("");
                  }}
                  onBlur={(e) => {
                    if (partNumber) {
                      setPartNumber(partNumber.trim());
                    }
                  }}
                  maxLength={50}
                />
                <div className="text-danger">{partNumberError}</div>
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
              <Form.Group id="member_price">
                <Form.Label>Member price</Form.Label>
                <Form.Control
                  type="text"
                  value={memberPrice}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const regex = /^\d+(\.\d*)?$/; // Biểu thức chính quy để kiểm tra số và dấu chấm chỉ xuất hiện 1 lần

                    if (inputValue === "" || regex.test(inputValue)) {
                      setMemberPrice(inputValue);
                    }
                  }}
                />
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
            <Col md={3} className="mb-3">
              <Form.Group id="quantity">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  type="number"
                  value={priority}
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
                      setPriority(sanitizedValue);
                    }
                  }}
                />
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
          <Row>
            <Col md={3} className="mb-3">
              <Form.Group id="weight">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="text"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                  maxLength={200}
                  onBlur={(e) => {
                    if (weight) {
                      setWeight(weight.trim());
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="diameter">
                <Form.Label>Diameter</Form.Label>
                <Form.Control
                  type="text"
                  value={diameter}
                  onChange={(e) => {
                    setDiameter(e.target.value);
                  }}
                  maxLength={200}
                  onBlur={(e) => {
                    if (diameter) {
                      setDiameter(diameter.trim());
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="dimensions">
                <Form.Label>Dimensions</Form.Label>
                <Form.Control
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  onBlur={(e) => {
                    if (dimensions) {
                      setDimensions(dimensions.trim());
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="material">
                <Form.Label>Material</Form.Label>
                <Form.Select value={material} onChange={handleMaterialChange}>
                  {listMaterials &&
                    listMaterials.map((material) => {
                      return <option value={material}>{material}</option>;
                    })}
                </Form.Select>
              </Form.Group>

              {/* <div>
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
                  </div> */}
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-3">
              <Form.Group id="finishing">
                <Form.Label>Finishing</Form.Label>
                <Form.Control
                  type="text"
                  value={finishing}
                  onChange={(e) => setFinishing(e.target.value)}
                  onBlur={(e) => {
                    if (finishing) {
                      setFinishing(finishing.trim());
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="countryOfIssue">
                <Form.Label>Country Of Issue</Form.Label>
                <Form.Control
                  type="text"
                  value={countryOfIssue}
                  onChange={(e) => setCountryOfIssue(e.target.value)}
                  onBlur={(e) => {
                    if (countryOfIssue) {
                      setCountryOfIssue(countryOfIssue.trim());
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="faceValue">
                <Form.Label>Face Value</Form.Label>
                <Form.Control
                  type="text"
                  value={faceValue}
                  onChange={(e) => setFaceValue(e.target.value)}
                  onBlur={(e) => {
                    if (faceValue) {
                      setFaceValue(faceValue.trim());
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="specialEffects">
                <Form.Label>Special Effects</Form.Label>
                <Form.Control
                  type="text"
                  value={specialEffects}
                  onChange={(e) => setSpecialEffects(e.target.value)}
                  onBlur={(e) => {
                    if (specialEffects) {
                      setSpecialEffects(specialEffects.trim());
                    }
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-3">
              <Form.Group id="mintage">
                <Form.Label>Mintage</Form.Label>
                <Form.Control
                  type="number"
                  value={mintage}
                  onKeyPress={(e) => {
                    const charCode = e.which || e.keyCode;
                    if (
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
                      setMintage(sanitizedValue);
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="year">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  value={year}
                  onKeyPress={(e) => {
                    const charCode = e.which || e.keyCode;
                    if (
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
                      setYear(sanitizedValue);
                    }
                  }}
                />
              </Form.Group>
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
