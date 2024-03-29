import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { loginSuccess,loginStart, loginFailure } from '../Redux/userSlice';

import {auth,provider} from '../firebase';
import {signInWithPopup} from 'firebase/auth';

const Container = styled.div`
    display: flex;
    align-items:center;
    flex-direction:column;
    justify-content:center;
    height:86vh;
    color:${({theme}) => theme.text};
`

const Wrapper = styled.div`
    display: flex;
    align-items:center;
    flex-direction:column;
    padding:20px 50px;
    background-color:${({theme}) => theme.bgLighter};
    border: 1px solid ${({theme}) => theme.soft};
    gap:10px;
`

const Title = styled.h1`
    font-size:24px;
`

const SubTitle = styled.h2`
    font-size:20px;
    font-weight:300;
`

const Input = styled.input`
    border:1px solid ${({theme}) => theme.soft};
    border-radius:3px;
    padding: 10px;
    background-color:transparent;
    width:100%;
`

const Button = styled.button`
    border-radius:3px;
    border:none;
    padding: 10px 20px;
    cursor:pointer;
    font-weight:500;
    background-color:${({theme}) => theme.soft};
    color:${({theme}) => theme.textSoft};
`
const More = styled.div`
    display: flex;
    margin-top:10px;
    font-size:12px;
    color:${({theme}) => theme.textSoft};
`
const Links = styled.div`
    margin-left:50px;
`
const Link = styled.span`
    margin-left:30px;
`

const Signin = () => {

    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[pass,setPass] = useState("");

    const dispatch = useDispatch();

    const handleLogin = async(e) => {
        e.preventDefault();

        dispatch(loginStart());

        try{
            const res = await axios.post('/authentication/signin', {name,pass});

            dispatch(loginSuccess(res.data));

        }catch(err){
            dispatch(loginFailure());
        }
    }

    const handleSigninWithGoogle = async() => {
        try{
            dispatch(loginStart);
            const res = await signInWithPopup(auth,provider);

            const user = await axios.post('/authentication/google', {
                name:res.user.displayName,
                email:res.user.email,
                img:res.user.photoURL
            });

            dispatch(loginSuccess(user.data));

            console.log(res)
        }
        catch(err){
            dispatch(loginFailure);
            console.log(err);
        }
    }

  return (
    <Container>
        <Wrapper>
            <Title>
                Sign in
            </Title>

            <SubTitle>
                to continue to YouTube
            </SubTitle>

            <Input placeholder='username' onChange={e=> setName(e.target.value)}/>
            <Input placeholder='password'onChange={e=> setPass(e.target.value)} type="password"/>

            <Button onClick={handleLogin}> Sign in </Button>

            <Title>
                or
            </Title>

            <Button onClick={handleSigninWithGoogle}>
                Sign in with Google
            </Button>

            <Title>
                No account yet ?
            </Title>

            <Input placeholder='username' onChange={e=> setName(e.target.value)}/>
            <Input placeholder='email' onChange={e=> setEmail(e.target.value)} type='email'/>
            <Input placeholder='password' onChange={e=> setPass(e.target.value)} type="password"/>

            <Button> Sign up </Button>
        </Wrapper>
        <More>
            English(US)
            <Links>
                <Link>
                    Help
                </Link>

                <Link>
                    Privacy
                </Link>

                <Link>
                    Terms
                </Link>
            </Links>
        </More>
    </Container>
  )
}

export default Signin