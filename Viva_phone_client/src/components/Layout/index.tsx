import  Header  from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import ChatBot from "../Chatbot";

export const Layout = () => {

  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
};
