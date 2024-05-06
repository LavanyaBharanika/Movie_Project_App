import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActorList = ({ movieId }) => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=66a5d2ac54e044cbf317e6b91a7891c2`
        );

        // Extracting actors data from the response
        const actorsData = response.data.cast.map(actor => ({
            
          name: actor.name,
          image: `https://image.tmdb.org/t/p/w200${actor.profile_path}` // adjust the image size as needed
        }));

        setActors(actorsData);
      } catch (error) {
        console.error('Error fetching actors:', error);
      }
    };

    fetchActors();
  }, [movieId]);

  return (
    <div  style={{display:'flex', marginTop:10}}>
      
        {actors.slice(0, 6).map(actor => (
          <div key={actor.name} style={{marginRight:20}} >
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}><img src={actor.image} alt={actor.name} 
            style={{borderRadius:'50%', height:45, width:50}}/>
            <p style={{fontSize:'10px', fontWeight:'lighter', width:50}}>{actor.name}</p></div>
          </div>
        ))}
    </div>
  );
};

export default ActorList;
