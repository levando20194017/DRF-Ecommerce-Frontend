import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import ChatBot from "../Chatbot";
import ScrollToTop from "./ScrollToTop";
import { useLoading } from "../../context/LoadingContext";
import PageLoader from "../../screens/PageLoading/PageLoading";

export const Layout = () => {
  const location = useLocation();
  const { isLoading } = useLoading();

  const [loaderVisible, setLoaderVisible] = useState(false);

  // Hiển thị PageLoader với độ trễ 0.5s khi loading xong
  useEffect(() => {
    if (isLoading) {
      setLoaderVisible(true);
    } else {
      const timer = setTimeout(() => {
        setLoaderVisible(false);
      }, 700); // Đảm bảo loader vẫn hiển thị thêm 0.5s sau khi isLoading = false
      return () => clearTimeout(timer); // Hủy timeout nếu component unmount
    }
  }, [isLoading]);

  return (
    <div>
      {loaderVisible && <PageLoader />} {/* Hiển thị loader khi loaderVisible là true */}
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
      <ChatBot />
    </div>
  );
};
