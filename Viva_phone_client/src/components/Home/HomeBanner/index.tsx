import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import "../style.scss";

const videoSource: string = require("../../../assets/video/videoBanner.mp4");

export const HomeBanner = () => {
  const textTitle =
    "Chào mừng bạn đến với VIVA PHONE - Điểm đến lý tưởng cho tín đồ công nghệ!".split(
      " "
    );
  const textDes =
    "Khám phá điện thoại chính hãng, giá tốt, cùng dịch vụ tận tâm ngay hôm nay!".split(
      " "
    );

  const [reset, setReset] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setReset(true);

      setTimeout(() => setReset(false), 10); // Reset animation ngay lập tức
      setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [state, toggle] = useState(true);

  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 },
  });

  const variants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="home-banner">
      <div className="frame-banner">
        <div className="content">
          <div className="brand_intro1">
            <h2>
              {textTitle.map((el, i) => (
                <motion.span
                  key={`${el}-${i}-${reset}`}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  transition={{
                    duration: 0.35, // Hiệu ứng mỗi chữ lâu hơn
                    delay: i / 8, // Tăng khoảng cách giữa các chữ
                  }}
                  className="word"
                >
                  {el}{" "}
                </motion.span>
              ))}
            </h2>
          </div>
          <div className="brand_intro2">
            <p>
              {textDes.map((el, i) => (
                <motion.span
                  key={`${el}-${i}-${reset}`}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  transition={{
                    duration: 0.35, // Hiệu ứng mỗi chữ lâu hơn
                    delay: i / 8, // Tăng khoảng cách giữa các chữ
                  }}
                  className="word"
                >
                  {el}{" "}
                </motion.span>
              ))}
            </p>
          </div>
        </div>

        {/* Animated Button */}
        <div className="home-banner_button">
          <div
            className="container"
            onClick={() => {
              toggle(!state);
            }}
          >
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
  );
};
