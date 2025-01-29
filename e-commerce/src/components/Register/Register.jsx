import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
   width:100vw;
   height:100vh;
   background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;

`;


const Content=styled.div`
 display:flex;
 padding:35px;
 flex-direction:column;
 align-items:center;
 justify-content:center;
 width:30%;
 height:42%;
 background-color:white;
 gap:25px;


`;

const Title=styled.span`
font-size:35px;
align-self:flex-start;
justify-content:flex-start;

`;


const Input=styled.div`
display:flex;
align-items:center;
 flex-wrap:wrap;
gap:10px;

 input{
    width:270px;
    height:40px;
    margin-bottom:10px;

 }

`;

const Button=styled.button`
 padding:20px 90px;
 background-color:red;
 color:white;
 align-self:flex-start;
 border:none;
`;





const Create=styled.div`
align-self:flex-start;
text-align:justify;




 font-size:14px;
 color:black;


 span{
  font-weight:bold;
 }


 
  
`;

const Register = () => {
  return (
   <Container>

    <Content>
        <Title>CREATE AN ACCOUNT</Title>
        <Input>
        <input type="text" placeholder='name' />
        <input type="text" name="" id="" placeholder='lastname'/>
        <input type="text" name="" id=""  placeholder='username' />
        <input type="email" placeholder='email' />
        <input type="password" placeholder='password' />
        <input type="password" placeholder='confirm password' />
        
        </Input>
        <Create>By creating an account,i consent to the processing of my personal data in accordance with the <span>PRIVACY POLICY</span></Create>
        <Button>Create</Button>
    </Content>


   </Container>
  )
}

export default Register
