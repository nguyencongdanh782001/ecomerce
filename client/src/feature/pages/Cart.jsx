import { Add, DeleteOutline, Remove } from '@mui/icons-material'
import { Alert, Slide, Snackbar } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import styled from 'styled-components'
import * as api from '../../api/checkoutApi'
import Announcement from '../../components/Announcement'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { mobile, tablet } from '../../resposive'
import { clearCart, decrease, increase, removeProduct } from '../redux/cartRedux'

const Container = styled.div`
    width: 100%;
`

const Wrapper = styled.div`
    width: 100%;
    padding: 20px;

    ${mobile({ padding: '10px' })}

`

const Title = styled.h1`
   font-weight: 300;
   text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`

const TopButton = styled.button`
   padding:10px;
   font-weight: 600;
   cursor: pointer;
   border: ${prop => prop.type === 'filled' && 'none'};
   background-color: ${prop => prop.type === 'filled' ? 'black' : 'transparent'};
   color: ${prop => prop.type === 'filled' && 'white'};

   & a{
       text-decoration: none;
       color: inherit;
   }
`

const TopTexts = styled.div`
    ${mobile({ display: 'none' })}
`

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;

    ${mobile({ flexDirection: 'column' })};

    ${tablet({ flexDirection: 'column' })}
`

const Info = styled.div`
    flex:3;
    padding-right: 20px;

    ${tablet({ marginBottom: '20px' })}
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;

    ${mobile({ flexDirection: 'column', padding: '15px 0px' })}

`

const ProductDetail = styled.div`
    flex:2;
    display: flex;
`

const Image = styled.img`
    width:200px;
    height: 160px;
    object-fit: contain;

    ${mobile({ width: '170px' })}
`

const Detail = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductName = styled.span`
    word-break: break-all;
`

const ProductId = styled.span`
    word-break: break-all;
`

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${prop => prop.color};

    ${mobile({ width: '16px', height: '16px' })}
`

const ProductSize = styled.span`

`

const PriceDetail = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${mobile({ flexDirection: 'row', justifyContent: 'space-between' })}
`

const ProductAmountContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   margin-bottom: 20px;

   ${mobile({ marginBottom: 0 })}
`

const ProductAmount = styled.span`
   font-size: 24px;
   margin: 0 10px;

   ${mobile({ fontSize: '20px' })}
`

const ProductPrice = styled.span`
   font-size: 30px;
   font-weight: 200;

   ${mobile({ fontSize: '25px' })}
`

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 2px;
`

const Summary = styled.div`
    flex: 1;
    border: 1px solid gray;
    padding: 20px;
    border-radius: 10px;
    height: 55vh;

    ${mobile({ marginTop: '20px' })};

    ${tablet({ width: '97%' })}
`

const SummaryTitle = styled.h1`
    font-weight: 300;
`

const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${prop => prop.type === 'total' && '500'};
    font-size:  ${prop => prop.type === 'total' && '24px'};
`

const SummaryText = styled.span`

`

const SummaryPrice = styled.span`

`

const SummaryButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`

const Delete = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    width: 50px;

    ${mobile({ display: 'none' })}
`

const DeleteMoblie = styled.div`
    display: none;
    justify-content: center;
    align-items: center;
    padding: 0 ;
    width: 50px;

    
   ${mobile({ display: 'flex' })}
`

const DeleteButton = styled.button`
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 3px 0;
    cursor: pointer;
    background-color: #ef5350;
    color:white;
    transition: all 1s ease;
    &:hover{
        background-color: #ff1744;
    }
    ${mobile({ borderRadius: '6px' })}
`

const CartEmpty = styled.div`
    flex: 1;
    height: 216px;
    display: flex;
    justify-content: center;
    align-items: center;

    ${mobile({ height: '200px', flex: 'none' })}

    ${tablet({ margin: '15px 0' })}
`

const TextEmpty = styled.p`
    font-size: 24px;
    & a{
        color: #1976d2;
    }

    ${mobile({ fontSize: '20px' })}
`

const Cart = () => {
    const { products, quantity, total } = useSelector(state => state.cart)
    const { currentUser } = useSelector(state => state.user)
    const key = process.env.REACT_APP_PUBLIC_KEY
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [stripeToken, setStripeToken] = useState(null)
    const onToken = (token) => {
        setStripeToken(token)
    }
    const [messageError, setMessageError] = useState({
        isValid: false,
        openMessage: false,
        message: ''
    })

    const [transition, setTransition] = useState(undefined);
    const TransitionLeft = (props) => {
        return <Slide {...props} direction="left" />;
    }

    const handleClose = () => {
        setTransition(() => TransitionLeft)
        setMessageError({
            isValid: false,
            openMessage: false,
            message: ''
        });
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await api.checkout({
                    tokenId: stripeToken.id,
                    amount: 2000
                })
                if (res.data) {
                    await dispatch(clearCart())
                    await navigate('/success', {
                        state: {
                            stripeData: res.data,
                            cart: { products, quantity, total }
                        }
                    })
                } else {
                    setTransition(() => TransitionLeft)
                    setMessageError({
                        openMessage: true,
                        isValid: true,
                        message: 'Sign in to checkout'
                    })
                }
            } catch (error) {

            }
        }
        stripeToken && makeRequest()
    }, [stripeToken, navigate, products, quantity, total, currentUser, dispatch])

    const handleQuantity = async ({ type, id }) => {
        try {
            switch (type) {
                case 'decrease':
                    await dispatch(decrease({ id }))
                    break;
                case 'increase':
                    await dispatch(increase({ id }))
                    break;
                default:
                    break;
            }

        } catch (error) {

        }
    }

    const handleRemove = async (id) => {
        try {
            await dispatch(removeProduct({ id }))
        } catch (error) {

        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container>
            <Snackbar
                open={messageError.openMessage}
                onClose={handleClose}
                autoHideDuration={4000}
                TransitionComponent={transition}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                key={transition ? transition.name : ''}
            >
                <Alert onClose={handleClose} severity={messageError.isValid ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {messageError.message}
                </Alert>
            </Snackbar>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>
                        <Link to='/'>
                            CONTINUE SHOPPING
                        </Link>
                    </TopButton>
                    <TopTexts>
                        <TopText>Shopping bag({quantity})</TopText>
                        <TopText> Your Wishlist(0)</TopText>
                    </TopTexts>
                    {products.length >= 1 && (
                        <StripeCheckout
                            name="Danh Shop"
                            image='https://wallpaperaccess.com/full/836992.jpg'
                            billingAddress
                            shippingAddress
                            description="Your total is $20"
                            amount={total * 100}
                            token={onToken}
                            stripeKey={key}
                        >
                            <TopButton type='filled'>CHECKOUT NOW</TopButton>
                        </StripeCheckout>
                    )
                    }
                </Top>
                <Bottom>
                    {products.length >= 1 ? (<>
                        <Info>
                            {products.map((item, index) => (
                                <Fragment key={index}>
                                    <Product>
                                        <ProductDetail>
                                            <Image src={item?.img?.url} />
                                            <Detail>
                                                <ProductName><b>Product:</b> {item?.title} </ProductName>
                                                <ProductId><b>ID:</b> {item?._id} </ProductId>
                                                <ProductColor color={item?.color} />
                                                <ProductSize><b>Size:</b> {item?.size} </ProductSize>
                                            </Detail>
                                        </ProductDetail>
                                        <PriceDetail>
                                            <ProductAmountContainer>
                                                <Remove onClick={() => handleQuantity({ type: 'decrease', id: item.id_cart })} sx={{ cursor: 'pointer' }} />
                                                <ProductAmount>{item?.quantity}</ProductAmount>
                                                <Add onClick={() => handleQuantity({ type: 'increase', id: item.id_cart })} sx={{ cursor: 'pointer' }} />
                                            </ProductAmountContainer>
                                            <ProductPrice>$ {item?.price * item?.quantity} </ProductPrice>
                                            <DeleteMoblie onClick={() => handleRemove(item.id_cart)}>
                                                <DeleteButton><DeleteOutline /> </DeleteButton>
                                            </DeleteMoblie>
                                        </PriceDetail>
                                        <Delete>
                                            <DeleteButton onClick={() => handleRemove(item.id_cart)}>
                                                <DeleteOutline />
                                            </DeleteButton>
                                        </Delete>
                                    </Product>
                                    <Hr />
                                </Fragment>
                            ))}
                        </Info>
                        <Summary>
                            <SummaryTitle>ORDER SUMARY</SummaryTitle>
                            <SummaryItem>
                                <SummaryText>Subtotal</SummaryText>
                                <SummaryPrice>$ {total}</SummaryPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryText>Estimated Shipping</SummaryText>
                                <SummaryPrice>$ 6.5</SummaryPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryText>Shopping Discount</SummaryText>
                                <SummaryPrice>$ -6.5</SummaryPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryText>Total</SummaryText>
                                <SummaryPrice>$ {total} </SummaryPrice>
                            </SummaryItem>
                            <StripeCheckout
                                name="Danh Shop"
                                image='https://wallpaperaccess.com/full/836992.jpg'
                                billingAddress
                                shippingAddress
                                description="Your total is $20"
                                amount={total * 100}
                                token={onToken}
                                stripeKey={key}
                            >
                                <SummaryButton>CHECK NOW</SummaryButton>
                            </StripeCheckout>

                        </Summary>
                    </>) : (
                        <CartEmpty>
                            <TextEmpty>Your cart is empty, <Link to='/'>Go to shopping</Link></TextEmpty>
                        </CartEmpty>
                    )}

                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
