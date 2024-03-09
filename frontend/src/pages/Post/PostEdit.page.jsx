import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
// import PostEditPage from "./PostEditPage.jsx";
import { createBrowserHistory } from "history";

function PostEditPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const history = createBrowserHistory();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/posts/${id}`);
        setPost(res.data);
        setEditedContent(res.data.content);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`${DOMAIN}/api/posts/${id}`, { content: editedContent });
      history.push(`/posts/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      {post ? (
        <>
          <h2>Edit Post</h2>
          <img src={post.image} alt={post.title} />
          <h2>{post.title}</h2>
          <h4>Category: {post.category}</h4>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PostEditPage;
