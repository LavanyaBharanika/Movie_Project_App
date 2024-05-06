const API_KEY = '66a5d2ac54e044cbf317e6b91a7891c2';

 const requests={
    NowPlaying : `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
    PopularMovies :`/movie/popular?api_key=${API_KEY}&language=en-US&page=1` ,
    TopRated : `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    UpcomingMovies : `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
};


export default requests;