import React,  { useState, useEffect }  from "react";
import Button from 'react-bootstrap/Button';
import LogoImg from '../assets/00001.png'
import '../Nav.css';
import { Link } from "react-router-dom";
import { auth } from "../firebase";

export default function Navbars() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []); // Dependency array is empty to run the effect only once on mount

  const handleLogout = () => {
    auth.signOut();
  };

  return (   
        <div className="nav">
            <div  className="nav__logo">
            <img
              alt=""
              src={LogoImg}
              width={'58px'}
             onClick={()=>navigate('/home')}
            /> <h6>Cinematic Clik</h6>            
            </div>
            <div style={{right:0, marginLeft:'80rem'}}>
                
            {user ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Link to="/login">Login</Link>
          )}
            </div>
        </div>
    )
}