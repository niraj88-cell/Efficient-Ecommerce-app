import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { sliderItems } from '../../pages/data';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  z-index: 2;
  cursor: pointer;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

const LeftArrow = styled(Arrow)`
  left: 10px;
`;

const RightArrow = styled(Arrow)`
  right: 10px;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: transform 0.5s ease;

`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 30px;
`;

const Title = styled.h1`
  font-size: 75px;
  font-weight: bold;
`;

const Desc = styled.span`
  font-size: 22px;
  font-weight: 400;
  width: 50%;
`;

const Button = styled.span`
  font-size: 22px;
  font-weight: 400;
  border: 1px solid black;
  height: 40px;
  width: 220px;
  text-align: center;
  padding: 10px;
`;

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleClick = (way) => {
    if (way === 'left') {
      setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 2);
    } else {
      setCurrentSlide(currentSlide < sliderItems.length - 1 ? currentSlide + 1 : 0);
    }
  };

  return (
    <Container>
      <LeftArrow onClick={() => handleClick('left')}>
        <ArrowCircleLeftIcon style={{ fontSize: '40px' }} />
      </LeftArrow>

      <Wrapper style={{ transform: `translateX(-${currentSlide * 100}vw)`}}>
        {sliderItems.map((e, index) => (
          <Slide key={index}>
            <ImgContainer>
              <img src={e.img} alt={e.title} style={{ height: '100%', width: '100%' }} />
            </ImgContainer>
            <InfoContainer>
              <Title>{e.title}</Title>
              <Desc>{e.desc}</Desc>
              <Button>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>

      <RightArrow onClick={() => handleClick('right')}>
        <ArrowCircleRightIcon style={{ fontSize: '40px' }} />
      </RightArrow>
    </Container>
  );
};

export default Slider;
