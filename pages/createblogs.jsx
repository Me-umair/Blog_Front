import { useRef, useState } from "react";
import toast from "react-hot-toast";
import TagInput from "../components/tagComponent";
import TinyMceEditor from "../components/editor";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Createblogs() {
  let nav = useNavigate();
  const editorRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null); // To store the image preview URL
  let userData = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    draft: false, // Boolean value from the radio button
    tags: [],
  });
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
  const handleSubmit = async () => {
    const formDataToSend = new FormData(); // Create a FormData object
    if (!file) {
      return toast.error("Image Is Required.");
    }
    if (!formData.title) {
      return toast.error("Title Is Required.");
    }
    const words1 = formData.title?.trim().split(/\s+/);
    if (words1.length < 7) {
      return toast.error("Title Is Too Short.");
    }
    if (JSON.stringify(description1) == "{}") {
      return toast.error("Description Is Required.");
    }
    const words = description1?.trim().split(/\s+/);
    console.log(words);
    if (words.length < 80) {
      return toast.error("Description Is Too Short.");
    }
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
      console.log(formDataToSend);
      await toast.promise(
        fetch(`${import.meta.env.VITE_API}/api/v1/blogs`, {
          method: "POST",
          body: formDataToSend,
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }).then(async (response) => {
          if (!response.ok) {
            throw new Error("Request failed"); // Handle non-2xx responses
          }
          const result = await response.json();
          nav("/");
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
  const handleEditorChange = (content) => {
    setFormData({ ...formData, description: content }); // Update description with editor content
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 px-4 sm:px-0">
      <div className="w-full md:w-[90%] lg:w-[60%] max-w-2xl mt-4 bg-white rounded-lg shadow-lg p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 md:mb-6">
          Create Blog
        </h1>
        <div className="space-y-3 md:space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              type="text"
              placeholder="Enter title"
            />
          </div>
          <TinyMceEditor
            onInit={(evt, editor) => {
              console.log("Editor initialized:", editor);
              editorRef.current = editor;
            }}
            onEditorChange={handleEditorChange}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Draft
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
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
          <div>
            <label
              htmlFor="img1"
              className="block cursor-pointer text-sm font-medium text-gray-700 mb-1"
            >
              Upload File
            </label>
            <input
              id="img1"
              className={
                "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" +
                " " +
                (imagePreview ? "hidden" : "")
              }
              onChange={handleFileChange}
              type="file"
            />
            {imagePreview && (
              <div className="w-full flex justify-center">
                <img
                  className="rounded max-w-full h-auto"
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    marginTop: "20px",
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags:
            </label>
            <TagInput />
          </div>
        </div>
        <button
          className="w-full mt-4 md:mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm md:text-base"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
