import React from 'react';
import './Home.css'; // Import CSS for styling
import { useSelector } from 'react-redux';

const Home = () => {
    const user_id = useSelector((state) => state.auth.logIn)
    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Welcome to the Bookstore!</h1>
                <p>Explore our vast collection of books across various genres.</p>
                <p>
                    Whether you're looking for the latest bestsellers, classic literature, or niche genres, we have it all.
                </p>
                <p>
                    Enjoy our curated selections, personalized recommendations, and exclusive offers. Dive into the world of literature and find your next great read today!
                </p>
            </div>
        </div>
    );
};

export default Home;
