import React from "react";
import { useForm } from "react-hook-form";
import { account } from "../../appwrite/appwriteConfig";

export default function LoginForm({ closeModal, onLoginSuccess }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Handle regular login with email and password
  const onSubmit = async (data) => {
    try {
      const session = await account.createSession(data.email, data.password);
      onLoginSuccess(session); // Pass the session back on successful login
      closeModal();
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  // Google login using Appwrite OAuth
  const handleGoogleLogin = async () => {
    try {
      await account.createOAuth2Session(
        "google", // Appwrite's OAuth provider ID for Google
        `${window.location.origin}/callback`, // Redirect URL after login
        `${window.location.origin}/callback` // Optional, can be the same URL
      );
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  // Facebook login using Appwrite OAuth
  const handleFacebookLogin = async () => {
    try {
      await account.createOAuth2Session(
        "facebook", // Appwrite's OAuth provider ID for Facebook
        `${window.location.origin}/callback`, // Redirect URL after login
        `${window.location.origin}/callback` // Optional, can be the same URL
      );
    } catch (error) {
      console.error("Facebook login error:", error.message);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

        <button type="submit" className="w-full text-white bg-orange-500 hover:bg-orange-700 rounded-lg px-4 py-2">
          Login
        </button>

        <div className="text-center mt-2">
          <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
      </form>

      <div className="space-y-2">
        <button
          onClick={handleGoogleLogin}
          className="w-full text-white bg-red-500 hover:bg-red-700 rounded-lg px-4 py-2 flex items-center justify-center"
        >
          {/* <img src="/path-to-google-icon.png" alt="Google icon" className="w-4 h-4 mr-2" /> */}
          Login with Google
        </button>

        <button
          onClick={handleFacebookLogin}
          className="w-full text-white bg-blue-600 hover:bg-blue-800 rounded-lg px-4 py-2 flex items-center justify-center"
        >
          {/* <img src="/path-to-facebook-icon.png" alt="Facebook icon" className="w-4 h-4 mr-2" /> */}
          Login with Facebook
        </button>
      </div>

      <button onClick={closeModal} className="mt-4 text-sm text-gray-600">Cancel</button>
    </div>
  );
}
