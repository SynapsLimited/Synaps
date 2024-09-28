import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { useTranslation } from "react-i18next"; // Importing useTranslation hook

const EditPost = () => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    "Uncategorized",
    "Marketing",
    "Business",
    "Technology",
    "AI",
    "Gaming",
    "Product",
    "Entertainment",
  ];

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(t("EditPost.fetchError"));
      }
      setIsLoading(false);
    };
    
    getPost();
  }, [id, t]);

  const editPost = async (e) => {
    e.preventDefault();
  
    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    if (thumbnail) {
      postData.set("thumbnail", thumbnail);
    }
  
    try {
      const token = currentUser?.token; // Ensure token is set
      console.log('Token being sent:', token); // Log token for debugging
  
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is included
          },
          withCredentials: true,
        }
      );
  
      if (response.status === 200) {
        navigate("/blog");
      }
    } catch (err) {
      setError(err.response?.data?.message || t("EditPost.genericError"));
    }
  };
  
  

  return (
    <section className="edit-post create-post">
      <div className="container">
        <h2>{t("EditPost.editPost")}</h2>
        {error && <p className="form-error-message">{error}</p>}
        {isLoading && <p>{t("EditPost.loading")}</p>} {/* Add loading message */}
        <form className="form edit-post-form" onSubmit={editPost}>
          <input
            type="text"
            placeholder={t("EditPost.titlePlaceholder")}
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
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          />
          <div className="custom-file-input-container">
            <input
              className="custom-file-input"
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              accept=".png, .jpg, .jpeg, .webp"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-submit"
            disabled={!title || !category || !description || isLoading}
          >
            {t("EditPost.submitButton")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
