import  { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

// Import TinyMCE core and plugins
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/models/dom/model"; // Import the DOM model explicitly
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";

// Import plugins statically
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/wordcount";
import { useDispatch } from "react-redux";
import { descrip } from "../utils/generalSlice";

const TinyMceEditor = ({data}) => {
    let dispatch = useDispatch();
  const editorRef = useRef(null);
  const [isTinyMCEReady, setIsTinyMCEReady] = useState(false);

  useEffect(() => {
    setIsTinyMCEReady(true); // Mark TinyMCE as ready
  }, []);

  const handleInit = (evt, editor) => {
    editorRef.current = editor;
  };

  const handleSave = () => {
    if (!editorRef.current) {
      console.error("Editor reference is not available.");
      return;
    }
    dispatch(descrip(editorRef.current.getContent()))
  };

  if (!isTinyMCEReady) {
    return <div className="p-6">Loading Editor...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Description</h1>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Editor
          onInit={handleInit}
          onEditorChange={handleSave}
          initialValue={data?data:""}
          init={{
            height: 500,
            license_key:"gpl",
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | print",
            content_style:
              "body { font-family: Arial, sans-serif; font-size: 14px; }",
            fixed_toolbar_container: "#toolbar-container", // Optional: Specify a container for the toolbar
          }}
        />
      </div>
    </div>
  );
};

export default TinyMceEditor;
