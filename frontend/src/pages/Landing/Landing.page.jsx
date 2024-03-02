import { Container } from "@mantine/core";
import React from "react";
import backgroundImage from "./backgroundImage.jpg";
import styles from "./Landing.page.module.css";


const Landing = () => {
  return (
    <div className={styles.backgroundImage} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Container>
        <h1>Welcome to Phoebe Inc.</h1>
      </Container>
    </div>
  );
};

export default Landing;
