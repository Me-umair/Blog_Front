import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TagInput from "../components/tagComponent";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TinyMceEditor from "../components/editor";
import { useDispatch, useSelector } from "react-redux";
import { addtags } from "../utils/generalSlice";

export default function Updateblogs() {
  let nav = useNavigate();
  let [blog, setBlog] = useState({});
  // let [alltags, setalltags] = useState([]);
  let { blogid } = useParams();
  const [imagePreview, setImagePreview] = useState(null); // To store the image preview URL
  const [formData, setFormData] = useState({
    title: blog?.title,
    description: blog?.description,
    draft: blog?.draft, // Boolean value from the radio button
    tags: [],
  });
  let dispatch = useDispatch();
  async function blogset() {
    try {
      let result1 = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/blog/${blogid}`
      );
      setBlog(result1?.data?.oneBlog[0]);
      dispatch(addtags(result1?.data?.oneBlog[0]?.tags));
      let result = result1?.data?.oneBlog[0];
      setImagePreview(result.imageurl);
      setFormData({
        title: result?.title,
        description: result?.description,
        draft: result?.draft, // Boolean value from the radio button
        tags: [],
      });
    } catch (error) {
      console.log("error updation");
      console.log(error);
    }
  }
  useEffect(() => {
    blogset();
  }, []);
  let userData = JSON.parse(localStorage.getItem("user"));
  const [file, setFile] = useState(null); // State to store the selected file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Set the selected file
      setFile(file);
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // If no file is selected, reset the preview and file
      setImagePreview(null);
    }
  };
  let description1 = useSelector((state) => state.general.descrip);
  let alltags = useSelector((state) => state.general.tags);
  function gettags1() {
    console.log(alltags);
  }

  const handleSubmit = async () => {
    gettags1();

    const formDataToSend = new FormData(); // Create a FormData object

    if (!formData.title) {
      return toast.error("Title Is Required.");
    }
    if (!description1) {
      return toast.error("Description Is Required.");
    }
    const words = description1.trim().split(/\s+/);
    console.log(words);
    if (words.length < 100) {
      return toast.error("Description Is Too Short.");
    }
    const words1 = formData.title.trim().split(/\s+/);
    if (words1.length < 7) {
      return toast.error("Title Is Too Short.");
    }
    console.log(words);
    // Append form data to FormData
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", description1);
    formDataToSend.append("draft", formData.draft);
    formDataToSend.append("tags", [...alltags]);

    // Append the file to FormData
    if (file) {
      formDataToSend.append("image", file);
    }

    try {
      // Wrap the fetch call in toast.promise
      await toast.promise(
        fetch(`${import.meta.env.VITE_API}/api/v1/blog/${blogid}`, {
          method: "PATCH",
          body: formDataToSend,
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }).then(async (response) => {
          if (!response.ok) {
            throw new Error("Request failed"); // Handle non-2xx responses
          }
          const result = await response.json();
          nav(`/updateblog/${result?.blogUpdate[0]?.blogid}`, {
            replace: true,
          });
          return result; // Return the result for the success handler
        }),
        {
          loading: "Creating blog...", // Message shown while the request is pending
          success: (result) => result.message, // Message shown when the request succeeds
          error: (err) => err.message || "An error occurred. Please try again.", // Message shown when the request fails
        }
      );
    } catch (error) {
      console.log("An error occurred. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      {blog ? (
        <div className="w-[90%] sm:w-[60%] mt-4 bg-white rounded-lg shadow-lg p-6 sm:p-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            Update Blog
          </h1>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                value={formData.title}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                type="text"
                placeholder="Enter title"
              />
            </div>

            {/* TinyMCE Editor */}
            <TinyMceEditor data={formData?.description} />

            {/* Draft Status */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Draft
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    checked={formData.draft}
                    type="radio"
                    name="status"
                    value="true"
                    onChange={() =>
                      setFormData({
                        ...formData,
                        draft: true,
                      })
                    }
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    checked={!formData.draft}
                    type="radio"
                    name="status"
                    value="false"
                    onChange={() =>
                      setFormData({
                        ...formData,
                        draft: false,
                      })
                    }
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="img1"
                className="block cursor-pointer text-sm sm:text-base font-medium text-gray-700 mb-1"
              >
                Upload File
              </label>
              <input
                id="img1"
                className={
                  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" +
                  " " +
                  (imagePreview ? "hidden" : "")
                }
                onChange={handleFileChange}
                type="file"
              />
              {imagePreview && (
                <div className="w-full flex justify-center mt-4">
                  <img
                    className="rounded max-w-full h-auto"
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Tags Input */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Tags:
              </label>
              <TagInput alltags={alltags} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      ) : (
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Loading...
        </h1>
      )}
    </div>
  );
}
