import React from "react";
import classes from "./Navbar.module.css";
import { Container, Group, Burger, Drawer, Stack } from "@mantine/core";
import useLinks from "./useLinks";
import { DrawerContext } from "../../Contexts/drawerContext";
import SVGComponent from "../SVGComponent";
import { Link } from "react-router-dom";
import useBoundStore from "../../store/Store";

const Navbar = () => {
  const { opened, toggle } = React.useContext(DrawerContext);
  const [items] = useLinks();
  const { user } = useBoundStore();
  
  const extractUsername = (email) => {
    return email.split("@")[0];
  };

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Link to="/">
          <SVGComponent width={28} />
        </Link>
        {user && <p>Hey, {extractUsername(user.email)}!</p>}
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Burger hiddenFrom="xs" opened={opened} onClick={toggle} />
        <Drawer
          withCloseButton={true}
          opened={opened}
          size="100%"
          onClose={toggle}
        >
          <Stack>{items}</Stack>
        </Drawer>
      </Container>
    </header>
  );
};

export default Navbar;
