import {useEffect, useState} from "react";

export default function FileInput({ fieldName, register, setValue, defaultValue }) {
  const [url, setUrl] = useState('')
  const fileChange = async (event) => {
    const file = event.target.files[0]
    const formData = new FormData();
    formData.append('file', file); // 'file' is the name of the field expected by the server

    try {
      const response = await fetch('/api/upload', {
        method: 'PUT',
        body: formData
      });
      const blob = await response.json()
      setValue(fieldName, blob.pathname)
      setUrl(blob.url)
    } catch (error) {
      alert('Server had a problem')
    }
  }

  useEffect(() => {
    setUrl(defaultValue)
  }, [defaultValue])

  return (
    <>
      <input type="file"
             className="py-2.5 ps-5 text-sm text-white rounded-lg bg-gray-solid placeholder-white"
             onChange={fileChange}/>
      <input type="hidden"
             {...register("pokemonPhoto", { required: true })}/>
      <img src={url}/>
    </>
  );
}
