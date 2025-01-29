import React from 'react';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Footer = () => {

    const Container = styled.div`
    height: 20vh;
    width: 100vw;
    display: flex;
    // align-items: flex-start;
    // justify-content: center;
    
    padding: 20px; /* Add padding to create space around the edges */
  `;

  const Left = styled.div`

  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:20px;

  flex:1;

  height:100%;  
`;

const Title = styled.h1`

font-size:40px;
font-weight:bold;
display:flex;
align-self:flex-start;
// align-items:flex-start;
// justify-content:flex-start;

`;

const Desc = styled.span`

font-size:18px;

width:60%;
display:flex;
text-align:justify;


`;

const Center = styled.h1`

 display:flex;
 flex-direction:column;
 align-items:flex-start;
flex:1;
justify-content:flex-start;


`;

const Header = styled.h3`

font-size:22px;
font-weight:bold;
align-items:flex-start;

`;


const Links = styled.div`
display:flex;
gap:160px;


`;
const Link = styled.span`
display:flex;
flex-direction:column;
gap:10px;
align-items:flex-start;



a{

 text-decoration:none;
 color:black;
 font-weight:200;
 font-size:18px;
}



`;


const Right = styled.div`
margin-top:40px;
  display: flex;
  flex-direction: column;
   align-items:flex-start; 
   /* Align items to the start, similar to the other sections */
  flex: 1;
   height:100%;
   justify-content:flex-start;
   gap:30px;
   
`;



const Contact = styled.span`
font-size:22px;
font-weight:bold;
display:flex;





`;

const Information = styled.div`
display:flex;
flex-direction:column;
gap:30px;




`;

const Info = styled.div`
display:flex;
gap:5px;

img{

 width:300px;
 height:90px;
}



`;

const Social = styled.div`
display:flex;
gap:20px;





`;

const Icon= styled.div`
padding:10px;
border-radius:80%;

background-color:blue;
color:white;



`;


const Icon1= styled.div`
padding:10px;
border-radius:50%;
color:white;


background-color:red;

`;

const Icon2= styled.div`

background-color:red;
border-radius:50%;
padding:10px;
background-color:blue;
color:white;

`;

const Icon3= styled.div`

background-color:red;
border-radius:50%;
padding:10px;
color:white;

`;






  return (
    <Container>
        <Left>
            <Title>LAMA.</Title>
            <Desc>A product description is a form of marketing copy used to describe and explain the benefits of your product. In other words, it provides all the information and details of your product on your ecommerce site.</Desc>
            <Social>
                <Icon>
                <FacebookIcon/>
                </Icon>
                <Icon1>
                <InstagramIcon/>
                </Icon1>
                <Icon2>
                <TwitterIcon/>
                </Icon2>
                <Icon3>
                <PinterestIcon/>
                </Icon3>
              
            </Social>

        </Left>

        <Center>
            <Header>Useful Links</Header>
            <Links>
             <Link>
              <a href="">Home</a>
              <a href="">Man Fashion</a>
              <a href="">Accessories</a>
              <a href="">Order Tracking</a>
              <a href="">Wishlist</a>
         
             </Link>
             <Link>
              <a href="">Cart</a>
              <a href="">Woman Fashion</a>
              <a href="">My Account</a>
              <a href="">Wishlist</a>
              <a href="">Terms</a>
         
             </Link>
            
            </Links>

        </Center>


        <Right>
            <Contact>
                Contact
            </Contact>
            <Information>
                <Info>
                    <LocationOnIcon/>
                     <span>Dallas 242,East Side Lake Tarun,USA</span>
                    
                </Info>
                <Info>
                    <LocalPhoneIcon/>
                     <span>+123 980 222</span>
                    
                </Info>
                <Info>
                    <EmailIcon/>
                     <span>contact@niraj.adk</span>
                    
                </Info>
                <Info>
                     <img src="https://t4.ftcdn.net/jpg/04/16/93/07/360_F_416930739_UeumuMO5QhZOXIAc09s7gz6JSPT97duS.jpg" alt="" />
                  
                </Info>
            </Information>


        </Right>

    </Container>
  )
}

export default Footer
