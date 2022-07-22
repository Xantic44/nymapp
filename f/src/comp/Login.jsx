import React from "react";
import "../index.css";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import intro from "../intro.jpeg";

import { client } from "../client";
import Home from "./Home.jsx";
function Login() {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative w-full h-full">
        <img
          src={intro}
          alt="landing page"
          className=" relative w-full h-full object-cover"
          content="landing page"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0  left-0 bottom-0  w-full h-full bg-blackOverlay opacity-60">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="p-5">
              <img
                src={intro}
                alt="logo"
                className=""
                width="200px"
                content="logo"
              />
            </div>
            <div className="Shadow-2xl">
              <div className="shadow-2xl">
                <GoogleLogin
                  clientId={`${process.env.g_clientid}`}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <FcGoogle className="mr-4" /> Sign in with google
                    </button>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy="single_host_origin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
