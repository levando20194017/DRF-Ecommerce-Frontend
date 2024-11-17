import React, { useState, useEffect } from "react";
import "../style.scss";
import "animate.css";
import { useSpring, animated } from "@react-spring/web";
import { motion } from "framer-motion";
const videoSource: string = require("../../../assets/video/videoBanner.mp4");

export const HomeBanner = () => {
  const textTitle = "Chào mừng bạn đến với VIVA PHONE - Điểm đến lý tưởng cho tín đồ công nghệ!".split(" ");
  const textDes = "Khám phá điện thoại chính hãng, giá tốt, cùng dịch vụ tận tâm ngay hôm nay!".split(" ");

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
        <div className="frame-banner">
          <div className="brand_intro1">
            <h2>
              {/* Chào mừng bạn đến với{" "}
              <span style={{ color: "#ff652f", fontFamily: "Tektur" }} >VIVA PHONE</span> – Điểm đến
              lý tưởng cho tín đồ công nghệ! */}
              {textTitle.map((el, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: i / 10,
                  }}
                  key={i}
                >
                  {el}{" "}
                </motion.span>
              ))}
            </h2>
          </div>
          <div className="brand_intro2">
            {/* <div>
              Khám phá điện thoại chính hãng, giá tốt, cùng dịch vụ tận tâm ngay
              hôm nay!
            </div> */}
            {textDes.map((el, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.25,
                  delay: i / 10,
                }}
                key={i}
              >
                {el}{" "}
              </motion.span>
            ))}
          </div>
          <div className="home-banner_button">
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
        {/* <div className="">
          <div className="brand_intro1">
            <h2>
              Chào mừng bạn đến với{" "}
              <span style={{ color: "#ff652f" }}>VIVA PHONE</span> – Điểm đến
              lý tưởng cho tín đồ công nghệ!
            </h2>
          </div>
          <div className="brand_intro2">
            <div>
              Khám phá điện thoại chính hãng, giá tốt, cùng dịch vụ tận tâm ngay
              hôm nay!
            </div>
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
        </div> */}
        <div>
          <video
            src={videoSource}
            autoPlay
            loop
            muted
            preload="auto"
            className="video-banner"
          />
        </div>
      </div>
    </div>
  );
};
