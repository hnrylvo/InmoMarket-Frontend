import React from "react";
import LoginForm from "../../components/forms/login-form/Login-Form";
import LoginDecoration from "../../components/decorations/Login-Decoration";

const Login = () => {
  return (
    <div className="flex w-full items-center justify-center h-screen p-7 gap-5">
      <div className="w-full flex items-center justify-center lg:w-2/5 p-10">
        <LoginForm />
      </div>
      <div className="hidden lg:flex h-full w-1/2 items-center justify-center">
        < LoginDecoration />
      </div>
    </div>
  );
};

export default Login;
