import React from "react";
import { Editor } from "tinymce";
import { Controller } from "react-hook-form";
function RTE({ name, control, label, defultvalue = "" }) {
  return (
    <Controller
      name={name || "content"}
      control={control}
      render={({ field: { onChange } }) => (
        <Editor
          defultvalue={defultvalue}
          height={500}
          menubar={true}
          onEditorChange={onChange}
        />
      )}
    />
  );
}

export default RTE;
