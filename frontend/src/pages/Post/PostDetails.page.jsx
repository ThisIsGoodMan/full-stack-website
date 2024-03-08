import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";

function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [id]);

  return (
    <>
      <Container>
        {post ? (
          <>
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <h4>Category: {post.category}</h4>
            <p>{post.content}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <Button>
          <Link to="/posts">Back to Posts</Link>
        </Button>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
    const res = await axios.get(`${DOMAIN}/api/posts/${params.id.toString()}`);
    console.log("postDetailsLoader ran!!");
    return res.data;
  };


export default PostDetailsPage;
