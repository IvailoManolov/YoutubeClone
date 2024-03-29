import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from "styled-components"

const Container=styled.div`
    display: flex;
    gap:10px;
    margin:30px 0px;
`

const Avatar = styled.img`
    width:50px;
    height:50px;
    border-radius:50%;
`

const Details = styled.div`
    display: flex;
    flex-direction:column;
    gap: 10px;
    color:${({theme}) => theme.text};
`

const Name = styled.span`
    font-size:13px;
    font-weight:500;
`

const Date = styled.span`
    font-size:12px;
    font-weight:400;
    color : ${({theme}) => theme.textSoft};
    margin-left:5px;
`

const Text = styled.span`
    font-size: 14px;
`

const Comment = ({comment}) => {

    const[channel,setChannel] = useState({});

    useEffect(() => {
        const fetchComment = async () => {
            //First find the user who wrote the particular comment.
            const channel = await axios.get(`/channels/find/${comment.userId}`);
            setChannel(channel);
        }

        fetchComment();
    },[]);

  return (
    <Container>
    <Avatar src={channel.img}/>
        <Details>
            <Name>
                {channel.name}
                <Date>
                    1 day ago
                </Date>
            </Name>
            <Text>
                {comment.description}
            </Text>
        </Details>
    </Container>
  )
}

export default Comment