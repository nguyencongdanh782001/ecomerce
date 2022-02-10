import { Add, Remove } from '@mui/icons-material'
import { Alert, Skeleton, Slide, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../../components/Announcement'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Newsletter from '../../components/Newsletter'
import { mobile, tablet } from '../../resposive'
import { addProduct } from '../redux/cartRedux'
import { fetchProductDetail } from '../redux/productRedux'
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div``

const Wrapper = styled.div`
    padding:50px;
    display: flex;

    ${mobile({ padding: '10px', flexDirection: 'column' })}
`

const ImgContainer = styled.div`
    flex:1;
`

const Image = styled.img`
    height: 90vh;
    width: 100%;
    object-fit: cover;

    ${mobile({ height: '40vh' })};

    ${tablet({ height: '40vh' })};
`

const InfoConatiner = styled.div`
    flex:1;
    padding: 0 50px;

    ${mobile({ padding: '10px' })}
`

const Title = styled.h1`
    font-weight: 200;

    ${tablet({ fontSize: '28px' })};
`

const Description = styled.p`
    margin: 20px 0;
    font-size: 17px;
    line-height: 23px;
    letter-spacing: 0.6px;

    ${tablet({ fontSize: '14px', margin: '15px 0' })};
`

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;

    ${tablet({ fontSize: '35px' })};
`

const FilterConatiner = styled.div`
    width: 50%;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;

    ${mobile({ width: '100%' })};

    ${tablet({ width: '100%' })};
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
    margin-right: 5px;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${prop => prop.color};
    cursor: pointer;
    position: absolute;
    border: 1px solid rgb(163 163 163);
`

const ColorActive = styled.div`
    border: ${prop => prop.active && "2px solid rgb(6 182 212)"};
    width: 28px;
    height: 28px;
    border-radius: 50%;
    position: relative;
    margin: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FilterSizeSelect = styled.select`
    margin-left: 10px;
    padding: 5px;
`

const FiterSizeOption = styled.option`
  
`

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${mobile({ width: '100%' })};

    ${tablet({ width: '100%' })}
`

const AmoutContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border: 1px solid teal;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }

  ${tablet({ padding: '10px' })}
`

const LoadingImg = styled.div`
    height: 90vh;
    width: 100%;
    object-fit: cover;

    ${mobile({ height: '40vh' })};

    ${tablet({ height: '40vh' })};
`

const ProductDetail = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2]
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const { productDetail, isLoadingProductDetail } = useSelector(state => state.product)
    const { currentUser } = useSelector(state => state.user)
    const [messageError, setMessageError] = useState({
        isValid: false,
        openMessage: false,
        message: ''
    })

    const dispatch = useDispatch()

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
        const product = async () => {
            try {
                await dispatch(fetchProductDetail(id))
            } catch (error) {
                console.log(error);
            }
        }
        product()
    }, [dispatch, id])

    const handleColor = (color) => {
        setColor(color)
    }

    const handleQuantity = (type) => {
        if (type === "desc") {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const handleAddCart = async () => {
        if (!currentUser._id) {
            setTransition(() => TransitionLeft)
            setMessageError({
                openMessage: true,
                isValid: true,
                message: 'Sign in to add to cart'
            })
        } else if (!size || !color) {
            setTransition(() => TransitionLeft)
            setMessageError({
                openMessage: true,
                isValid: true,
                message: 'Please choose color and size'
            })
        } else if (color !== '' || size !== '') {
            await dispatch(addProduct({ product: { ...productDetail, color, size, quantity: quantity, id_cart: uuidv4() }, quantity: quantity, price: quantity * productDetail.price }))
            setTransition(() => TransitionLeft)
            setMessageError({
                openMessage: true,
                isValid: false,
                message: 'Add to cart successfully'
            })
        }

    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                {isLoadingProductDetail ? (
                    <>
                        <ImgContainer>
                            <LoadingImg>
                                <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%' }} />
                            </LoadingImg>
                        </ImgContainer>
                        <InfoConatiner>
                            <Title>
                                <Skeleton variant="text" sx={{ width: '100%', height: '100%' }} />
                            </Title>
                            <Description>
                                <Skeleton variant="text" sx={{ width: '100%', height: '100%' }} />
                                <Skeleton variant="text" sx={{ width: '100%', height: '100%' }} />
                                <Skeleton variant="text" sx={{ width: '100%', height: '100%' }} />
                                <Skeleton variant="text" sx={{ width: '100%', height: '100%' }} />
                            </Description>
                            <Price>
                                <Skeleton variant="text" sx={{ width: '200px', height: '40px' }} />
                            </Price>
                            <FilterConatiner>
                                <Filter>
                                    <FilterTitle>Color</FilterTitle>
                                    <Skeleton variant="text" sx={{ width: '100px', height: '40px' }} />
                                </Filter>
                                <Filter>
                                    <FilterTitle>Size</FilterTitle>
                                    <Skeleton variant="text" sx={{ width: '100px', height: '40px' }} />
                                </Filter>
                            </FilterConatiner>
                            <AddContainer>
                                <AmoutContainer>
                                    <Skeleton variant="text" sx={{ width: '150px', height: '80px' }} />
                                </AmoutContainer>
                                <Button onClick={handleAddCart} disabled>ADD TO CART</Button>
                            </AddContainer>
                        </InfoConatiner>
                    </>
                ) : (
                    <>
                        <ImgContainer>
                            <Image src={productDetail?.img?.url} />
                        </ImgContainer>
                        <InfoConatiner>
                            <Title>{productDetail?.title}</Title>
                            <Description>
                                {productDetail?.desc}
                            </Description>
                            <Price>$ {productDetail?.price}</Price>
                            <FilterConatiner>
                                <Filter>
                                    <FilterTitle>Color</FilterTitle>
                                    {productDetail?.color?.map((item, index) => (
                                        <ColorActive key={index} active={item === color ? true : false}>
                                            <FilterColor color={item} onClick={() => handleColor(item)} />
                                        </ColorActive>

                                    ))}
                                </Filter>
                                <Filter>
                                    <FilterTitle>Size</FilterTitle>
                                    <FilterSizeSelect onChange={(e) => setSize(e.target.value)}>
                                        <FiterSizeOption disabled selected>size</FiterSizeOption>
                                        {productDetail?.size?.map((item, index) => (
                                            <FiterSizeOption key={index}>{item}</FiterSizeOption>
                                        ))}
                                    </FilterSizeSelect>
                                </Filter>
                            </FilterConatiner>
                            <AddContainer>
                                <AmoutContainer>
                                    <Remove onClick={() => handleQuantity("desc")} style={{ cursor: 'pointer', color: `${quantity <= 1 ? 'rgb(156 163 175)' : 'inherit'}` }} />
                                    <Amount>{quantity}</Amount>
                                    <Add onClick={() => handleQuantity("asc")} style={{ cursor: 'pointer' }} />
                                </AmoutContainer>
                                <Button onClick={handleAddCart}>ADD TO CART</Button>
                                <Snackbar
                                    open={messageError.openMessage}
                                    onClose={handleClose}
                                    autoHideDuration={1800}
                                    TransitionComponent={transition}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    key={transition ? transition.name : ''}
                                >
                                    <Alert severity={messageError.isValid ? 'error' : 'success'} sx={{ width: '100%' }}>
                                        {messageError.message}
                                    </Alert>
                                </Snackbar>
                            </AddContainer>
                        </InfoConatiner>
                    </>
                )}

            </Wrapper>
            <Newsletter />
            <Footer />
        </Container >
    )
}

export default ProductDetail
