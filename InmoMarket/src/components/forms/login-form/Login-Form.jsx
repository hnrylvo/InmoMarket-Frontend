import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    navigate("/home");
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
      <h1 className="text-7xl font-bold mb-16">Welcome back!</h1>
      <p className="text-xl font-medium mb-10">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint illum
        officia ratione rerum porro, rem tempore veritatis eos praesentium ea
        voluptates impedit ex consectetur maxime. Mollitia blanditiis veritatis
        reprehenderit ad?
      </p>
      <p className="text-xl font-medium text-gray-500 my-8">
        to keep connected with us please login with your Google account
      </p>

      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-5 text-xl font-bold py-3 bg-secondary-green text-background-color w-full rounded-xl active:scale-[.98] transition-all hover:scale-[1.01] "
      >
        <FaGoogle className="w-8 h-8" />
        CONTINUE WITH GOOGLE
      </button>
    </div>
  );
}
