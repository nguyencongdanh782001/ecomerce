import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../resposive'

const Container = styled.div`
    display: flex;

    ${mobile({ flexDirection: 'column' })}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;

    ${mobile({ paddingBottom: '10px' })}
`

const Logo = styled.h1`
    font-weight: bold;
`

const Description = styled.p`
    margin: 12px 0;
    line-height: 25px;

    ${mobile({ margin: '15px 0' })}
`

const SocialContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #${prop => prop.bgColor};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
`

const Center = styled.div`
    flex: 1;
    padding: 20px;

    ${mobile({ paddingBottom: '12px' })}
`

const Title = styled.h3`
    margin-bottom: 30px;   
    
    ${mobile({ marginBottom: '20px' })}
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

const ListItem = styled.li` 
    width: 50%;
    margin-bottom: 12px;
`

const Right = styled.div`
    flex: 1;
    padding: 20px;

    ${mobile({ paddingTop: '10px' })}
`

const ContactItem = styled.div`
    margin-bottom:12px;
    display: flex;
    align-items: center;

    ${mobile({ fontSize: '14.6px' })}
`

const Payment = styled.img`
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>DANHSOFT</Logo>
                <Description>
                    There are many variations of passages of Lorem Ipsum available, but
                    the majority have suffered alteration in some form, by injected
                    humour, or randomised words which don’t look even slightly believable.
                </Description>
                <SocialContainer>
                    <SocialIcon bgColor="3B5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon bgColor="E4405F">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon bgColor="55ACEE">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon bgColor="E60023">
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Women Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ marginRight: "10px" }} /> Vinh Thanh, Giong Rieng, Kien Giang, Viet Nam
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: "10px" }} /> contact@danhne.dev
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container >
    )
}

export default Footer
