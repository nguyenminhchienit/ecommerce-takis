import React, { memo } from "react";
import { Editor } from "@tinymce/tinymce-react";
import clsx from "clsx";

const MarkdownEditor = ({
  value,
  handleChangeValue,
  name,
  setInValidField,
  inValidField,
  label,
}) => {
  return (
    <div className={clsx("gap-1 flex flex-col my-4")}>
      {label && <label>{label}</label>}
      <Editor
        apiKey="8hrv6yf5qc7ksxowjxku8u585cz33qm1hooaiu95ccfr5mig"
        initialValue={value}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={(e) =>
          handleChangeValue((prev) => ({
            ...prev,
            [name]: e.target.getContent(),
          }))
        }
        onFocus={() => setInValidField && setInValidField([])}
      />
      {inValidField?.some((el) => el.name === name) && (
        <small className="text-red-500 text-sm">
          {inValidField?.find((el) => el.name === name).mes}
        </small>
      )}
    </div>
  );
};

export default memo(MarkdownEditor);
