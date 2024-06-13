import React, { useEffect, useState } from "react";
import axios from "./axios";
import "../src/Row.css";
import { Card } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";


const base_url = "https://image.tmdb.org/t/p/w200";

function Rows({ title, fetchUrl, user }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    navigate("/movie/" + movie.id, { state: movie });
  };



  return (
    <div className="movie-list">
      <h2>{title}</h2>
      <Swiper
        slidesPerView="auto"
        slidesToScroll="6"
        autoplay="true"
        pauseOnHover="true"
        spaceBetween="1"
        slidesToShow="5"
        swipeToSlide="true"
      >
        {movies.map((movie) => (
          <SwiperSlide
            onClick={() => handleClick(movie)}
            className="row__poste"
            key={movie.id}
          >
            <img
              src={`${base_url}${movie.poster_path}`}
              height={190}
              className="row__poster"
              alt={movie.title}
            />
            <Card.Title
              className="row__poster"
              style={{
                fontSize: "0.8rem",
                fontWeight: "lighter",
                width: "100px",
                marginRight: 10,
              }}
            >
              {movie.title}
            </Card.Title>
          </SwiperSlide>
        ))}
      </Swiper>
   
    </div>
  );
}

export default Rows;
