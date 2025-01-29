import React from 'react';
import styled from 'styled-components';

const Choose = () => {

    const Category = styled.div`
    width:100%;
    height:7vh;

    
`;




    
const Left = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
padding:0px 50px;

`;


const Option = styled.div`
display:flex;
align-items:center;
justify-content:center;
gap:20px;

  select{
   width:80px;
   height:40px;



  }
`;

const Option2 = styled.div`
display:flex;
align-items:center;
justify-content:center;
  select{
   width:80px;
   height:40px;




  }

`;
const Option3 = styled.div`
display:flex;
align-items:center;
justify-content:center;
gap:20px;
  select{
   width:100px;
   height:40px;




  }

`;

const Title = styled.h2`
font-size:36px;
font-weight:bold;
display:flex;
align-items:flex-start;
padding:0px 50px;

`;

const Filter = styled.span`
font-size:22px;
font-weight:600;


`;


const Sort = styled.span`
font-size:22px;
font-weight:600;



`;


const Opt = styled.div`
display:flex;
align-items:center;
gap:20px;


`;

  return (
 

<Category>
    <Title>Dresses</Title>

       
        <Left>
           
        <Opt>
        <Option>
            <Filter>Filter Products:</Filter>
            <select name="" id="">
                <option value="">Color</option>
                <option value="">White</option>
                <option value="">Black</option>
                <option value="">Red</option>
                <option value="">Yellow</option>
                <option value="">Green</option>
            </select>
        </Option>
        <Option2>
            <select name="" id="">
                <option value="">Size</option>
                <option value="">M</option>
                <option value="">L</option>
                <option value="">XL</option>
                <option value="">XXL</option>
            </select>
        </Option2>
        </Opt>
        <Option3>

                    <Sort>Sort Products:</Sort>
            <select name="" id="">
                    <option value="">Price(asc)</option>
                    <option value="">Price(desc)</option>
                    <option value="">Rating</option>
            
                </select>
                </Option3>
       
        </Left>
    



    </Category>

  )
}

export default Choose
