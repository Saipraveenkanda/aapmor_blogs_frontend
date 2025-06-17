import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "./Quill.css";
import "react-quill/dist/quill.snow.css";

ReactQuill.Quill.register("modules/imageResize", ImageResize);

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "script",
  "list",
  "bullet",
  "align",
  "color",
  "background",
  "link",
  "image",
  "video",
  "code-block",
];

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    // [{ font: Font.whitelist }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["code-block"],
    ["clean"],
  ],
  imageResize: {
    parchment: ReactQuill.Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },
  clipboard: {
    matchVisual: true,
  },
  // table: true,
};

const QuillEditor = ({ content, handleContentChange }) => {
  useEffect(() => {
    document.querySelectorAll(".ql-toolbar button").forEach((button) => {
      const format = button.classList[0]?.replace("ql-", "");
      if (format) {
        button.setAttribute(
          "data-tooltip",
          format.charAt(0).toUpperCase() + format.slice(1)
        );
      }
    });
  }, []);
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleContentChange}
        style={{ marginBottom: "20px" }}
        modules={modules}
        formats={formats}
        placeholder="Start typing here..."
      />
    </div>
  );
};

export default QuillEditor;
