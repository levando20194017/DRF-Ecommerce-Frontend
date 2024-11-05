import React, { useEffect, useRef, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Form, Card } from "@themesberg/react-bootstrap";
import { ToastFailed, ToastSuccess, ToastWarning } from "../common/Toast";
import { apiUploadImage } from "../../services/image";

export default () => {
    const [errorCount, setErrorCount] = useState(0);
    const [effectShow, setEffectShow] = useState(true);
    const [isEmptyImages, setIsEmptyImages] = useState(false);
    const [listGallery, setListGallery] = useState([]);
    const fileInputRef = useRef();

    //images when upload from devices
    const [images, setImages] = useState([]);
    const [imagesStorage, setImagesStorage] = useState([]);

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
        }

        for (let i = 0; i < filesToAdd.length; i++) {
            const file = filesToAdd[i];

            if (file) {
                const maxSize = 3 * 1024 * 1024; // 3MB
                if (file?.size > maxSize) {
                    // Kích thước vượt quá giới hạn
                    ToastFailed("Please upload photos smaller than 3MB.")
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
                    ToastFailed("Please select PNG, GIF or JPG file.")
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
                    ToastFailed("Please upload photos smaller than 3MB.")
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
                    ToastFailed("Please select PNG, GIF or JPG file.")
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
                ToastSuccess(response.message)
            } else {
                ToastFailed(response.message)
            }
        } catch (e) {
            console.log(e);
            ToastFailed("Something went wrong, please try again!")
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

    const handleRemoveAll = (e) => {
        e.preventDefault();
        setImages([]);
        setListGallery([]);
        setImagesStorage([]);
    };

    useEffect(() => {
        setEffectShow(false);
        setTimeout(() => {
            setEffectShow(true);
        }, 200); // Thời gian 0.5 giây (500 milliseconds)
    }, [isEmptyImages]);

    return (
        <>
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
        </>
    )
}