import { Close } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { logout } from '../feature/redux/authRedux';
import { mobile, tablet } from '../resposive';

const Container = styled.div`
    height: 60px;
    width: 100%;
   ${mobile({ height: '50px' })}

`
const Wrapper = styled.div`
    padding: 10px 30px;
    display: flex;
    justify-content: space-between;
    align-items:center;

    ${mobile({ padding: '10px 0px' })}
    ${tablet({ padding: '10px 10px' })}
`

const Left = styled.div`
    flex:1;
    display:flex;
    align-items:center;
`
const Language = styled.span`
    font-size:14px;
    cursor: pointer;

    ${mobile({ display: 'none' })}
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;

    ${mobile({ marginLeft: '10px' })}
    ${tablet({ marginLeft: '10px' })}
`
const Input = styled.input`
    border:none; 

    &:focus{
        outline:none
    }

    ${mobile({ width: '300px', padding: ' 5px' })}

`

const Center = styled.div`
    flex: 1;
    text-align: center;
    justify-content: center;
    align-items: center;
    ${mobile({ marginLeft: '10px', flex: '1' })}
`

const Logo = styled.h1`
    font-weight: bold;
    
    & a{
        text-decoration: none;
        color: inherit;
    }
   
    ${mobile({ fontSize: '18px', marginLeft: '7px' })}
    ${tablet({ fontSize: '25px' })}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    ${mobile({ flex: '9', justifyContent: 'flex-end', marginRight: '10px', paddingRight: '5px' })}
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;

    & a{
        text-decoration: none;
        color: inherit;
    }
   
    ${mobile({ fontSize: '10px', marginLeft: '11px' })}
`

const SearchMobile = styled.div`
    display: flex;
    padding-left: 10px;
`
const Drop = keyframes`
    0%{
        visibility: hidden;
        opacity: 0.2;
        transform: translateY(-30px);
    }
    50%{
        visibility: visible;
        opacity: 0.8;
        transform: translateY(-10px);
    }
    100%{
        visibility: visible;
        opacity: 1;
        transform: translateY(0px);
    }
`

const SerachMobileConatiner = styled.div`
    position: fixed;
    height: 50px;
    width: 100vw;
    left: 0;
    top: 30px;
    background-color: white;
    z-index: 2;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    display: flex;
    visibility: ${props => props.display ? 'visible' : 'hidden'}  ;
    animation: ${props => props.display && Drop}  0.5s linear;
`


const Navbar = () => {
    const { quantity } = useSelector(state => state.cart)
    const { currentUser } = useSelector(state => state.user)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const [display, setDisplay] = useState(false)
    const handleLogout = async () => {
        try {
            await dispatch(logout())
            await window.location.reload()
        } catch (error) {

        }
    }
    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/products?search=${search}`)
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    {matches
                        ? (
                            <SearchMobile>
                                <IconButton size='small' onClick={() => setDisplay(true)}>
                                    <SearchIcon style={{ fontSize: '18px', color: 'gray' }} />
                                </IconButton>
                                <SerachMobileConatiner display={display}>
                                    <form action="" onSubmit={handleSearch}>
                                        <Input placeholder='search...' value={search} onChange={e => setSearch(e.target.value)} />
                                    </form>
                                    <Close style={{ fontSize: '18px', color: 'gray' }} onClick={() => setDisplay(false)} />
                                </SerachMobileConatiner>
                            </SearchMobile>

                        )
                        : (
                            <SearchContainer>
                                <form action="" onSubmit={handleSearch}>
                                    <Input placeholder='search' value={search} onChange={e => setSearch(e.target.value)} />
                                </form>
                                <SearchIcon style={{ fontSize: '16px', color: 'gray' }} />
                            </SearchContainer>
                        )
                    }

                </Left>
                <Center>
                    <Logo><Link to='/'>DANHSOFT</Link></Logo>
                </Center>
                <Right>
                    {currentUser._id
                        ? (
                            <MenuItem onClick={handleLogout}>
                                LOGOUT
                            </MenuItem>
                        )
                        : (
                            <>
                                <MenuItem>
                                    <Link to='/register'>
                                        REGISTER
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to='/login'>
                                        SIGN IN
                                    </Link>
                                </MenuItem>
                            </>
                        )
                    }
                    <MenuItem>
                        <Link to='/cart'>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlinedIcon sx={{ fontSize: '18px', fontWeight: 200 }} />
                            </Badge>
                        </Link>
                    </MenuItem>
                </Right>
            </Wrapper >
        </Container >
    )
}

export default Navbar
