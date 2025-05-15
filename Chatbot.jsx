import { useState } from "react";
import { motion } from "framer-motion";
import { BsChatDots, BsX, BsArrowRepeat } from "react-icons/bs";
import "./Chatbot.css"; // Import external CSS file

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const BACKEND_URL = "http://localhost:8000";

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    if (userInput.toLowerCase() === "hi") {
      const botMessage = {
        role: "bot",
        content: "Hi, I'm Chat Assistant. How can I help you?",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setUserInput("");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userInput }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const botMessage = { role: "bot", content: data.result };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setUserInput("");
    } catch (error) {
      console.error("Error communicating with the chatbot backend:", error);
      const errorMessage = {
        role: "bot",
        content: "Sorry, something went wrong. Please try again later.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const retryChat = () => {
    setMessages([]);
    setUserInput("");
  };

  return (
    <div className="chatbot-container">
      <button
        className="chatbot-toggle-button"
        onClick={toggleChatbot}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <BsX size={24} /> : <BsChatDots size={24} />}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="chatbot-window"
        >
          <div className="chat-history">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${msg.role === "user" ? "user" : "bot"}`}
              >
                <span className={`message-bubble ${msg.role}`}>{msg.content}</span>
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button
              className="retry-button"
              onClick={retryChat}
              aria-label="Retry Chat"
            >
              <BsArrowRepeat size={18} />
            </button>
            <button
              className="send-button"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;