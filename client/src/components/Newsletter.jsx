import { Send } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../resposive'

const Container = styled.div`
    height:60vh;
    background-color: #fcf5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${mobile({ height: '45vh' })}
`

const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;

    ${mobile({ fontSize: '50px' })}
`

const Description = styled.p`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;

    ${mobile({ fontSize: '20px', textAlign: 'center' })}
`

const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;

    ${mobile({ width: '86%', height: '36px' })}
`

const Input = styled.input`
    border: none;
    flex:8;
    padding-left: 20px;

    &:focus{
        outline: none
    }
`

const Button = styled.button`
    flex:1;
    border:none;
    background-color: teal;
    color: white;

    ${mobile({ flex: 2 })}
`

const Newsletter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Description>Get timely updates from your favorite products.</Description>
            <InputContainer>
                <Input placeholder='Your email' />
                <Button>
                    <Send />
                </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter
