import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from "../firebase";
import Card from 'react-bootstrap/Card';

const IMAGE_API='https://image.tmdb.org/t/p/w500';

export default function Profile() {
    const { userEmail } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (!userEmail) {
                    console.error("User email is undefined.");
                    return;
                }

                // Constructing the query to fetch reviews for the user's email
                const reviewRef = collection(db, 'reviews');
                //const q = query(reviewRef);
                 const q = query(reviewRef);
                //, where('email', '==', userEmail)
                // Executing the query
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log("No matching documents.");
                    return;
                }

                // Extracting data from query snapshot and updating state
                const fetchedReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setReviews(fetchedReviews);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        // Call fetchReviews inside useEffect
        fetchReviews();

    }, [userEmail]); // Run the effect again if userEmail changes

    return (
        <div style={{ padding: 145 }}>
            <h2>My Reviews</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {reviews.map((review) => (
                    <div key={review.id}>
                       <Card style={{ width: '20rem', margin: 10 }}>
                          <div style={{ display: 'flex' }}>
                            
                              {/* Movie poster on the right side */}
                              
                                
                              {/* Movie title, rating, and reviews on the left side */}
                              <div>
                                  <Card.Body>
                                      <Card.Title>{review.movieName}</Card.Title>
                                      <Card.Text>
                                          <p>Movie Rating: {review.movieRating}</p>
                                          <p>Movie Review: {review.movieReview}</p>
                                      </Card.Text>
                                  </Card.Body>
                              </div>
                              <Card.Img variant="top" src={IMAGE_API + review.moviePoster} style={{ width: '40%', height:150, margin:10,  }} />
                          </div>
                      </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
