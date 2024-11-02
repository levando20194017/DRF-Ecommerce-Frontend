import React, {
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Modal, Button } from "@themesberg/react-bootstrap";
import {
  apiCreateTag,
} from "../../../services/tag";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import { toastFailed, toastSuccess } from "../../../utils";

const ModalCreateTag = (props, ref) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { title, handleGetListTags } = props;
  const [tagName, setTagName] = useState("");
  const [tagError, setTagError] = useState("");

  const handleCreateTag = async () => {
    if (!tagName) {
      setTagError("Tag Name is required!");
    } else {
      try {
        setLoading(true);
        const response = await apiCreateTag({ name: tagName.trim() });
        if (response.status === 200) {
          setShowModal(false);
          setTagName("");
          handleGetListTags();
          toastSuccess(response.message)
        } else {
          toastFailed(response.message)
        }
      } catch (e) {
        console.log(e);
        toastFailed("Create Tag failed!")
      } finally {
        setLoading(false);
      }
    }
  };
  const close = () => {
    setShowModal(false);
    setTagName("");
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
    handleCreateTag();
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
                      Create
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
export default forwardRef(ModalCreateTag);
