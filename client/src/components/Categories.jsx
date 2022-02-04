import React from 'react'
import styled from 'styled-components'
import { categories } from '../data'
import { mobile, tablet } from '../resposive'
import CategoryItem from './CategoryItem'

const Container = styled.div`
    width:100%;
    display:flex;
    padding: 20px;
    justify-content: center;

    ${mobile({ padding: '0' })}
`

const Wrapper = styled.div`
    max-width:85%;
    height: 100%;
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
    ${mobile({ maxWidth: '99%', minWidth: '99%', flexDirection: 'column', justifyContent: 'center' })};
    
    ${tablet({ maxWidth: '90%', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' })}
`

const Categories = () => {
    return (
        <Container>
            <Wrapper>
                {categories.map((item, index) => (
                    <CategoryItem key={index} item={item} />
                ))}
            </Wrapper>
        </Container>
    )
}

export default Categories
