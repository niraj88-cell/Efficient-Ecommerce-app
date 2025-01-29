import React from 'react';
import { categories } from '../../pages/data';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
      align-items:flex-end;
    justify-content:center;
    padding:40px;
   

`;

const Wrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
  

    


`;

const ImgContainer = styled.div`
     
     position:relative;
     display:flex;
 
  
 
    

     img{
     
     width:630px;
     height:750px;
      object-fit: cover;
     }
     

    


`;




const InfoContainer = styled.div`
    display:flex;
     flex-direction:column;
      align-items:center;
    //  justify-content:center;
     position:absolute;

  

    


`;


const Title = styled.h1`
    font-size:35px;
    font-weight:bold;
    color:white;
   


`;



const Button = styled.div`
    padding:10px 7px;
    background-color:white;
    color:black;
    font-size:24px;
    border:none;
    


`;



const Category = () => {
  return (
    <Container>

        {categories.map((e)=>(

      
<Link to={`products/${e.cat}`}>
  
      <Wrapper>
          
        <ImgContainer>
        <img src={e.img} alt="" />
        </ImgContainer>

        <InfoContainer>
            <Title>{e.title}</Title>
            <Button>Shop Now</Button>

        </InfoContainer>
      
      </Wrapper>
      </Link>
     
      
            ))}
    </Container>
  )
}

export default Category
