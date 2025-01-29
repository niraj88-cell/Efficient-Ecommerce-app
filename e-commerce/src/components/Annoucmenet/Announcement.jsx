import React from 'react';
import styled from 'styled-components';


const Container=styled.div`
    height:30px;
    background-color:green;

     

`; 

const Text=styled.span`
    font-size:18px;
    color:white;

     

`; 


const Announcement = () => {
  return (
    <Container>
        <Text>
            <span>Super Deal! Free Shipping on Orders Over $50</span>
        </Text>
    </Container>
  )
}

export default Announcement
