import "../style.scss";
import "animate.css";
import { useSpring, animated } from "@react-spring/web";
import ImageBanner from "../../../assets/images/header_image.png"
import React, { useState, useEffect } from "react";
export const HomeBanner = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [state, toggle] = useState(true);
  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 },
  });
  return (
    <div>
      <div className="home-banner">
        <div className="text-center">
          <div className="brand_intro1">
            <h2>Chào mừng bạn đến với <span style={{ color: "#ff652f" }}>VIVA PHONE</span> – Điểm đến lý tưởng cho tín đồ công nghệ!</h2>
          </div>
          <div className="brand_intro2">
            <div>Khám phá điện thoại chính hãng, giá tốt, cùng dịch vụ tận tâm ngay hôm nay!</div>
          </div>
          <div className="home-banner_button mt-5">
            <div className="container" onClick={() => toggle(!state)}>
              <animated.div
                className="text"
                style={{
                  scale: x.to({
                    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                    output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                  }),
                }}
              >
                <button
                  className={`contact-button ${isAnimating ? "animating" : ""}`}
                >
                  Liên hệ ngay
                </button>
              </animated.div>
            </div>
          </div>
        </div>
        <div>
          <img src={ImageBanner} />
        </div>
      </div>
    </div>
  );
};
