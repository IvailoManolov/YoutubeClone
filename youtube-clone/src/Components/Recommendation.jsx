import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Card from './Card';

const Container = styled.div`
    flex:2;
`

const Recommendation = ({tags}) => {

    const[videos,setVideos] = useState([]);
    
    useEffect(() => {
        const fetchVideos = async () => {
            const response = await axios.get(`/videos/tags?tags=${tags}`);
            setVideos(response.data);
        }

        fetchVideos();

    },[tags]);

  return (
    <Container>
        {videos?.map((video) => (
            <Card type="sm" key={video._id} video={video}/>
        ))}
    </Container>
  )
}

export default Recommendation