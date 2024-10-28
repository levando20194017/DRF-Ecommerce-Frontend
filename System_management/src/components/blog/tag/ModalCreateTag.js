import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { Modal, Button } from "@themesberg/react-bootstrap";
import {
  apiCreateTag,
  apiUpdateTag,
  apiDetailTag,
} from "../../../services/tag";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
// const status = ["Draft", "Publish"];

const ModalCreateTag = (props, ref) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { title, save, tagId, handleGetListTags, allTags } = props;
  const [tagName, setTagName] = useState("");
  const [tagError, setTagError] = useState("");

  const handleDetailTag = async () => {
    if (tagId) {
      try {
        const response = await apiDetailTag(tagId);
        if (response.data.statusCode === 200) {
          setTagName(response.data.data.name);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleCreateTag = async () => {
    if (!tagName) {
      setTagError("Tag Name is required!");
    } else {
      if (allTags.find((tag) => tag.name === tagName.trim())) {
        toast.error(
          <span onClick={() => toast.dismiss()}>Tag name is duplicated!</span>,
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
        setLoading(true);
        try {
          const response = await apiCreateTag({ name: tagName.trim() });
          if (response.data.statusCode === 200) {
            setShowModal(false);
            setTagName("");
            handleGetListTags();
            toast.success(
              <span onClick={() => toast.dismiss()}>
                Create Tag successfully!
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
              <span onClick={() => toast.dismiss()}>Create Tag failed!</span>,
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
            <span onClick={() => toast.dismiss()}>Create Tag failed!</span>,
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
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleUpdateTag = async () => {
    if (!tagName) {
      setTagError("Tag Name is required!");
    } else {
      if (allTags.find((tag) => tag.name === tagName.trim())) {
        toast.error(
          <span onClick={() => toast.dismiss()}>Tag name is duplicated!</span>,
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
        setLoading(true);
        try {
          const response = await apiUpdateTag(tagId, { name: tagName.trim() });
          if (response.data.statusCode === 200) {
            if (response.data.message === "Tag is not found") {
              toast.error(
                <span onClick={() => toast.dismiss()}>
                  This Tag is not found!
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
              setShowModal(false);
              handleGetListTags();
              toast.success(
                <span onClick={() => toast.dismiss()}>
                  Edit Tag successfully!
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
          } else {
            toast.error(
              <span onClick={() => toast.dismiss()}>Edit Tag failed!</span>,
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
            <span onClick={() => toast.dismiss()}>Edit Tag failed!</span>,
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
        } finally {
          setLoading(false);
        }
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
    } else {
      handleCreateTag();
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
                  {/* <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label text-color"
                        >
                          Status
                        </label>
                        <Field
                          as="select"
                          name="category"
                          className="form-control"
                        >
                          {status.map((item, index) => (
                            <option value={index} key={index}>
                              {item}
                            </option>
                          ))}
                        </Field>
                        {errors.category && touched.category ? (
                          <div className="text-danger py-2">
                            {errors.category}
                          </div>
                        ) : null}
                      </div> */}
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
                      variant="secondary"
                      type="submit"
                    >
                      {save ?? "Create"}
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
