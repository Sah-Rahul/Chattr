import { IoSearch } from "react-icons/io5";
import User from "./User";
import { Link } from "react-router-dom";

const UserSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="max-w-[20em] w-full h-screen flex flex-col border-r border-r-white/10 bg-[#064232] text-white">
      {/* Top static content */}
      <div className="bg-  mx-3 rounded-lg mt-3 px-2 py-1 text-[#AEC8A4] text-xl font-semibold">
        <Link to={"/"}>Chattr</Link>
      </div>

      {/* Scrollable area */}
      <div className="flex-1 overflow-y-auto">
        {/* Search Bar */}
        <div className="p-3">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow bg-transparent text-blue-600 placeholder-blue-700 outline-none"
              placeholder="Search"
            />
            <IoSearch className="text-lg text-gray-400" />
          </label>
        </div>

        {/* Users */}
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
      </div>

      {/* Fixed Logout section */}
      <div className="flex items-center justify-between p-3 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              {/* Replace with <img /> or initials */}
              <img src="https://via.placeholder.com/150" alt="Admin" />
            </div>
          </div>
          <div>
            <p className="font-medium">Admin</p>
          </div>
        </div>

        <button onClick={handleLogout} className="btn btn-primary btn-sm px-4">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
