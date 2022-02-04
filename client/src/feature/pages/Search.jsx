import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../../components/Announcement'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Newsletter from '../../components/Newsletter'
import Products from '../../components/Products'
import { mobile } from '../../resposive'
import { searchProduct } from '../redux/productRedux'

const Container = styled.div``

const Title = styled.h1`
    margin:20px
`

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const Filter = styled.div`
    margin:20px;
    
    ${mobile({ margin: '0 20px', display: 'flex', flexDirection: 'column' })}
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`

const Select = styled.select`
    padding: 10px;
    margin: 10px;
    cursor: pointer;

    ${mobile({ margin: '11px 2px' })}

`

const Option = styled.option`
`

const SearchProduct = () => {
    const location = useLocation()

    const search = location.search.split('=')[1]
    console.log(search)
    const [filter, setFiler] = useState({});
    const [sort, setSort] = useState('Newest')
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)

    const handleFilter = (e) => {
        const value = e.target.value
        setFiler({
            ...filter,
            [e.target.name]: value
        })
    }

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

    const color = products.map(item => item.color.toString())
    const objColor = color.toString().split(',').reduce((p, c) => ({ ...p, [c]: c !== p }), {})
    const listColor1 = Object.entries(objColor)
    const listColor2 = Object.entries(listColor1.map(item => item[0]).toString().split(', ').toString().split(',').reduce((p, c) => ({ ...p, [c]: c !== p }), {}))

    const size = products.map(item => item.size.toString())
    const objSize = size.toString().split(',').reduce((p, c) => ({ ...p, [c]: c !== p }), {})
    const listSize1 = Object.entries(objSize)
    const listSize2 = Object.entries(listSize1.map(item => item[0]).toString().split(', ').toString().split(',').reduce((p, c) => ({ ...p, [c]: c !== p }), {}))

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Title>Result for: {search}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="color" onChange={handleFilter}>
                        <Option disabled>Color</Option>
                        {listColor2.map((item, index) => (
                            <Option value={item[0]} key={index} style={{ textTransform: 'capitalize' }}>{item[0]}</Option>
                        ))}
                    </Select>
                    <Select name="size" onChange={handleFilter}>
                        <Option disabled>Size</Option>
                        {listSize2.map((item, index) => (
                            <Option value={item[0]} key={index} style={{ textTransform: 'capitalize' }}>{item[0]}</Option>
                        ))}
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={e => setSort(e.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products search={search} filter={filter} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default SearchProduct
