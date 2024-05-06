import { Rating } from "@mui/material";
import React, {  useState } from "react";
import Button from '@mui/material/Button';
import './css/Popup.css'
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function PopUp({ onClose, movieId, movieTitle, movieposter }) {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = async () => {
        try {
            const movieRef = doc(db, "reviews", `${movieId}`);
            await setDoc(movieRef, {
                moviePoster:movieposter,
                movieName: movieTitle,
                movieReview: review,
                movieRating: rating,
            });
            onClose();
        } catch (err) {
            console.error(err);
        }
    };
   

    return (
        <div className="popup">
            <div className="content">
                <div className="text">
                    <textarea onChange={(e) => setReview(e.target.value)} className="area" name="" id="" cols="30" rows="2" placeholder="Enter your review here"></textarea>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        Rating: <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} />
                    </div>
                    <Button onClick={handleSubmit} variant="contained" style={{ marginTop: '18px' }}>Submit</Button>
                </div>
            </div>
            
        </div>
    );
}
