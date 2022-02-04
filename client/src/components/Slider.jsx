import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import React from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import { sliderItem } from '../data';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { mobile, tablet } from '../resposive';

const Container = styled.div`
    width: 100%;
    height:100%;
    position: relative;
    
    ${mobile({ display: 'none' })};
    
    ${tablet({ height: '26vh' })};
`
const BoxArrow = styled.div`
    height: 100%;
    position: absolute;
    top:0;
    bottom:0;
    display: flex;
    align-items: center;
    justify-content: center;
    left:${prop => prop.direction === 'left' && '10px'};
    right:${prop => prop.direction === 'right' && '10px'};
    z-index: 1;

    ${tablet({ height: '26vh' })}
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    cursor: pointer;
    opacity: 0.6;
`

const Wrapper = styled.div`
    height:10%;
`

const Slide = styled.div`
    width:100vw;
    height:85vh;
    display: flex;
    align-items: center;
    background-color: #${prop => prop.bg};

    ${tablet({ height: '26vh' })}
`

const SlideItem = styled.div`
    height:100%;
    display:flex;

    ${tablet({ height: '26vh' })}
`

const ImgContainer = styled.div`
    height:100%;
    flex:1;

    ${tablet({ height: '26vh' })}
`

const Image = styled.img`
    height:99.9%
`

const InfoContainer = styled.div`
    flex:1;    
    padding: 30vh 50px 0 50px;

    ${tablet({ padding: `7vh 25px 0 25px` })}
`

const Title = styled.h1`
    font-size: 70px;

    ${tablet({ fontSize: '25px' })}
`

const Desc = styled.p`
    margin: 30px 0;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;

    ${tablet({ margin: '12px 0', fontSize: '15px', letterSpacing: '2px', lineHeight: '20px' })}
`

const Button = styled.button`
    padding:10px;
    font-size:20px;
    background-color: transparent;
    cursor: pointer;
    border: 1px solid black;
    outline: none;

    ${tablet({ padding: '6px', fontSize: '10px' })}
`


const SampleNextArrow = (props) => {
    const { onClick } = props
    return (
        <BoxArrow direction="left">
            <Arrow onClick={onClick}>
                <ArrowLeftOutlinedIcon />
            </Arrow >
        </BoxArrow>
    )
}

const SamplePrevArrow = (props) => {
    const { onClick } = props
    return (
        <BoxArrow direction="right">
            <Arrow onClick={onClick}>
                <ArrowRightOutlinedIcon />
            </Arrow>
        </BoxArrow>
    )
}


const Sliders = () => {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1700,
        autoplaySpeed: 2500,
        nextArrow: <SamplePrevArrow />,
        prevArrow: <SampleNextArrow />
    }

    return (
        <Container>
            <Wrapper>
                <Slider {...settings}>
                    {sliderItem.map((item, index) => (
                        <Slide bg={item.bg} key={index}>
                            <SlideItem style={{ display: 'flex' }}>
                                <ImgContainer>
                                    <Image src={item.img} />
                                </ImgContainer>
                                <InfoContainer>
                                    <Title>{item.title}</Title>
                                    <Desc>{item.desc}</Desc>
                                    <Button>SHOW NOW</Button>
                                </InfoContainer>
                            </SlideItem>
                        </Slide>
                    ))}
                </Slider>
            </Wrapper>
        </Container>
    )
}

export default Sliders
