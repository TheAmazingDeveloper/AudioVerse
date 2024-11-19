import axios from "axios";
import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Bottombar from "./Bottombar/Bottombar";

function App() {
  return (
    <div className="h-screen p-6 bg-[#0b0e15] grid grid-cols-12 grid-rows-8 gap-6">
      <div className="row-span-7 col-span-3 bg-[#181b22] rounded-3xl">
        <Sidebar />
      </div>
      <div className="row-span-1 col-span-9 h-3/4">
        <Navbar />
      </div>
      <div className="row-span-6  col-span-9 bg-[#181b22] rounded-3xl">
        Outlet
      </div>
      <div className="row-span-1 col-span-12 bg-[#181b22] rounded-2xl">
        Bottombar
      </div>
      {/* <Sidebar />
      <Navbar />
      <Outlet />
      <Bottombar /> */}
      {/* <div className="w-[70%] float-right bg-[#181b22]">
        <Navbar />
      </div>
      <div className="w-[20%] bg-[#181b22]">
        <Sidebar />
      </div> */}
      {/* <div className="sticky bottom-[1.5rem] w-full bg-[#181b22]">
        <Bottombar />
      </div> */}
    </div>
  );
}

export default App;
