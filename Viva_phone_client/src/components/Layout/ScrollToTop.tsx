import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if (location) {
      window.scrollTo(0, 0); // Chỉ cuộn lên khi `location` sẵn sàng
    }
  }, [location]);

  return null;
};

export default ScrollToTop;
