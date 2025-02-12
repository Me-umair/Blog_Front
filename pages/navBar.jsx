import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../utils/userSlice";
import { comment1, setsearch } from "../utils/generalSlice";

function NavBar() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const setvisi = useSelector((state) => state.general.comment1);
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div className="min-w-full overflow-x-hidden h-full">
      {/* Font Awesome Stylesheet */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />

      {/* Header Section */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white shadow-md">
        {/* Logo and Search */}
        <div className="flex items-center">
          <h1 className="text-xl sm:text-3xl font-serif text-gray-800">
            <Link to={"/"} className="hover:text-teal-500 transition-colors">
              Modium
            </Link>
          </h1>

          {/* Search Bar */}
          <div className="ml-1 sm:ml-3 flex items-center bg-gray-100 rounded-full px-1 py-2">
            <i className="fas fa-search text-gray-500"></i>
            <input
              onChange={(e) => {
                dispatch(setsearch(e.target.value));
              }}
              type="text"
              placeholder="Search..."
              className="ml-2 w-32 mr-2 bg-transparent focus:outline-none text-sm sm:text-base text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex ml-2 items-center relative">
          {/* Write Button */}
          <div className="flex items-center mr-3">
            <i className="fas fa-pen-square text-gray-500 hover:text-teal-500 cursor-pointer transition-colors"></i>
            <span className=" ml-1 text-gray-500 hover:text-teal-500 cursor-pointer transition-colors">
              <Link to={"/createblog"}>Write</Link>
            </span>
          </div>

          {/* Notification Bell */}
          {/* <i className="fas fa-bell hidden sm:visible text-gray-500 hover:text-teal-500 cursor-pointer transition-colors mr-4"></i> */}

          {/* Login/Profile */}
          {user?.userDetail ? (
            <>
              {/* Profile Image or Initials */}
              <div
                onClick={togglePopup}
                className="w-8 h-8 sm:ml-3 bg-teal-300 cursor-pointer rounded-full flex items-center justify-center overflow-hidden"
              >
                {user?.userDetail.imgurl ? (
                  <img
                    src={user?.userDetail.imgurl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-white font-medium text-sm">
                    {user?.userDetail.name[0].toUpperCase()}
                  </span>
                )}
              </div>

              {/* Profile Popup */}
              {isPopupVisible && (
                <div className="absolute top-10 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <p
                      onClick={togglePopup}
                      className="text-sm capitalize font-medium text-gray-800 hover:text-teal-500 cursor-pointer transition-colors"
                    >
                      Name: {user?.userDetail?.name}
                    </p>
                    <p
                      onClick={togglePopup}
                      className="text-sm line-clamp-1 w-[100%] text-gray-500 hover:text-teal-500 cursor-pointer transition-colors"
                    >
                      Email: {user?.userDetail?.email}
                    </p>
                    <p
                      onClick={togglePopup}
                      className="text-center text-sm capitalize border mt-2 rounded p-1 font-medium text-gray-900 hover:bg-teal-100 transition-colors"
                    >
                      <Link to={`/profile/${user?.userDetail?._id}`}>
                        View Profile
                      </Link>
                    </p>
                    <hr className="my-2" />
                    <p
                      onClick={() => {
                        dispatch(logout());
                        togglePopup();
                      }}
                      className="text-center text-sm capitalize border rounded p-1 font-medium text-gray-900 hover:bg-red-100 transition-colors"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link to={"/login"}>
              <p className=" sm:ml-3 text-gray-500 hover:text-teal-500 cursor-pointer transition-colors">
                Login
              </p>
            </Link>
          )}
        </div>
      </header>

      {/* Outlet for Nested Routes */}
      <Outlet />
    </div>
  );
}

export default NavBar;
