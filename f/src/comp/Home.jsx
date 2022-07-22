import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import { userQuery } from "./data.js";
import { client } from "../client";
import Sidebar from "./Sidebar";
// import UserProfile from "../UserProfile";
import logo from "../intro.jpeg";

const Home = () => {
  const [togglesidebar, setToggleSidebar] = useState(false); // to preview and remove sidebar
  const [user, setUser] = useState(); // set user and set toggle sidebar forget to set toggle sidebar again
  const scrollRef = useRef(null); // set scroll ref to refresh when user  scrolls to toggle sidebar again and toggle sidebar again again

  //declare userinformation here
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });
  // clear user information and clear toggle sidebar again

  //useEffect for the scrollbar effect
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className="flex-bg-gray-50-md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-intial">
        {/* Sidenbar with user opt & profile pic  */}
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt="profile"
              className="w-9 h-9 rounded-full"
            />
          </Link>
        </div>

        {/* Toggles sidebar */}
        {togglesidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in ">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={user && user} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<userProfile />} />
          {/* <Route path="/*" element={<Pins user={user && user} />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Home;
