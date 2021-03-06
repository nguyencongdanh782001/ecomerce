import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile, tablet } from '../resposive'

const Container = styled.div`
    flex:1;
    margin:3px;
    height:70vh;
    position: relative;

    ${mobile({ margin: '2px', height: '30vh' })}

    ${tablet({ height: '38vh', width: '28.5vh', flex: 'none' })}
`

const Image = styled.img`
    width:100%;
    height:100%;
    object-fit: cover;
`

const Info = styled.div`
    position: absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
    font-size: 29px;
    text-align: center;
    
    ${mobile({ fontSize: '30px' })}
`

const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor:pointer;
    font-weight: 600;
    transition: all 0.4s linear ;

    &:hover{
        background-color: black;
        color: white;
    };
`

const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Link to={`/products/${item.cat}`}>
                <Image src={item.img} />
                <Info>
                    <Title>{item.title}</Title>
                    <Button>SHOP NOW</Button>
                </Info>
            </Link>
        </Container>
    )
}

export default CategoryItem
