import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Navbars from "./Pages/Navbars";
import Sidebar from "./Pages/Sidebar";
import Overviews from "./Pages/Overviews";
import MovieDetails from "./Pages/MovieDetails";
import CastList from "./Pages/CastList";
import Similar from "./Pages/Similar";
import Ratings from "./Pages/Ratings";
import PopUp from "./Pages/PopUp";
import Profile from "./Pages/Profile";
import { auth } from './firebase'; // Import your firebase auth object

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const isGuest = localStorage.getItem('isGuest') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route
          path="/*"
          element={(isAuthenticated || isGuest) ? (
            <>
              <Navbars />
              <Sidebar />
              <PrivateRoutes />
            </>
          ) : (
            <Navigate to="/login" replace />
          )}
        />
      </Routes>
    </Router>
  );
}

function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home auth={auth} />} />
      <Route path="/overviews" element={<Overviews />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/Castlist" element={<CastList />} />
      <Route path="/similar" element={<Similar />} />
      <Route path="/popup" element={<PopUp />} />
      <Route path="/rating" element={<Ratings />} />
      <Route path="/profile/:userEmail" element={<Profile />} />
    </Routes>
  );
}
