import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
// import { createBrowserHistory } from "history";
import { Button, Container, } from "@mantine/core";

function PostEditPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const history = createBrowserHistory();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/posts/${id}`);
        setPost(res.data);
        setEditedContent(res.data.content);
        setEditedImage(res.data.image);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`${DOMAIN}/api/posts/${id}`, { 
        content: editedContent,
        image: editedImage,
    });
      history.push(`/posts/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
     <Container>
      {post ? (
        <>
          <h2>Edit Post</h2>
          <img src={post.image} alt={post.title} />
          <br />
          <label>
            Image URL:
            <input
              size="50"
              type="text"
              value={editedImage}
              onChange={(e) => setEditedImage(e.target.value)}
            />
          </label>
          <h2>{post.title}</h2>
          <h4>Category: {post.category}</h4>
          <textarea
            rows={5}
            cols={50}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <br />
          <Button onClick={handleUpdate}>Update Post</Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default PostEditPage;