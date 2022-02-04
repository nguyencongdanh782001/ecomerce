import { CircularProgress } from '@mui/material'
import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as yup from 'yup'
import { mobile, tablet } from '../../resposive'
import { signUp } from '../redux/authRedux'

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(rgba(225, 225, 225 ,0.6), rgba(225, 225, 225, 0.2)), url(https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940) center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center
`

const Wrapper = styled.div`
    width:40%;
    padding: 20px;
    background-color: white;

    ${mobile({ width: '90%' })};

    ${tablet({ width: '50%' })}
`

const Title = styled.h1`
    font-size: 24px; 
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`

const InputArea = styled.div`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;  
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: ${props => props.error ? '1px solid red' : '1px solid black'}
`

const Agreement = styled.span`
    font-size: 13px;
    line-height: 20px;
    margin: 20px 0;

    ${mobile({ margin: '15px 0 13px 0' })}
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
    cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};

    ${mobile({ padding: '10px' })}
`

const ButtonArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction:column;
    justify-content: center;
`

const Error = styled.span`
    color: red;
    font-size: 13px;
    margin-top: ${props => props.errorServer ? '10px' : '5px'} ;
    ${mobile({ fontSize: '10px' })}
`

const Loading = styled.div`
    margin-right: 10px;
`

const Register = () => {
    const { isLoading, error } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValue = {
        name: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        confirmpassword: '',
    }

    const yupSchema = yup.object().shape({
        name: yup.string().required('name is required!').max(8, 'name up to 8 characters'),
        lastname: yup.string().required('last name is required!').max(8, 'last name up to 8 characters'),
        email: yup.string().email('must be a email').required('email is required!'),
        username: yup.string().required('username is required!').min(6, 'username at least 6 characters'),
        password: yup.string().required('password is required!').min(6, 'password at least 6 characters'),
        confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'confirm password is not match').required('confirm password is required!'),
    })

    const handleRegister = async (values) => {
        try {
            const res = await dispatch(signUp(values))
            if (res.type === 'auth/register/fulfilled') {
                await navigate('/login')
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
                <Title>CREATE AN ACCOUNT</Title>
                <Formik
                    initialValues={initialValue}
                    validationSchema={yupSchema}
                    onSubmit={handleRegister}
                >
                    {props => (
                        <Form autoComplete="off" onSubmit={props.handleSubmit}>
                            <InputArea>
                                <Input type='text' placeholder="name" name="name" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.name} error={(props.errors.name && props.touched.name) ? true : false} />
                                {props.errors.name && props.touched.name ? (<Error>{props.errors.name}</Error>) : null}
                            </InputArea>
                            <InputArea>
                                <Input type='text' placeholder="last name" name="lastname" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.lastname} error={(props.errors.lastname && props.touched.lastname) ? true : false} />
                                {props.errors.lastname && props.touched.lastname ? (<Error>{props.errors.lastname}</Error>) : null}
                            </InputArea>
                            <InputArea>
                                <Input type='text' placeholder="email" name="email" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.email} error={(props.errors.email && props.touched.email) ? true : false} />
                                {props.errors.email && props.touched.email ? (<Error>{props.errors.email}</Error>) : null}
                            </InputArea>
                            <InputArea>
                                <Input type='text' placeholder="username" name="username" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.username} error={(props.errors.username && props.touched.username) ? true : false} />
                                {props.errors.username && props.touched.username ? (<Error>{props.errors.username}</Error>) : null}
                            </InputArea>
                            <InputArea>
                                <Input type='password' placeholder="password" name="password" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.password} error={(props.errors.password && props.touched.password) ? true : false} />
                                {props.errors.password && props.touched.password ? (<Error>{props.errors.password}</Error>) : null}
                            </InputArea>
                            <InputArea>
                                <Input type='password' placeholder="confirm password" name="confirmpassword" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.confirmpassword} error={(props.errors.confirmpassword && props.touched.confirmpassword) ? true : false} />
                                {props.errors.confirmpassword && props.touched.confirmpassword ? (<Error>{props.errors.confirmpassword}</Error>) : null}
                            </InputArea>
                            <Agreement>
                                By creating an account, I consent to the processing of my personal
                                data in accordance with the <b>PRIVACY POLICY</b>
                            </Agreement>
                            <ButtonArea>
                                <Button disabled={isLoading ? true : false} type='submit' isLoading={isLoading}>
                                    {isLoading && (<Loading><CircularProgress style={{ color: 'white' }} size={13} /></Loading>)} CREATE
                                </Button>
                                {error && <Error errorServer={true}>{error}!</Error>}
                            </ButtonArea>

                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </Container>
    )
}

export default Register
