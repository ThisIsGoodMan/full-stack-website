import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";

function PostDetailsPage() {
  return (
    <>
      <Container>
        <p>This page shows post details!</p>
        <Button>
          <Link to="/posts">Back to Posts</Link>
        </Button>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
    const res = await axios.get(`${DOMAIN}/api/posts/${params.id.toString()}`);
    // console.log("I ran!");
    return res.data;
  };


export default PostDetailsPage;
