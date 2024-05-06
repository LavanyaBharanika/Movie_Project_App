import React, {useState, useEffect} from "react";
import Sidebar from "./Sidebar";
import Rows from "../Rows";
import requests from '../request'

export default function Home(){
    

    return(
        <div style={{display:'flex', paddingTop:'78px'}}>
            
            <div style={{marginLeft:'160px'}}>
                <Rows title='Playing Now' fetchUrl={requests.NowPlaying}
                    />
                    <Rows title='Popular Movies'  fetchUrl={requests.PopularMovies}
                    />
                    <Rows title='Top Rated' fetchUrl={requests.TopRated} 
                    />
                    <Rows title='UpComing Movies' fetchUrl={requests.UpcomingMovies}
                    />
            </div>
        </div>
    )
}