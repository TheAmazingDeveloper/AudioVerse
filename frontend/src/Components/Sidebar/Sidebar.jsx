import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../utils/constants";
import axios from "axios";

function Sidebar() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const links = [
    {
      title: "Home",
      iconUrl:
        "https://img.icons8.com/a3a3a1/fluency-systems-regular/48/home--v1.png",
    },
    {
      title: "Categories",
      iconUrl:
        "https://img.icons8.com/a3a3a1/external-anggara-basic-outline-anggara-putra/48/external-menu-ui-anggara-basic-outline-anggara-putra.png",
    },
    {
      title: "Playlists",
      iconUrl:
        "https://img.icons8.com/a3a3a1/ios-glyphs/60/lounge-music-playlist.png",
    },
  ];
  const handleLogout = async () => {
    await axios.get(`${serverURL}/user/logout`, { withCredentials: true });
    return navigate("/");
  };
  const handleLinks = (index) => {
    setCurrentIndex(index);
  };
  return (
    <div className="h-full flex flex-col justify-around py-6">
      <div className="flex justify-center items-center">
        <div className="h-[3rem] w-[3rem] p-1 object-cover rounded-full">
          <img src={`${serverURL}/static/images/logo.png`} />
        </div>
        <span className="text-[#ed701a] text-xl font-bold">AudioVerse</span>
      </div>
      <div className="h-3/4 p-3 flex flex-col gap-4 text-[#a3a3a1]">
        {links.map((link, index) => {
          return (
            <NavLinks
              key={index}
              index={index}
              icon={link.iconUrl}
              title={link.title}
              isSelected={currentIndex == index ? true : false}
              isPlaylist={index == 2 ? true : false}
              handleLinks={handleLinks}
            />
          );
        })}
      </div>
      <button onClick={handleLogout} className="flex items-center gap-2 px-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#a3a3a1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-log-out"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
        <span className="text-[#a3a3a1]">Logout</span>
      </button>
    </div>
  );
}

export default Sidebar;

function NavLinks({ index, icon, title, isSelected, isPlaylist, handleLinks }) {
  const [isdropped, setIsDropped] = useState(false);
  const handleDropdown = () => {
    setIsDropped((isdropped) => !isdropped);
  };
  return (
    <div
      onClick={() => {
        handleLinks(index);
      }}
      className={`p-3 flex items-center gap-2 ${
        isSelected ? "bg-[#313237]" : ""
      } rounded-2xl text-base cursor-pointer`}
    >
      <img height="26px" width="26px" src={icon} />
      <span>{title}</span>
      {isPlaylist ? (
        <button onClick={handleDropdown}>
          {isdropped ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#a3a3a1"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
