import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Grid } from '@mui/material'
import axios from "axios";
const IMAGE_API='https://image.tmdb.org/t/p/w500'
import '../Pages/css/MovieDetails.css'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CastList from "./CastList";
import Similar from "./Similar";
import PopUp from "./PopUp";


const base_url="https://image.tmdb.org/t/p/w200"

export default function MovieDetails(){
    const location = useLocation();
   const navigate = useNavigate();
   const {id, title, overview, poster_path, release_date,vote_average} = location.state;
   const [movieId, setMovieId] = useState(id)
   console.log(movieId)
   const Reviw_API=`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=66a5d2ac54e044cbf317e6b91a7891c2&language=en-US&page=1` 
   
   const [isPopupOpen, setIsPopupOpen] = useState(false);

   const [review, setReview] = useState([]);
   useEffect(() => {
    axios.get(Reviw_API)
        .then((res) => {
            setReview(res.data.results);
          console.log(res.data.results)
        })
        .catch((error) => {
            console.error('Error fetching movies:', error);
          
        });
}, []);

   const handlePostReview = () => {
       setIsPopupOpen(true);
   };


   return(
        <div style={{paddingLeft:140}}>
            <Grid  container spacing={2}>

                <Grid item xs={7}  style={{marginTop:110}}>
                    <div style={{display:'flex'}}>
                    <div style={{lineHeight: '0%'}}>
                    <img src={IMAGE_API+poster_path} style={{height:320}}/>
                    <Button  onClick={handlePostReview} variant="contained" style={{marginTop:'18px', marginBottom:'30'}}>Post Review</Button>
                    </div>
                    <div style={{marginLeft:'25px'}}>
                    <h2>{title}</h2>
                    <p>
                    {overview}
                    </p>
                    {'Release Date: '+release_date}

                    <div >
                    <Typography style={{display:'flex', alignItems:'center'}}
                    component="legend">Rating : 
                    <Rating
                    name="simple-controlled"
                    value={vote_average}
                    /></Typography>
                    <h2 style={{marginTop:10}}>Actors</h2>
                    <CastList movieId={id} style={{lineHeight: '0%'}}/>
                    <div >
                    <Similar movieId={id}/>
                    </div>
                    </div>   
                    </div>
                    </div>
                </Grid>

                <Grid item xs={5}  style={{marginTop:110}}>

                <div style={{display:'flex'}}>
                <div className="vertical-line"></div> 
                <div  style={{display:'flex', flexDirection:'column'}}>
                <div>
                {review.map((res,index)=>{
                return(
           
                <div key={index}>
                   
                        <CardContent sx={{ flex: '1 0 1' }}>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <img src={`${base_url}${res.author_details.avatar_path}`}
                    style={{borderRadius:'50%', height:45, width:'50'}}
                    />
                    
                            <Typography component="div" variant="h5" >
                            {res.author}
                            </Typography></div>
                            <Typography style={{display:'flex', alignItems:'center'}}
                                component="legend">Rating : 
                            <Rating
                                name="simple-controlled"
                                value={res.author_details.rating}
                                /></Typography>
                            <Typography variant="body2" color="text.secondary" component="div" style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 7, WebkitBoxOrient: 'vertical' }}>
                            {res.content}
                            
                            </Typography>
                            
                         
                            <hr />
                        </CardContent>
                        </div>


                        )
                    })}

                </div>
                <div>
            
                </div>
                </div>
                </div>
                </Grid>

                </Grid>
                {isPopupOpen && <PopUp onClose={() => setIsPopupOpen(false)} movieId={id} movieTitle={title} movieposter={poster_path}/>}
                        </div>
                        
                    )
                }
