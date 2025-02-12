import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtags } from "../utils/generalSlice";

function TagInput({ alltags }) {
  let dispatch = useDispatch();
  let tags = useSelector((state) => state.general.tags);
  const [inputValue, setInputValue] = useState(""); // Input field value
  // Handle adding a tag
  const handleAddTag = async () => {
    if (inputValue.trim() !== "") {
      await dispatch(addtags([...tags, inputValue.trim()]));
      setInputValue(""); // Clear the input field
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove) => {
    dispatch(addtags(tags.filter((tag) => tag !== tagToRemove)));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      {/* Display existing tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium flex items-center"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Input field and add button */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a tag"
          className="flex-grow px-1 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-1 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Add Tag
        </button>
      </div>
    </div>
  );
}

export default TagInput;
