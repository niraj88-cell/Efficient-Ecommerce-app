import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux'; // Use this to get the dispatch function
import { login } from '../../redux/apiCall';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    center;
  background-size: cover;
`;

const Content = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 19%;
  height: 32%;
  background-color: white;
  gap: 15px;
`;

const Title = styled.span`
  font-size: 35px;
  align-self: flex-start;
`;

const Input = styled.div`
  align-self: flex-start;
  input {
    width: 350px;
    height: 40px;
  }
`;

const Button = styled.button`
  padding: 15px 45px;
  background-color: red;
  color: white;
  align-self: flex-start;
  border: none;
`;

const Rem = styled.div`
  align-self: flex-start;
  a {
    font-size: 13px;
    color: black;
  }
`;

const Create = styled.div`
  align-self: flex-start;
  a {
    font-size: 13px;
    color: black;
  }
`;

const Login = () => {

  const navigate=useNavigate();
  const userRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch(); // Use this to get dispatch

  const handleClick = async () => {
    const user = {
      username: userRef.current.value, // Access current.value for the username
      password: passRef.current.value, // Access current.value for the password
    };

    try {
      await login(dispatch, user);
      navigate("/"); // Call the login function
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <Container>
      <Content>
        <Title>SIGN IN</Title>
        <Input>
          <input type="text" placeholder="username" ref={userRef} />
        </Input>
        <Input>
          <input type="password" placeholder="password" ref={passRef} />
        </Input>
        <Button onClick={handleClick}>Sign in</Button>
        <Rem><a href="">DO YOU NOT REMEMBER THE PASSWORD?</a></Rem>
        <Create><a href="">CREATE A NEW ACCOUNT</a></Create>
      </Content>
    </Container>
  );
};

export default Login;
