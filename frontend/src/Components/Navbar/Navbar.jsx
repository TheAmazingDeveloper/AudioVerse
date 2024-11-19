import React from "react";

function Navbar() {
  return (
    <div className="flex justify-between">
      <Searchbar />
      <div className="flex items-center gap-3">
        <Profile />
        <Settings />
      </div>
    </div>
  );
}

export default Navbar;

function Searchbar() {
  return (
    <div className="w-1/3 px-4 py-2 flex justify-between bg-[#23262d] rounded-3xl">
      <input
        className="caret-[#808283] text-[#7f8892] bg-transparent border-none outline-none"
        placeholder="Search"
      />
      <div className=" rounded-full p-1">
        <img
          width="26px"
          height="26px"
          src="https://img.icons8.com/808283/ios/50/search.png"
        />
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="flex items-center gap-3">
      <img
        className="h-[3rem] w-[3rem] rounded-full overflow-clip object-cover"
        src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXVzaWN8ZW58MHx8MHx8fDA%3D"
      />
      <div className="h-[3rem] flex justify-evenly flex-col">
        <span className="text-[#d6d6d6] text-sm">John Doe</span>
        <div className="h-[1rem] flex items-center justify-center px-1 bg-[#223e45] rounded-3xl">
          <span className="text-[#a8acad] text-[0.6rem]">Premium</span>
        </div>
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="h-[3rem] w-[3rem] p-3 bg-[#23262d] rounded-full">
      <img src="https://img.icons8.com/a9aaac/ios/50/settings.png" />
    </div>
  );
}
