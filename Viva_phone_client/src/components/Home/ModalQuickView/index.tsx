import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import img1 from "../../../assets/images/content.jpg";
export const ModalQuickView = (props: any) => {
  const toggle = () => {
    props.toggleFromParent();
  };
  return (
    <Modal
      isOpen={props.isOpen}
      toggle={() => {
        toggle();
      }}
      className={"modal-user-container"}
      size="lg"
      centered
    >
      <ModalBody>
        <div className="modal-quick-view row">
          <div className="col-6">
            <img src={img1} />
          </div>
          <div className="col-6 item-detail">
            <h6 className="d-flex justify-content-center">Viva flower</h6>
            <hr />
            <div>
              {" "}
              <b>4.9</b>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>
            <div>
              <b>Category:</b> Viva flower
            </div>
            <div>
              <b>The remaining amount:</b> 225
            </div>
            <div>
              <b>Description:</b> Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Omnis dolores laudantium magnam rerum quae illo
              vel incidunt impedit blanditiis. Facilis distinctio fugiat ipsum
              soluta assumenda velit repellendus tempore molestiae cupiditate.
            </div>
            <div>
              <b>Price:</b> <b style={{ color: "red" }}>229.000đ</b>
            </div>
            <hr />
            <div className="text-secondary" style={{ fontSize: "13px" }}>
              <b style={{ color: "black" }}>Note:</b> Customer have to pay
              shipping fees <b style={{ color: "black" }}>5.000đ</b> for{" "}
              <b style={{ color: "black" }}>1 km</b>.
            </div>
            <div className="mt-4 d-flex justify-content-between">
              <div className="d-flex quantity">
                <span>Qty</span>
                <input type="number" className="form-control" />
              </div>
              <div className="button-add ">
                <button>
                  {" "}
                  <i className="bi bi-cart4"></i> Add to cart
                </button>
              </div>
              <div className="buy-now">
                <button>
                  <i className="bi bi-bag-heart-fill"></i> Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
