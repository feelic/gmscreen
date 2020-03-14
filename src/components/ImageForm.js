import React, { useState } from "react";
import uploadImage from "../services/upload-image";

export default function(props) {
  const {onUpload, } = props;
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setLoading(true);

    const files = Array.from(e.target.files);

    uploadImage(files).then(res => {
      setLoading(false);
      onUpload(res.data.name);
    });
  }

  return (
    <div>
      {loading && "loading"}
      {!loading && (
          <input type="file" id="single" onChange={handleChange} />
      )}
    </div>
  );
}
