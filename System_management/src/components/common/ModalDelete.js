import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Modal, Button } from "@themesberg/react-bootstrap";

const ModalDeleteItem = (props, ref) => {
    const [showModal, setShowModal] = useState(false);
    const { title, item, id, handleDeleteItem } = props;

    const close = () => setShowModal(false);
    const open = () => {
        setShowModal(true);
    };
    useImperativeHandle(ref, () => ({
        open,
        close,
    }));
    const handleClickDelete = () => {
        handleDeleteItem();
    };

    return (
        <>
            <Modal as={Modal.dialog} centered show={showModal} onHide={close}>
                <Modal.Header className="custom-header">
                    <div
                        className="d-flex justify-content-center align-items-center fs-4 fw-bold text-dark text-center w-100 "
                        id="title"
                    >
                        {title}
                    </div>
                    <Button
                        variant="close"
                        aria-label="Close"
                        onClick={close}
                    />
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <div className="w-100">
                            <div className="d-flex align-items-center justify-content-center pb-3">
                                Are you sure you want to delete this {item}?
                            </div>
                        </div>
                        <div className="d-flex justify-content-center pt-4">
                            <div className="w-100 button-container">
                                <Button
                                    className="w-100 text-white"
                                    variant="danger"
                                    onClick={() => handleClickDelete()}
                                >
                                    Delete
                                </Button>
                            </div>
                            <span className="icon-separator"></span>
                            <div className="w-100 px-2 button-container">
                                <Button
                                    className="w-100 float-end"
                                    variant="outline-primary"
                                    onClick={close}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};
export default forwardRef(ModalDeleteItem);
