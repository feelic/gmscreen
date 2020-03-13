import { getConfig } from "./read-config";

export default function uploadImage (files) {
  const apiBaseUrl = getConfig("apiBaseUrl");
  const formData = new FormData()

  files.forEach((file, i) => {
    formData.append(i, file)
  })

  return fetch(`${apiBaseUrl}/image-upload`, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
}
