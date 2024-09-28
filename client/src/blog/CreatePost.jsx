import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const CreatePost = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const POST_CATEGORIES = ["Uncategorized","Marketing", "Business", "Technology", "AI", "Gaming", "Product", "Entertainment"];

  const createPost = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      setError("Please upload a thumbnail image.");
      return;
    }

    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail); // Send the thumbnail to the server

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 201) {
        return navigate("/blog");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>{t("CreatePost.createPost")}</h2>
        {error && <p className="form-error-message">{error}</p>}
        <form className="form create-post-form" onSubmit={createPost}>
          <input
            type="text"
            placeholder={t("CreatePost.titlePlaceholder")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            required
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {t(`CategoryPosts.${cat.toLowerCase()}`)}
              </option>
            ))}
          </select>
          <textarea
            placeholder={t("CreatePost")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="custom-file-input-container">
            <input
              className="custom-file-input"
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              accept=".png, .jpg, .jpeg, .webp"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-submit" disabled={!title || !category || !description || !thumbnail}>
            {t("CreatePost.submitButton")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
