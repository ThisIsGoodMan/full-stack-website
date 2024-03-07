import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { useState } from "react";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import classes from './Login.page.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    let loginEmail = e.target.email?.value;
    let loginPassword = e.target.password?.value;
    if (!loginEmail || !loginPassword) return;
    loginService(loginEmail, loginPassword);
  };
  

  return (
    <form onSubmit={onLogin}>
      <Container size={420} my={40}>
    <Title ta="center" className={classes.title}>
      Welcome back!
    </Title>
    <Text c="dimmed" size="sm" ta="center" mt={5}>
      Do not have an account yet?{' '}
      <Anchor size="sm" component="button">
        Create account
      </Anchor>
    </Text>
    <Paper withBorder shadow="md" p={30} mt={30} radius="md" >
      <TextInput 
      name="email"
      label="Email" 
      placeholder="your@email.com" 
      required 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput 
      name="password"
      label="Password" 
      placeholder="Your password" 
      required 
      mt="md" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}/>
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button type="submit" fullWidth mt="xl" >
        Sign in
        </Button>
        {authLoading ? <h2>Loading...</h2> : null}
        </Paper>
      </Container>
    </form>
);
};

export default LoginPage;