import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import SwitchVideoOutlinedIcon from '@mui/icons-material/SwitchVideoOutlined';
import { useState } from 'react';
import Upload from './Upload';

const Container = styled.div`
position:sticky;
top:0;
background-color:${({theme}) => theme.bgLighter}

`

const Wrapper = styled.div`
display: flex;
align-items:center;
justify-content:flex-end;
height: 8vh;
padding : 0px 20px;
position:relative;
`

const Search = styled.div`
width: 40%;
height:50%;
position:absolute;
left:0px;
right:0px;
margin:auto;
display: flex;
align-items:center;
justify-content:space-between;
  
`

const SearchIconContainer = styled.div`
  position:absolute;
  display: flex;
  margin:auto;
  align-items:center;
  justify-content:center;
  height:49%;
  left:0px;
  right:35px;
  margin:auto;
  width:5%;
  background-color:lightgray;
  border:1px solid black;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor:pointer;
`

const Input = styled.input`
  height:92%;
  width:40%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  outline:none;
  border:1px solid black;
`

const Button = styled.button`
    padding:5px 15px;
    background-color:transparent;
    border:1px solid #3ea6ff;
    color:#3ea6ff;
    border-radius:3px;
    font-weight:500;
    cursor:pointer;
    display: flex;
    align-items:center;
    gap:5px;
`

const User = styled.div`
  display:flex;
  align-items:center;
  gap:10px;
  font-weight:500;
  color:${({theme}) => theme.text};
`

const Avatar = styled.img`
  width:32px;
  height:32px;
  border-radius:50%;
  background-color:#999;
`

const Navbar = () => {

  const currentUser = useSelector(state => state.user.currentUser);

  const[open,setIsOpen] = useState(false);
  const navigate = useNavigate();
  const[q,setQ] = useState("");


  return (
  <>
    <Container>
      <Wrapper>

        <Search>
          <Input placeholder='Search' onChange={(e)=>setQ(e.target.value)}/>          
        </Search>

        <SearchIconContainer onClick={()=>navigate(`/search?q=${q}`)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-1 h-1 " height={"20px"} width={"20px"}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        </SearchIconContainer>

        { currentUser ? (
            <User>
             <SwitchVideoOutlinedIcon onClick={()=>setIsOpen(true)}/>
             <Avatar src={currentUser.img}/>
             {currentUser.name}
            </User>
        ) :
         <Link to={"signin"} style={{textDecoration:'none'}}>
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-1 h-1" height={"15px"} width={"15px"}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            SIGN IN
          </Button>
          </Link>}

      </Wrapper>
    </Container>

    {open && <Upload setIsOpen={setIsOpen}/>}
  </>
  )
}

export default Navbar