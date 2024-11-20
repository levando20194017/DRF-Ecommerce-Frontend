import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Card, Form, Button, Image } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import CatalogImage from "../../../assets/img/no-image.png";
import { apiGetListCatalogsWithNoDeleted, apiUploadImage } from "../../../services/catalog";
import { TinyMce } from "./TinyMce";
import { changeTextToThreeDot, toastFailed, toastSuccess } from "../../../utils";
import { ToastContainer } from "react-toastify";
import { TreeSelect } from "antd";

export const CreateCatalog = (props) => {
    const { handleCreateCatalog } = props

    const [form, setForm] = useState({
        name: '',
        description: '',
        image: '',
        parent_id: ''
    })
    const [error, setError] = useState('')
    const [errorImage, setErrorImage] = useState('')
    const [currentImage, setCurrentImage] = useState('')
    const [errorCount, setErrorCount] = useState(0);
    const [treeData, setTreeData] = useState([]);

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

    const handleInput = (e) => {
        setError('')
        const { name, value } = e.target
        const newForm = { ...form, [name]: value }
        setForm(newForm)
    }

    const isValidFileUploaded = (file) => {
        if (file) {
            const validExtensions = ['png', 'jpeg', 'jpg', 'gif']
            const fileExtension = file.type.split('/')[1]
            return validExtensions.includes(fileExtension)
        }
    }

    const validateInput = () => {
        if (form.name === '') {
            setError('Name is required')
        }
        if (form.name.length > 100) {
            setError('Name is less than 100 characters')
        }
    }

    const handleSubmit = () => {
        validateInput()
        handleCreateCatalog(form)
    }
    const handleChooseFile = (e) => {
        const maxSize = 3 * 1024 * 1024;
        if (!isValidFileUploaded(e.target.files[0])) {
            toastFailed('Please select PNG, GIF or JPG file.')
            setCurrentImage(CatalogImage)
            setForm({ ...form, image: '' })
            setErrorCount((prevCount) => prevCount + 1);
        } else if (e.target.files[0]?.size > maxSize) {
            toastFailed('Please upload photos smaller than 3MB.')
            setCurrentImage(CatalogImage)
            setForm({ ...form, image: '' })
            setErrorCount((prevCount) => prevCount + 1);
        } else {
            setCurrentImage(URL.createObjectURL(e.target.files[0]))
            setErrorImage('')
            handleUploadImage(e.target.files[0])

        }
    }
    const handleUploadImage = async (file) => {
        try {
            let formData = new FormData()
            formData.append('file', file)
            const response = await apiUploadImage(formData)
            if (response.status === 200) {
                setForm({ ...form, image: response.img_url })
                toastSuccess('Upload Image successfully', '')
            } else {
                toastFailed(response?.message)
            }
        } catch (e) {
            setCurrentImage('')
            toastFailed('Something went wrong, please try again !')
        }
    }

    const handleClickInput = () => {
        setErrorImage('')
    }

    const handleChangeEditor = (value) => {
        setForm({ ...form, description: value })
    }

    const onChange = (newValue) => {
        setForm({ ...form, parent_id: newValue })
    };

    const getListCatalogs = async () => {
        try {
            const response = await apiGetListCatalogsWithNoDeleted({ pageIndex: 1, pageSize: 10000, textSearch: "" })
            if (response.status === 200) {
                const mappedData = mapCatalogToTreeData(response.data.data); // Gọi hàm mapping
                setTreeData(mappedData);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getListCatalogs()
    }, [])

    return (
        <>
            <ToastContainer />
            <Col xs={12} xl={9}>
                <Card border="light" className="bg-white shadow-sm mb-4">
                    <Card.Body>
                        <Form>
                            <Row>
                                <Col md={12} className="mb-3">
                                    <Form.Group id="catalog_name">
                                        <Form.Label>Name<span className="text-danger"
                                            style={{ paddingLeft: "1px" }}>*</span></Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            maxLength={100}
                                            name="name"
                                            placeholder="Enter Catalog Name"
                                            onChange={(e) => handleInput(e)}
                                        />
                                        {
                                            error ? (<div className="text-danger">{error}</div>) : <></>
                                        }
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Label>Description</Form.Label>
                            <Row>
                                <Col sm={12} className="mb-3">
                                    <TinyMce
                                        handleChangeEditor={handleChangeEditor}
                                    />
                                </Col>
                            </Row>
                            <div className="mt-3">
                                <Button variant="primary" onClick={() => handleSubmit()}>
                                    Create Catalog
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} xl={3}>
                <Row>
                    <Col xs={12}>
                        <Card
                            border="light"
                            className="bg-white shadow-sm mb-4"
                        >
                            <Card.Body>
                                <div className="d-xl-flex flex-column align-items-center d-">
                                    <div className="xl-avatar">
                                        <Image
                                            fluid
                                            rounded
                                            src={currentImage ? currentImage : CatalogImage}
                                        />
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
                                                <input key={errorCount} type="file" onClick={() => handleClickInput()}
                                                    onChange={(e) => handleChooseFile(e)} />
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
                                        {
                                            errorImage ? (<div className="text-danger">{errorImage}</div>) : <></>
                                        }
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12}>
                        <Card border="light" className="bg-white shadow-sm mb-4">
                            <Card.Body>
                                <Form.Label>
                                    Catalog
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
                                            treeData={treeData}
                                            placeholder="Please select"
                                            treeDefaultExpandAll
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </>
    );
};
