import { useState } from "react";

const App = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);
  const [message, setMessage] = useState("");
  const [multipleImages, setMultipleImages] = useState([]);
  const [dogImage, setDogImage] = useState(null);

  // Single file handlers
  const handleSingleFileChange = (e) => {
    setSingleFile(e.target.files?.[0] || null);
  };

  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);
      const blob = await response.blob();
      setDisplayImage(URL.createObjectURL(blob));
    } catch (error) {
      setMessage("Error fetching image");
    }
  };

  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) return;

    try {
      const formData = new FormData();
      formData.append("file", singleFile);
      
      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });
      
      setMessage((await response.json()).message);
    } catch (error) {
      setMessage("Upload failed");
    }
  };

  // Multiple files handlers
  const handleMultipleFileChange = (e) => {
    setMultipleFiles(Array.from(e.target.files).slice(0, 3));
  };

  const handleSubmitMultipleFiles = async (e) => {
    e.preventDefault();
    if (!multipleFiles.length) return;

    try {
      const formData = new FormData();
      multipleFiles.forEach(file => formData.append("files", file));

      const response = await fetch("http://localhost:8000/save/multiple", {
        method: "POST",
        body: formData,
      });
      
      setMessage((await response.json()).message);
    } catch (error) {
      setMessage("Multiple upload failed");
    }
  };

  const fetchMultipleFiles = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/multiple");
      const filenames = await response.json();
      setMultipleImages(
        filenames.map(filename => 
          `http://localhost:8000/fetch/file/${filename}`
        )
      );
    } catch (error) {
      setMessage("Error fetching images");
    }
  };

  // Dog image handlers
  const fetchDogImage = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      setDogImage((await response.json()).message);
    } catch (error) {
      setMessage("Dog fetch failed");
    }
  };

  const uploadDogImage = async () => {
    if (!dogImage) return;

    try {
      const blob = await fetch(dogImage).then(r => r.blob());
      const file = new File([blob], "dog.jpg", { type: blob.type });

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/save/dog", {
        method: "POST",
        body: formData,
      });
      
      setMessage((await response.json()).message);
    } catch (error) {
      setMessage("Dog upload failed");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Image Uploader</h1>
      <p style={{ color: message.includes("failed") ? "red" : "green" }}>{message}</p>

      {/* Single File Section */}
      <section style={{ margin: "20px 0" }}>
        <h2>Single File</h2>
        <button onClick={fetchSingleFile}>Fetch Random</button>
        {displayImage && (
          <img
            src={displayImage}
            alt="Random"
            style={{ width: "200px", display: "block", margin: "10px 0" }}
          />
        )}
        <form onSubmit={handleSubmitSingleFile}>
          <input type="file" onChange={handleSingleFileChange} />
          <button type="submit">Upload Single</button>
        </form>
      </section>

      {/* Multiple Files Section */}
      <section style={{ margin: "20px 0" }}>
        <h2>Multiple Files</h2>
        <button onClick={fetchMultipleFiles}>Fetch 3 Random</button>
        <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
          {multipleImages.map((url, i) => (
            <img key={i} src={url} alt={`Image ${i}`} style={{ width: "200px" }} />
          ))}
        </div>
        <form onSubmit={handleSubmitMultipleFiles}>
          <input
            type="file"
            multiple
            onChange={handleMultipleFileChange}
            accept="image/*"
          />
          <button type="submit">Upload Multiple (Max 3)</button>
        </form>
      </section>

      {/* Dog Image Section */}
      <section style={{ margin: "20px 0" }}>
        <h2>Dog Image</h2>
        <button onClick={fetchDogImage}>Get Dog</button>
        {dogImage && (
          <div>
            <img
              src={dogImage}
              alt="Random Dog"
              style={{ width: "200px", display: "block", margin: "10px 0" }}
            />
            <button onClick={uploadDogImage}>Upload Dog</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default App;