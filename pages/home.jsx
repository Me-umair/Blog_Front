import { useEffect, useState } from "react";
import axios from "axios";
import addLike from "../components/addLike";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Home() {
  let nav = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  let [blogdata, setblog] = useState([]);
  let [blogordata, setblogor] = useState([]);
  let [tagsdata, settags] = useState([]);
  let [red, setred] = useState(true);
  let [users, setusers] = useState([]);
  let search = useSelector((state) => state.general.search);
  const handleSearch = () => {
    const filtered = blogordata.filter((blog) =>
      blog.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    );
    setblog(filtered);
  };
  async function gettags() {
    const result1 = await axios.get(`${import.meta.env.VITE_API}/api/v1/tags`);
    settags(result1?.data?.tags);
  }
  const handleTagClick = (tag4) => {
    const filtered = blogordata.filter((blog) =>
      blog.tags.some((tag) => tag.toLowerCase().includes(tag4.toLowerCase()))
    );
    setblog(filtered);
  };
  async function getBlogs() {
    const result = await axios.get(`${import.meta.env.VITE_API}/api/v1/blogs`);
    setblog(result.data.allBlogs);
    setblogor(result.data.allBlogs);
    console.log(blogdata);
  }
  async function handlelike(i) {
    let res = await addLike(i);
    if (res.success) {
      toast.success(res.message);
    }
    if (!res.success) {
      toast.error(res.message);
    }
    await setred(res);
  }
  async function getusers() {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/api/v1/user`);
      setusers(res?.data?.users);
    } catch (error) {
      console.log(error);
    }
  }
  async function handlefollow(id) {
    try {
      let user1 = JSON.parse(localStorage.getItem("user"));
      let res = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/user/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user1.token}`, // Include the token in the header
          },
        }
      );
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
      }
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
  useEffect(() => {
    getBlogs();
    getusers();
    gettags();
  }, [red]);
  useEffect(() => {
    handleSearch();
  }, [search]);
  const FollowSuggestion = ({
    image,
    id,
    name,
    description,
    isPublication,
  }) => (
    <div className="flex items-center border p-2 m-1 rounded justify-between mb-4">
      <div className="flex items-center">
        <img
          src={image}
          alt={name}
          className="min-w-12 max-w-[49px] h-12 rounded-full mr-4"
        />
        <div>
          <div
            onClick={() => {
              nav(`/profile/${id}`);
            }}
            className="capitalize cursor-pointer font-bold"
          >
            {name}
          </div>
          {isPublication && (
            <div className="text-sm text-gray-500">Publication</div>
          )}
          <div className="text-sm leading-3 w-[90%] capitalize line-clamp-2 text-gray-500">
            {description}
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          handlefollow(id);
        }}
        className="border hover:bg-green-300 border-gray-300 rounded-full px-4 py-1 text-sm font-semibold"
      >
        Follow
      </button>
    </div>
  );

  return (
    <div className="w-screen min-h-screen flex flex-col sm:flex-row justify-center bg-gray-100">
      {/* Main Content Section */}
      <div className="w-full sm:w-[63%] lg:w-[60%] xl:w-[55%] flex flex-col items-center px-2 sm:px-4">
        {blogdata.map((data, i) => (
          <div
            key={i}
            className="w-full max-w-2xl bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 mt-4 mb-2 mx-auto p-4"
          >
            {/* Author Section */}
            <div className="flex items-center mb-4">
              <img
                src="https://storage.googleapis.com/a1aa/image/BeKWwdpNFEmISt23Ty4S4DpBbSe0B0NtOAAShAQezac.jpg"
                alt="Hub Publication logo"
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div className="text-sm text-gray-600">
                <span className="font-semibold">In The Hub Publication</span>
                <span className="block sm:inline"> by </span>
                <span className="text-gray-800 font-medium capitalize">
                  {data.creator.name}
                </span>
              </div>
            </div>

            {/* Blog Content */}
            <div className="flex flex-col sm:flex-row">
              {/* Text Content */}
              <div className="flex-1 order-2 sm:order-1">
                <Link
                  to={`/blog/${data?.blogid}`}
                  className="group block transition-colors duration-200"
                >
                  <h1 className="text-xl font-bold text-gray-900 mb-2 leading-tight line-clamp-2 group-hover:text-blue-600">
                    {data.title}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{ __html: data?.description }}
                    className="text-gray-600 text-base mb-4 line-clamp-3"
                  />
                </Link>

                {/* Interaction Icons */}
                <div className="flex flex-wrap items-center text-gray-500 text-sm gap-4">
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-500 mr-1.5 text-sm"></i>
                    <span>Sep 5, 2024</span>
                  </div>
                  <button className="flex items-center hover:text-red-600">
                    <i
                      onClick={() => handlelike(data._id)}
                      className={`fas fa-heart mr-1.5 ${
                        data.likes.some(
                          (use) => use.email == user?.userDetail?.email
                        )
                          ? "text-red-500"
                          : "hover:text-red-400"
                      }`}
                    ></i>
                    <span>{data.likes.length}</span>
                  </button>
                  <div className="flex items-center">
                    <i className="fas fa-comment mr-1.5 hover:text-green-600"></i>
                    <span>{data.comments.length}</span>
                  </div>
                  <div className="flex items-center space-x-3 ml-auto">
                    <i className="fas fa-bookmark hover:text-blue-600"></i>
                    <i className="fas fa-ellipsis-h hover:text-gray-700"></i>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="sm:ml-4 mb-4 sm:mb-0 order-1 sm:order-2">
                <img
                  src={data.imageurl}
                  alt="Blog illustration"
                  className="w-full sm:w-32 lg:w-40 h-32 lg:h-40 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar */}
      <div className="w-full mt-2 sm:w-[35%] lg:w-[30%] xl:w-[25%] px-2 sm:px-4 sm:mt-0">
        {/* Follow Suggestions */}
        <div className="bg-white rounded-lg mt-4 shadow-sm p-4 mb-4">
          <h2 className="text-lg font-semibold mb-4">Who to follow</h2>
          {users.slice(-4).map((user) => (
            <FollowSuggestion
              key={user._id}
              id={user._id}
              image={user?.imageurl}
              name={user?.name}
              email={user?.email}
              description={user?.userdescription}
            />
          ))}
          <button className="text-sm text-blue-600 hover:text-blue-800 w-full text-left mt-3">
            See more suggestions
          </button>
        </div>

        {/* Tags Section */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-lg font-semibold mb-2 sm:mb-0">Tags</h2>
            <button
              onClick={() => setblog(blogordata)}
              className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full hover:bg-red-200 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tagsdata.map((tag, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(tag)}
                className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
