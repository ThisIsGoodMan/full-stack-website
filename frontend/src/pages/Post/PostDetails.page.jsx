import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";

function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/posts/${id}`);
        setPost(res.data);

        const userId = res.data.userId;

        if (userId) {
          try {
            const userRes = await axios.get(`${DOMAIN}/api/users/${userId}`);
            setUser(userRes.data);
          } catch (userError) {
            console.error("Error fetching user details:", userError);
            setUser(null);
          }
        } else {
          console.warn("No userId found in the post:", res.data);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [id]);

  const extractUserName = (email) => {
    const atIndex = email ? email.indexOf('@') : -1;
    return atIndex !== -1 ? email.substring(0, atIndex) : email;
  };

  return (
    <>
      <Container>
        {post ? (
          <div className="postdetails">
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <h4>Category: {post.category}</h4>
            <p>{post.content}</p>
            {user && user.email ? (
              <p>Posted by: {extractUserName(user.email)}</p>
            ) : (
              <p>Posted by: User not found :(</p>
            )}
            <Button style={{ marginBottom: "5px" }}>
              <Link to={`/posts/${id}/edit`}>Edit Post</Link>
            </Button>
          </div>
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
  return res.data;
};

export default PostDetailsPage;
