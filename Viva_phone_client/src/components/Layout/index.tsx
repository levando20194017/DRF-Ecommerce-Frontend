import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import ChatBot from "../Chatbot";
import ScrollToTop from "./ScrollToTop";
import { AnimatePresence, motion } from "framer-motion";

const pageTransition = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
  transition: { duration: 0.5 },
};

export const Layout = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Header />
      {/* <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
        > */}
      <Outlet />
      {/* </motion.main>
      </AnimatePresence> */}
      <Footer />
      <ChatBot />
    </>
  );
};
