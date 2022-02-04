import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchProduct, searchProduct } from '../feature/redux/productRedux'
import { mobile, tablet } from '../resposive'
import ProductItem from './ProductItem'
import { LoadingContent } from './StyleMui'

const Container = styled.div`
    width:100%;
    padding: 20px;
    display: flex;
    justify-content: center;
`
const Wrapper = styled.div`
    max-width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    ${mobile({ maxWidth: '100%', justifyContent: 'center' })}
`

const LoadingContainer = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    ${mobile({ maxWidth: '48%', minWidth: '47%', height: '250px' })};

    ${tablet({ maxWidth: '31%', minWidth: '30%', height: '300px' })};
`

const Products = ({ cat, filter, sort, search }) => {
    const [filteredProduct, setFilteredProduct] = useState([])

    const { products, isLoading } = useSelector(state => state.product)
    const dispatch = useDispatch();

    useEffect(() => {
        const product = async () => {
            try {
                await dispatch(fetchProduct(cat))
            } catch (error) {
                console.log(error);
            }
        }
        product()
    }, [dispatch, cat])

    useEffect(() => {
        const product = async () => {
            try {
                await dispatch(searchProduct(search))
            } catch (error) {
                console.log(error);
            }
        }
        product()
    }, [dispatch, search])

    useEffect(() => {
        (search || cat) && setFilteredProduct(
            products.filter((item) =>
                Object.entries(filter).every(([key, value]) =>
                    item[key].includes(value)
                )
            )
        )
    }, [cat, search, filter, products])

    useEffect(() => {
        if (sort === 'newest') {
            setFilteredProduct((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt))
        } else if (sort === 'asc') {
            setFilteredProduct((prev) => [...prev].sort((a, b) => a.price - b.price))
        } else {
            setFilteredProduct((prev) => [...prev].sort((a, b) => b.price - a.price))
        }
    }, [sort])

    return (
        <Container>
            <Wrapper>
                {isLoading ? (
                    [...new Array(8).keys(0)].map((item, index) => (
                        <LoadingContainer key={index}>
                            <LoadingContent variant="rectangular" />
                            <CircularProgress color="inherit" sx={{ position: 'absolute', color: '#bdbdbd' }} />
                        </LoadingContainer>
                    ))
                ) : (
                    cat ? filteredProduct.map((item, index) => (
                        <ProductItem key={index} item={item} />
                    )) : search ?
                        filteredProduct.map((item, index) => (
                            <ProductItem key={index} item={item} />
                        )) : products.slice(0, 8).map((item, index) => (
                            <ProductItem key={index} item={item} />
                        ))
                )}
            </Wrapper>
        </Container>
    )
}

export default Products
