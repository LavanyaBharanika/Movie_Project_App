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

  // Check authentication status on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        setIsAuthenticated(true);
      } else {
        // No user is signed in.
        setIsAuthenticated(false);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Private routes */}
        <Route
          path="/*"
          element={isAuthenticated ? (
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

// Private routes (routes accessible only after login)
function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
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
