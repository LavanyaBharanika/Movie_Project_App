import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Similar = ({ movieId }) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const IMAGE_API='https://image.tmdb.org/t/p/w200'
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const apiKey = '66a5d2ac54e044cbf317e6b91a7891c2';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`);
        setSimilarMovies(response.data.results);
        console.log(response.data.results)
      } catch (error) {
        console.error('Error fetching similar movies:', error);
      }
    };

    fetchSimilarMovies();
  }, [movieId]);

   
  return (
    <div >
      <h2>Similar Movies</h2>
      <div style={{display:'flex',flexWrap:'wrap'}}>
        {similarMovies.splice(0,12).map((movie) => (
          
          <div key={movie.id} >
                
                    <img onClick={()=>navigate(`/movie/'${movie.id}`, {state: movie})}  src={IMAGE_API+movie.poster_path}  width={80}/>
                    <Card.Title style={{fontSize:'0.8rem', fontWeight:'lighter', width:'100px', marginRight:10}}>{movie.title}</Card.Title>
                </div>
                
        ))}
        </div>
    </div>
  );
};

export default Similar;
