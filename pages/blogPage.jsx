import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setblogid, setdata } from "../utils/blogSlice";
import addLike from "../components/addLike";
import likecomment2 from "../components/likecomments";
import { comment1 } from "../utils/generalSlice";
import toast from "react-hot-toast";


function BlogPage() {
  let [comdata, setcomdata] = useState("");
  let [red, setRed] = useState(false);
  let user1 = JSON.parse(localStorage.getItem("user"));
  let nav = useNavigate();
  let [blog, setblog] = useState({});
  let visiblecomments = useSelector((state) => state.general.comment1);
  let dispatch = useDispatch();
  let { id } = useParams();
  dispatch(setblogid(id));
  async function handlelike(i) {
    let res = await addLike(i);
    if (res.success) {
      toast.success(res.message);
    }
    if (!res.success) {
      toast.error(res.message);
    }
    await setRed(res);
  }
  async function handlecomment(blogid1) {
    try {
      let userdata = JSON.parse(localStorage.getItem("user"));
      let result = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/blog/comment/${blogid1}`,
        {
          comment: comdata,
        },
        {
          headers: {
            Authorization: `Bearer ${userdata.token}`,
          },
        }
      );
      if (result.data.success) {
        toast.success(result.data.message);
      }
      getblog();
    } catch (error) {
      console.log(error);
    }
  }
  const handleDeleteComment = async (commentId) => {
    try {
      // Confirm deletion with the user

      // Make the API call to delete the comment
      const response = await fetch(
        `${import.meta.env.VITE_API}/api/v1/blog/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user1?.token}`, // Include authentication token if required
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message); // Show success message
        getblog();
      } else {
        toast.error(data.message || "Failed to delete the comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("An error occurred while deleting the comment.");
    }
  };
  async function deleteBlog(blogid2) {
    try {
      let result = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/blog/${blogid2}`,
        {
          headers: {
            Authorization: `Bearer ${user1?.token}`, // Include the token in the header
          },
        }
      );
      if (result.data.success) {
        toast.success(result.data.message);
      }
      nav("/");
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
  async function likecomment1(comid) {
    try {
      let res = await likecomment2(comid);
      if (res.success) {
        toast.success(res.message);
      }
      if (!res.success) {
        toast.error(res.message);
      }
      getblog();
    } catch (error) {
      console.log(error);
    }
  }
  const user = useSelector((state) => state.user.value);
  const blogid = useSelector((state) => state.blog.blogid);
  async function getblog() {
    try {
      let result = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/blog/${blogid}`
      );
      setblog(result?.data?.oneBlog[0]);
      dispatch(setdata(result?.data?.oneBlog[0]));
      if (!result?.data?.oneBlog[0]) {
        nav("*");
      }
      console.log(result?.data?.oneBlog[0]);
    } catch (error) {
      console.log(error);
    }
  }
  const handleShare = async () => {
    const shareData = {
      title: "Check out this website!", // Title of the shared content
      text: "This is an amazing website!", // Text to share
      url: window.location.href, // URL of the current page
    };

    try {
      if (navigator.share) {
        // Use the Web Share API if supported
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support the Web Share API
        navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  let allcomments = blog?.comments;
  useEffect(() => {
    getblog();
  }, [red]);
  return (
    <div className={"w-full h-full relative flex justify-center"}>
      <div className="font-roboto rounded h-fit bg-white w-[90%] mt-2 mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-3xl capitalize font-bold leading-tight mb-4">
            {blog?.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Not specific workouts, diets, supplements, or ‘hacks’. Once you nail
            this there’s no stopping you.
          </p>
          <div className="flex items-center mb-6">
            <img
              src={blog?.creator?.imageurl}
              alt="Author's profile picture"
              className="rounded-full w-9 h-9 mr-3"
            />
            <div>
              <div className="flex items-center">
                <span className="font-bold">
                  {blog?.creator?.name?.toUpperCase()}
                </span>
                <span className="text-gray-500 mx-2">·</span>
                <button
                  onClick={() => {
                    handlefollow(blog?.creator?._id);
                  }}
                  className="text-blue-500 font-semibold"
                >
                  Follow
                </button>
              </div>
              <div className="text-gray-500">
                Published in{" "}
                <span className="font-semibold">In Fitness And In Health</span>{" "}
                · 6 min read · {blog?.createdAt}
              </div>
            </div>
          </div>
          <div className="flex items-center text-gray-500">
            <div className="flex items-center mr-6">
              <i
                onClick={() => {
                  handlelike(blog._id);
                }}
                className={
                  "far cursor-pointer fa-heart mr-2" +
                  " " +
                  (blog?.likes?.some(
                    (use) => use.email == user1?.userDetail?.email
                  )
                    ? "text-red-500"
                    : "")
                }
              ></i>
              <span>{blog?.likes?.length}</span>
            </div>
            <div className="flex cursor-pointer items-center mr-6">
              <i
                onClick={() => {
                  dispatch(comment1());
                }}
                className="far fa-comment-alt mr-2"
              ></i>
              <span>{blog?.comments?.length}</span>
            </div>
            <div className="flex items-center mr-6">
              <i className="far fa-bookmark"></i>
            </div>
            <div
              onClick={handleShare}
              className="flex cursor-pointer items-center mr-6"
            >
              <i className="fas fa-share"></i>
            </div>
            {user?.userDetail?.email == blog?.creator?.email ? (
              <div className="flex items-center">
                <Link to={`/updateblog/${blog?.blogid}`}>
                  <i className="fas fa-pen-square mr-6"></i>
                </Link>
              </div>
            ) : (
              ""
            )}
            <div className="flex items-center">
              <i
                onClick={() => {
                  deleteBlog(blog?._id);
                }}
                className="fas fa-trash-alt cursor-pointer"
              ></i>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center m-2">
          <div className="w-[70%]">
            <hr />
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <img
            className="w-[70%] h-80 object-cover rounded-md border"
            src={blog?.imageurl}
            alt=""
          />
        </div>
        <div className="w-full p-5 text-xl mt-4">
          <p dangerouslySetInnerHTML={{ __html: blog?.description }}></p>
        </div>
      </div>
      {visiblecomments ? (
        <div className="w-[90%] sm:w-[35%] ml-2 bg-white shadow-2xl m-4 z-10 overflow-y-auto max-h-[90vh] rounded-2xl absolute right-0 sm:left-auto sm:mx-auto">
          {/* Header */}
          <div className="w-full h-fit flex justify-between items-center p-4 sm:p-5 border-b border-gray-200">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-800 tracking-wide">
              Comments
            </h1>
            <i
              onClick={() => dispatch(comment1())}
              className="fas fa-times text-gray-500 hover:text-red-500 cursor-pointer text-xl transition-colors duration-200"
            ></i>
          </div>

          {/* Comments List */}
          <div className="w-full h-fit p-4 sm:p-5 space-y-4 overflow-y-auto">
            {allcomments?.map((onecomment, i) => (
              <div
                key={i}
                className="border border-gray-200 flex flex-col sm:flex-row justify-between items-start bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 transition-all duration-300"
              >
                <div className="w-full sm:w-auto">
                  <p className="text-gray-800 font-medium text-sm sm:text-base">
                    {onecomment.comment}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    By: <span className="italic">{onecomment.user.name}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0 ml-0 sm:ml-4">
                  <button
                    onClick={() => likecomment1(onecomment?._id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                      onecomment?.likes?.includes(user1?.userDetail?._id)
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    } transition-all duration-200`}
                  >
                    <i className="far fa-heart"></i>
                    <span>{onecomment?.likes?.length || 0}</span>
                  </button>
                  <button
                    onClick={() => handleDeleteComment(onecomment?._id)}
                    className="px-2 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-200"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <div className="w-full p-4 sm:p-5 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                onChange={(e) => setcomdata(e.target.value)}
                type="text"
                placeholder="Type your comment..."
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={() => handlecomment(blog?._id)}
                className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BlogPage;
