// Import necessary dependencies and styles
import React, { useEffect, useState } from 'react';
import './App.css'; // Import stylesheet
import { format } from 'date-fns'; // Import date utility

// Define the News API key
const API_KEY = 'b4df74b58d9b472d97031ee22e5499a2'; 

// Main App component
const App = () => {

  // State variables to store headlines and error messages
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    
    // Function to fetch data from the News API
    const fetchData = async () => {
      
      try {
        
        // Make an API request to get top headlines
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );
        
        // Parse the response as JSON
        const data = await response.json();
        
        // Set the headlines state with the first 5 articles
        setHeadlines(data.articles.slice(0, 5));
        
      } catch (err) {
        
        // Handle errors by setting an error state
        setError('Error fetching headlines. Please try again later.');
        
      }
      
    };
    
    // Call the fetchData function
    fetchData();
    
  }, []); // Empty dependency array ensures the useEffect runs only once on mount

  // Render the component
  return (
    <div className="app">
      <h1>Latest Headlines</h1>
      
      {/* Display an error message if there is an error */}
      {error && <p className="error">{error}</p>}

      {/* Display the list of headlines */}
      <ul className="headlines">
        {headlines.map(article => (
          <li key={article.title} className="headline">
            {/* Display the image if available */}
            <img 
              src={article.urlToImage}
              width={550}
              height={200} 
              alt="" 
              className="article-image"
            />

            {/* Display the article title */}
            <h3>{article.title}</h3>
            
            {/* Display the source name */}
            <p className="source">
              <span>Source:</span> {article.source.name}
            </p>
            
            {/* Display the publication date using date utility */}
            <p className="date">
              <span>Published:</span> {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Export the App component as the default export
export default App;
