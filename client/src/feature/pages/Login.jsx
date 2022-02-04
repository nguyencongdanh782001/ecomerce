import { CircularProgress } from '@mui/material'
import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as yup from 'yup'
import { mobile, tablet } from '../../resposive'
import { signIn } from '../redux/authRedux'
import Cookies from 'js-cookie'

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(rgba(225, 225, 225 ,0.6), rgba(225, 225, 225, 0.2)), url(https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940) center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center
`

const Wrapper = styled.div`
    width:25%;
    padding: 20px;
    background-color: white;

    ${mobile({ width: '85%' })};

    ${tablet({ width: '50%' })}
`

const Title = styled.h1`
    font-size: 24px; 
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Input = styled.input`
    flex: 1;
    width:100%;
    margin: 10px 0;
    padding: 10px;
    border: ${props => props.error ? '1px solid red' : '1px solid black'}
`

const Button = styled.button`
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    font-weight: 500;
    margin-bottom: 10px;
    cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};

    ${mobile({ marginTop: '6px', padding: '10px' })}
`

const LinkText = styled.span`
    margin: 5px 0;
    font-size: 12px;
    text-decoration: underline;
    color: black;
    cursor: pointer;
`
const Error = styled.span`
    color: red;
    font-size: 13px;
    margin-bottom: 10px;
    
`

const Loading = styled.div`
    margin-right: 10px;
`

const Login = () => {
    const { isLoading, error } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValue = {
        username: '',
        password: ''
    }

    const yupSchema = yup.object().shape({
        username: yup.string().required('username is required!'),
        password: yup.string().required('password is required!'),
    })

    const handleLogin = async (values) => {
        try {
            const res = await dispatch(signIn(values))
            if (res.type === 'auth/login/fulfilled') {
                await Cookies.set('token', res.payload.accessToken, { expires: 3 })
                await navigate('/')
                await window.location.reload()
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Formik
                    initialValues={initialValue}
                    validationSchema={yupSchema}
                    onSubmit={handleLogin}
                >
                    {props => (
                        <Form autoComplete="off" onSubmit={props.handleSubmit}>
                            <Input type="text" placeholder="username" name="username" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.username} error={(props.errors.username && props.touched.username) ? true : false} />
                            {props.errors.username && props.touched.username ? (<Error>{props.errors.username}</Error>) : null}
                            <Input type="password" placeholder="password" name="password" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.password} error={props.errors.password && props.touched.password ? true : false} />
                            {props.errors.password && props.touched.password ? (<Error>{props.errors.password}</Error>) : null}
                            <Button disabled={isLoading ? true : false} type='submit' isLoading={isLoading}>
                                {isLoading && (<Loading><CircularProgress style={{ color: 'white' }} size={15} /></Loading>)} LOGIN
                            </Button>
                            {error && <Error>{error}!</Error>}
                            <div>
                                <LinkText >DO NOT YOU REMEMBER THE PASSWORD?</LinkText>
                            </div>
                            <Link to='/register'>
                                <LinkText >CREATE A NEW ACCOUNT</LinkText>
                            </Link>
                        </Form>
                    )}
                </Formik>

            </Wrapper>
        </Container >
    )
}

export default Login
