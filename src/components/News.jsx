import React, { useEffect, useState } from 'react';
import '../App.css'; // Import the CSS file for styling
import image from '../assets/images/universe.jpeg';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/news');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNews(data.articles || []); // Ensure data.articles is valid
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='mt-[3%]'>
            <ul className="news-grid">
                {Array.isArray(news) && news.length > 0 ? (
                    news.map((item, index) => (
                        <li key={index} className="news-item">
                            {/* Image and description container */}
                            <div className="image-container relative"> {/* Added relative positioning for the absolute gradient */}
                                <a href={item.url} target="_blank" rel="noopener noreferrer"> {/* Open link in a new tab */}
                                    <img
                                        className="news-image h-[40%] object-cover" // Ensure image covers the container
                                        src={item.urlToImage || image}
                                        alt={item.title}
                                    />
                                </a>
                                <h2 className='font-bold z-10'>{item.title}</h2>
                                <p className="news-description z-10">{item.description}</p> {/* Added z-index */}
                            </div>
                            <p>{new Date(item.publishedAt).toLocaleString()}</p> {/* Format date */}
                        </li>
                    ))
                ) : (
                    <li>No news available</li>
                )}
            </ul>
        </div>
    );
};

export default News;
