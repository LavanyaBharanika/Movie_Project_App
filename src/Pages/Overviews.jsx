import React, { useEffect, useState } from "react";

import axios from 'axios';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const MOVIE_API='https://api.themoviedb.org/3/movie/now_playing?api_key=66a5d2ac54e044cbf317e6b91a7891c2&language=en-US&page=1';

const IMAGE_API='https://image.tmdb.org/t/p/w500'

export default function Overviews(){
    const [movies, setMovies] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(MOVIE_API)
            .then((resp) => {
                setMovies(resp.data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching movies:', error);
                setLoading(false);
            });
    }, []);
    const handleClick = (movie)=>{
        navigate('/movie/' +movie.id, {state: movie})
    }
    
    return (
        <div style={{ display: 'flex', paddingTop: '78px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '0 30px',marginLeft:180 }}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    movies.map((movie, index) => (
                        <div key={index} style={{ width: 'calc(50% - 10px)', marginBottom: '20px'}}>
                            <Card sx={{ display: 'flex', height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 170, height: 185 }}
                                    image={IMAGE_API+movie.poster_path}
                                    alt="Live from space album cover"
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <CardContent sx={{ flex: '1 0 1' }}>
                                        <Typography component="div" variant="h5" gutterBottom>
                                            {movie.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" component="div" style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                            {movie.overview}
                                        </Typography>
                                    </CardContent>
                                    <CardActions >
                                        <Button size="small">{'Rating: '+Math.floor(movie.vote_average)}</Button>
                                        <Button onClick={()=>handleClick(movie)}  size="small">Learn More</Button>
                                    </CardActions>
                                </Box>
                            </Card>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
