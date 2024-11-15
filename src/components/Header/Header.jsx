import React, { useState, useEffect } from "react";
import SignupForm from "../Signup/Signup";
import LoginForm from "../Login/Login";
import { account } from "../../appwrite/appwriteConfig";
import { Link, NavLink } from "react-router-dom";

export default function MainComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // Toggles between login and signup forms
  const [showChatbot, setShowChatbot] = useState(false); // Toggles chatbot modal

  // Check if user is authenticated on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await account.get(); // Get current user session
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false); // If not authenticated, set to false
      }
    };
    checkAuthStatus();
  }, []);

  // Handle authentication success
  const handleAuthSuccess = (user) => {
    setIsAuthenticated(true);
    setShowModal(false);
  };

  // Handle click on AI Help
  const handleAIHelpClick = () => {
    setShowChatbot(true); // Open chatbot modal
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo Section */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" className="mr-3 h-14" alt="Logo" />
          </Link>

          {/* Centered Navigation Links */}
          <div className="flex justify-center flex-grow space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${
                  isActive ? "text-orange-700" : "text-gray-700"
                } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/restraunts"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${
                  isActive ? "text-orange-700" : "text-gray-700"
                } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              Restaurant
            </NavLink>
            <NavLink
              to="/dishes"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${
                  isActive ? "text-orange-700" : "text-gray-700"
                } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              Dishes
            </NavLink>
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${
                  isActive ? "text-orange-700" : "text-gray-700"
                } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              Contact Us
            </NavLink>
            <button
              onClick={handleAIHelpClick}
              className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
            >
              AI Help
            </button>
          </div>

          {/* Right-aligned Sign Up and Login Buttons */}
          <div className="absolute top-4 right-4 flex space-x-4">
            {!isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setShowLogin(false);
                  }}
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setShowLogin(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Sign Up / Login Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            {showLogin ? (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Login
                </h2>
                <LoginForm
                  closeModal={() => setShowModal(false)}
                  onLoginSuccess={handleAuthSuccess}
                />
                <p className="text-center mt-4">
                  Don’t have an account?{" "}
                  <button
                    onClick={() => setShowLogin(false)}
                    className="text-blue-600 underline"
                  >
                    Sign Up
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Sign Up
                </h2>
                <SignupForm
                  closeModal={() => setShowModal(false)}
                  onSignupSuccess={handleAuthSuccess}
                />
                <p className="text-center mt-4">
                  Already have an account?{" "}
                  <button
                    onClick={() => setShowLogin(true)}
                    className="text-blue-600 underline"
                  >
                    Login
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* AI Help Chatbot Modal */}
      {showChatbot && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">AI Food Recommendation</h2>
            <Chatbot closeChatbot={() => setShowChatbot(false)} />
          </div>
        </div>
      )}
    </header>
  );
}

const Chatbot = ({ closeChatbot }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessages = [...messages, { user: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        user: "bot",
        text: "Based on your input, I recommend trying Butter Chicken with Naan.",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div>
      <div className="h-64 overflow-y-auto border p-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.user === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block p-2 rounded ${
                msg.user === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-grow border rounded px-2 py-1"
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleSend}>
          Send
        </button>
        <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={closeChatbot}>
          Close
        </button>
      </div>
    </div>
  );
};
