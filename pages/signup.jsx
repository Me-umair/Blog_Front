import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [userda, setda] = useState({
    name: "",
    password: "",
    email: "",
    userdescription: "",
  });
  const [file, setFile] = useState(null); // State to store the selected file
  const [imagePreview, setImagePreview] = useState(null); // To store the image preview URL

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

  async function datasend() {
    const formDataToSend = new FormData(); // Create a FormData object
    const words1 = userda?.userdescription.trim().split(/\s+/);
    if (words1.length<10) {
      return toast.error("Description Is Too Short.");
    }
    // Append form data to FormData
    formDataToSend.append("name", userda.name);
    formDataToSend.append("password", userda.password);
    formDataToSend.append("email", userda.email);
    formDataToSend.append("userdescription", userda.userdescription);

    // Append the file to FormData
    if (!file) {
      return toast.error("Image Is Required.");
    }
    formDataToSend.append("image", file);
    try {
      let data = await fetch(`${import.meta.env.VITE_API}/api/v1/user`, {
        method: "POST",
        body: formDataToSend,
      });
      console.log(formDataToSend);
      let res = await data.json();
      if (res.success) {
        toast.success(res.message);
      }
      if (!res.success) {
        toast.error(res.message);
      }
    } catch (error) {
      console.log("An error occurred. Please try again.");
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full max-w-md mt-2 bg-white rounded-lg shadow-lg p-9">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) =>
                setda((pre) => ({ ...pre, name: e.target.value }))
              }
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) =>
                setda((pre) => ({ ...pre, password: e.target.value }))
              }
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) =>
                setda((pre) => ({ ...pre, email: e.target.value }))
              }
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) =>
                setda((pre) => ({ ...pre, userdescription: e.target.value }))
              }
              type="text"
              placeholder="Enter your Account Description"
            />
          </div>
          <div>
            <label
              htmlFor="img2"
              className="block cursor-pointer text-sm font-medium text-gray-700 mb-1"
            >
              Upload File
            </label>
            <input
              id="img2"
              className={
                "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" +
                " " +
                (imagePreview ? "hidden" : "")
              }
              onChange={handleFileChange} // Store the selected file
              type="file"
            />
            {imagePreview && (
              <div className="w-full flex justify-center">
                <img
                  className="rounded-[50%] w-20 h-20"
                  src={imagePreview}
                  alt="Preview"
                />
              </div>
            )}
          </div>
        </div>
        <button
          className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={datasend}
        >
          Submit
        </button>
        <p className="text-center text-sm font-medium text-gray-700 m-2">
          <Link to={"/login"}>Already Have Account</Link>
        </p>
      </div>
    </div>
  );
}
