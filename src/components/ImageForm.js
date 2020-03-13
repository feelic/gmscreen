import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
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
        <Fragment>
          <label htmlFor="imageUpload">
            <FontAwesomeIcon icon={faImage} color="#3B5998" size="10x" />
          </label>
          <input type="file" id="single" onChange={handleChange} />
        </Fragment>
      )}
    </div>
  );
}
