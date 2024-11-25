import React, { useState, useEffect } from "react";
import "./style.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import img1 from "../../assets/images/content.jpg";
import { Steps } from "antd";
export const OrderStatus = () => {
  const [visibleIcons, setVisibleIcons] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIcons((prevVisibleIcons) => {
        if (prevVisibleIcons < 3) {
          return prevVisibleIcons + 1;
        } else {
          return 0;
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);
  const description = 'This is a description.';
  const items = [
    {
      title: 'Đơn hàng đã được tạo',
      description: "Chờ xác nhận từ cửa hàng.",
    },
    {
      title: 'Xác nhận',
      description: "Chờ giao cho đơn vị vận chuyển",
    },
    {
      title: 'Giao cho đơn vị vận chuyển',
      description: "Đang giao hàng",
    },
    {
      title: 'Giao hàng thành công',
      description: "Cảm ơn quý khách đã mua hàng",
    },
  ];
  return (
    <div className="order-status">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12">
          <div
            className="card-stepper mt-5"
            style={{ borderRadius: "16px" }}
          >
            <div className="card-body p-5">
              {/* <div className="d-flex">
                <div className="icon-next col-2">
                  <i
                    className={`bi bi-chevron-right ${visibleIcons >= 1 ? "visible" : ""
                      }`}
                  ></i>
                  <i
                    className={`bi bi-chevron-right ${visibleIcons >= 2 ? "visible" : ""
                      }`}
                  ></i>
                  <i
                    className={`bi bi-chevron-right ${visibleIcons >= 3 ? "visible" : ""
                      }`}
                  ></i>
                </div>
              </div> */}
              <h5 className="d-flex justify-content-center aligns-item-center">
                Trạng thái đơn hàng
              </h5>
              <div className="mt-5">
                <Steps current={1} labelPlacement="vertical" items={items} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
