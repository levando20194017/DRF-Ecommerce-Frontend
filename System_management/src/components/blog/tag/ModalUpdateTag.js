import React, {
    useState,
    useImperativeHandle,
    forwardRef,
    useEffect,
} from "react";
import { Modal, Button } from "@themesberg/react-bootstrap";
import {
    apiUpdateTag,
    apiDetailTag,
} from "../../../services/tag";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import { toastFailed, toastSuccess } from "../../../utils";

const ModalUpdateTag = (props, ref) => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { title, tagId, handleGetListTags } = props;
    const [tagName, setTagName] = useState("");
    const [tagError, setTagError] = useState("");

    const handleDetailTag = async () => {
        if (tagId) {
            try {
                const response = await apiDetailTag(tagId);
                if (response.status === 200) {
                    setTagName(response.data.name);
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    const handleUpdateTag = async () => {
        if (!tagName) {
            setTagError("Tag Name is required!");
        } else {
            try {
                setLoading(true);
                const response = await apiUpdateTag({ id: tagId, name: tagName });
                if (response.status === 200) {
                    setShowModal(false);
                    handleGetListTags();
                    toastSuccess(response.message)
                } else {
                    toastFailed(response.message)
                }
            } catch (e) {
                console.log(e);
                toastFailed("Edit Tag failed!")
            } finally {
                setLoading(false);
            }
        }
    };
    useEffect(() => {
        handleDetailTag();
        setTagError("");
    }, [tagId, showModal]);

    const close = () => {
        setShowModal(false);
        if (!tagId) {
            setTagName("");
        }
    };
    const open = () => {
        setShowModal(true);
    };
    useImperativeHandle(ref, () => ({
        open,
        close,
    }));
    const handleSubmit = (e) => {
        e.preventDefault();
        if (tagId) {
            handleUpdateTag();
        }
    };
    return (
        <>
            <React.Fragment>
                <Modal
                    centered
                    show={showModal}
                    onHide={close}
                    className="modal-create"
                >
                    <Modal.Body>
                        <div className="d-flex align-items-center justify-content-end">
                            <Button variant="close" aria-label="Close" onClick={close} />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="w-100 modal-create-tag">
                                <h3 className="d-flex justify-content-center align-items-center fs-4 fw-bold text-header pb-3">
                                    {title}
                                </h3>
                                <div className="modal-create-tag__form pt-3">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="exampleInputPassword1"
                                            className="form-label text-color"
                                        >
                                            Tag Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="tag_name"
                                            placeholder="Enter tag name"
                                            value={tagName}
                                            onChange={(e) => {
                                                setTagName(e.target.value);
                                                setTagError("");
                                            }}
                                            maxLength={100}
                                        />
                                        {tagError && <div className="text-danger">{tagError}</div>}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center py-4">
                                    <Button
                                        className="w-75 float-end"
                                        variant="outline-primary"
                                        style={{ marginRight: "10px" }}
                                        onClick={close}
                                    >
                                        Cancel
                                    </Button>
                                    {loading ? (
                                        <div className="text-center w-75">
                                            <Spinner animation="border" variant="primary" />
                                        </div>
                                    ) : (
                                        <Button
                                            className="w-75 text-white background-primary"
                                            type="submit"
                                        >
                                            Update
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        </>
    );
};
export default forwardRef(ModalUpdateTag);
