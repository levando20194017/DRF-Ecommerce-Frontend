import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { apiUploadImage } from "../../../services/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastFailed } from "../../../utils";

export const TinyMce = (props) => {
  const editorRef = useRef(null);
  const { handleChangeEditor, data } = props;

  const handleChangeTinyMCE = (content) => {
    if (!data) {
      handleChangeEditor(content);
    } else {
      handleChangeEditor(content);
      return {
        target: {
          name: "content",
          value: content,
        },
      };
    }
  };

  const handleUploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await apiUploadImage(formData);

      if (response.data.statusCode === 200) {
        const imageUrl = `${process.env.REACT_APP_IMAGE_URL}${response.img_url}`;

        // Chèn URL ảnh vào trình soạn thảo TinyMCE
        const editor = editorRef.current;
        if (editor) {
          editor.execCommand(
            "mceInsertContent",
            false,
            `<img src="${imageUrl}" alt="${file.name}" />`
          );

          editor.windowManager.close();
        }
      }
    } catch (error) {
      console.error("Upload image error:", error);
    }
  };

  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={data ? data : ""}
        name="content"
        init={{
          height: 500,
          menubar: true,
          entity_encoding: "raw",
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "image",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | blocks | link image |bold italic | alignleft aligncenter alignright alignjustify | outdent indent |  code",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          automatic_uploads: false,
          image_title: true,
          file_picker_types: "image",
          file_picker_callback: function (callback, value, meta) {
            let input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = function () {
              let file = input.files[0];

              if (file) {
                const maxSize = 3 * 1024 * 1024; // 3MB
                if (file?.size > maxSize) {
                  // Kích thước vượt quá giới hạn
                  toastFailed("Please upload photos smaller than 3MB.")
                  return;
                }
                if (
                  !(
                    file.type === "image/jpeg" ||
                    file.type === "image/jpg" ||
                    file.type === "image/png" ||
                    file.type === "image/gif"
                  )
                ) {
                  toastFailed("Please select PNG, GIF or JPG file.")
                  return;
                }
                handleUploadImage(file);
              }
            };
            input.click();
          },
        }}
        onEditorChange={handleChangeTinyMCE}
      />
    </>
  );
};
