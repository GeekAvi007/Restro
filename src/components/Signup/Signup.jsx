import React from "react";
import { useForm } from "react-hook-form";
import { account } from "../../appwrite/appwriteConfig";

export default function SignupForm({ closeModal, onSignupSuccess }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const newUser = await account.create("unique()", data.email, data.password, data.name);
      console.log("New User:", newUser); // Debugging statement to verify user creation
      const session = await account.createSession(data.email, data.password);
      onSignupSuccess(newUser);
      closeModal();
    } catch (error) {
      console.error("Signup Error:", error.message);
    }
  };

  const handleOAuthSignup = async (provider) => {
    account.createOAuth2Session(provider, `${window.location.origin}/`, `${window.location.origin}/`)
      .then(() => account.get())
      .then((user) => {
        onSignupSuccess(user);
        closeModal();
      })
      .catch((error) => console.error("OAuth Signup Error:", error.message));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="block w-full px-4 py-2 border rounded-lg"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

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

          <button type="submit" className="w-full text-white bg-orange-400 hover:bg-orange-800 rounded-lg px-4 py-2">
            Sign Up
          </button>
        </form>

        <div className="my-4 flex justify-center items-center space-x-2">
          <span>Or sign up with</span>
          <button
            onClick={() => handleOAuthSignup("google")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Google
          </button>
          <button
            onClick={() => handleOAuthSignup("facebook")}
            className="px-4 py-2 bg-blue-800 text-white rounded-lg"
          >
            Facebook
          </button>
        </div>
        <button onClick={closeModal} className="mt-4 text-sm text-gray-600">
          Cancel
        </button>
      </div>
    </div>
  );
}
