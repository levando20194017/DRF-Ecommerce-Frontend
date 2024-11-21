import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";
import { Input } from "antd";
import { IoMdClose } from "react-icons/io";
const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Điều khiển mở/đóng chatbox
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]); // Danh sách tin nhắn
  const [input, setInput] = useState(""); // Giá trị input từ người dùng
  const [isTyping, setIsTyping] = useState(false); // Hiển thị trạng thái đang trả lời
  const chatContainerRef = useRef<HTMLDivElement>(null); // Tham chiếu tới container chat

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = { sender: "bot", text: "Xin chào, tôi có thể giúp gì cho bạn?" };
      setMessages([welcomeMessage]); // Thêm tin nhắn chào mừng vào danh sách
    }
  }, [isOpen]);

  // Cuộn xuống dưới khi có tin nhắn mới
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Hàm gửi tin nhắn
  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Thêm tin nhắn người dùng vào danh sách
    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput(""); // Reset ô nhập

    // Hiển thị hiệu ứng "Đang trả lời"
    setIsTyping(true);

    try {
      // Gửi API đến server
      const response = await fetch(`${process.env.REACT_APP_API_CHAT_BOT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            parts: [
              {
                text: input, // Truyền nội dung người dùng vào payload
              },
            ],
          },
        ]),
      });

      // Kiểm tra phản hồi từ server
      const data = await response.json();

      // Giả sử server trả về mảng phản hồi trong trường `text`
      const botMessage = {
        sender: "bot",
        text: data?.parts[0]?.text || "Xin lỗi, tôi không thể trả lời câu hỏi này.",
      };

      // Thêm tin nhắn bot vào danh sách
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { sender: "bot", text: "Đã xảy ra lỗi. Vui lòng thử lại sau!" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false); // Tắt hiệu ứng "Đang trả lời"
    }
  };

  // Xử lý nhấn phím Enter để gửi tin nhắn
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const variants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
      {/* Nút mở/đóng chatbox */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "#FF6600",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
      >
        <FiMessageCircle size={28} color="white" />
      </button>

      {/* Chatbox hiển thị với hiệu ứng */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          bottom: "80px",
          right: "0",
          width: "400px",
          height: "500px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#FF6600",
            padding: "10px",
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            position:"relative"
          }}
        >
            <div>Hỗ trợ khách hàng</div>
            <span className="cursor-pointer" style={{position:"absolute", right:"10px", bottom:"10px"}}  onClick={() => setIsOpen(false)}><IoMdClose style={{fontSize:"20px"}}/></span>
        </div>

        <div
            ref={chatContainerRef}
            style={{
                flex: 1,
                padding: "10px",
                overflowY: "auto",
                fontSize: "14px",
                display: "flex",
                flexDirection: "column",
            }}
            >
            {/* Hiển thị danh sách tin nhắn */}
            {messages.map((msg, index) => (
                <div
                key={index}
                style={{
                    display: "flex",
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                    marginBottom: "10px",
                }}
                >
                <span
                    style={{
                    padding: "8px 12px",
                    borderRadius: "15px",
                    backgroundColor: msg.sender === "user" ? "#FF6600" : "#f1f1f1",
                    color: msg.sender === "user" ? "white" : "black",
                    maxWidth: "70%",
                    wordWrap: "break-word",
                    }}
                >
                {msg.text.split(" ").map((el, i) => (
                    <motion.span
                    key={`${el}-${i}`}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    transition={{
                        duration: 0.2, // Hiệu ứng mỗi chữ lâu hơn
                        delay: i / 8, // Tăng khoảng cách giữa các chữ
                    }}
                    className="word"
                    >
                    {el}{" "}
                    </motion.span>
                ))}
                </span>
                </div>
            ))}

        {isTyping && (
            <div
            style={{
                textAlign: "left",
                marginTop: "10px",
            }}
            >
            <span
                style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "15px",
                backgroundColor: "#f1f1f1",
                color: "black",
                fontStyle: "italic",
                }}
            >
                Đang trả lời...
            </span>
            </div>
        )}
        </div>

        <div
          style={{
            borderTop: "1px solid #ddd",
            padding: "10px",
            display: "flex",
            gap: "5px",
          }}
        >
          <Input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "5px",
              fontSize: "14px",
              color:"black"
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              backgroundColor: "#FF6600",
              border: "none",
              borderRadius: "5px",
              color: "white",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Gửi
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatBot;
