import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { userdata } from "../utils/userSlice";


const Profile = () => {
  let { userid } = useParams();
  let dispatch = useDispatch();
  let userData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({});
  async function getUser() {
    try {
      let result = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/user/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`, // ✅ Correct Header Format
          },
        }
      );
      setUser(result.data.users);
      dispatch(userdata(result?.data?.users))
      console.log(result?.data?.users)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="max-w-md mx-auto mt-7 m-3 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 text-center">
        <img
          src={user?.imageurl}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
        />
        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          {user?.name?.toUpperCase()}
        </h1>
        <p className="text-sm text-gray-600">{user?.email}</p>
      </div>
      <div className="flex justify-around py-4 bg-gray-50">
        <div className="text-center">
          <span className="block text-xl font-bold text-blue-600">
            <Link to={`/user/followers/${user?._id}`}>{user?.followers?.length}</Link>
          </span>
          <span className="text-sm text-gray-600">Followers</span>
        </div>
        <div className="text-center">
          <span className="block text-xl font-bold text-blue-600">
            <Link to={`/user/following/${user?._id}`}>{user?.following?.length}</Link>
          </span>
          <span className="text-sm text-gray-600">Following</span>
        </div>
      </div>
      <div className="flex justify-around py-4 bg-gray-50">
        <div className="text-center">
          <Link to={"/user/blogs"}>
          <span className="block text-xl font-bold text-blue-600">
            {user?.blogs?.length}
          </span>
          </Link>
          <span className="text-sm text-gray-600">Blogs Created</span>
        </div>
        <div className="text-center">
          <span className="block text-xl font-bold text-blue-600">
            {user?.blogsLiked?.length}
          </span>
          <span className="text-sm text-gray-600">Blogs Liked</span>
        </div>
      </div>
      <div className="p-6 bg-gray-50">
        <p className="text-gray-700 text-center">{user?.userdescription}</p>
      </div>
    </div>
  );
};

export default Profile;
