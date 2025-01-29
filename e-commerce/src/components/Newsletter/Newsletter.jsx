import React from 'react';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';

const Newsletter = () => {

  const Container = styled.div`
    height: 60vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FFF6F5;
    padding: 20px; /* Add padding to create space around the edges */
  `;

  const Title = styled.h1`
    font-size: 70px;
    font-weight: bold;
    align-self: center;
  `;

  const Desc = styled.span`
    font-size: 26px;
    align-self: center;
    margin-bottom: 20px;
  `;

  const Input = styled.input`
    width: 490px;
    height: 35px;
    padding: 10px; /* Optional: Add padding inside the input field */
  `;

  const Button = styled.button`
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: teal;
    color: white;
    border: none;
    cursor: pointer;
  `;

  const Main = styled.div`
    display: flex;
    gap: 10px; /* Add gap between input and button */
  `;

  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favourite products.</Desc>
      <Main>
        <Input placeholder="Your email" />
        <Button>
          <SendIcon />
        </Button>
      </Main>
    </Container>
  );
}

export default Newsletter;
