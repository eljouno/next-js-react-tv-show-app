"use client"

import { getPopularTVShows, getImageUrl } from "./api/tv-show";
import { useState, useEffect } from "react";

export default function App() {
  const [currentTVShow, setCurrentTVShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchPopulars = async () => {
    try {
      setLoading(true);
      const data = await getPopularTVShows();
      console.log('TV Shows data:', data);
      setCurrentTVShow(data.results || []);
    } catch (err) {
      console.error('Error fetching TV shows:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopulars();
  }, []);

  // Vérification sécurisée pour le background
  const getBackgroundStyle = () => {
    if (currentTVShow.length > 0 && currentTVShow[0]?.backdrop_path) {
      return `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${getImageUrl(currentTVShow[0].backdrop_path, 'w1280')}") no-repeat center/cover`;
    }
    return 'black';
  };
 
  return (
    <div className='main-container__max'
         style={{
           background: getBackgroundStyle(),
         }}
    >
      {currentTVShow.length > 0 && currentTVShow[0] && (
        <div className="header container">
          <div className="row">
            <div className="col-4">
              <div className="cmb-16 cmb-XL-0">
                <h1>{currentTVShow[0].name}</h1>
              </div>
            </div>
            <div className="header__search col-12 col-4-XL">
              <input style={{width: "100%"}} type="text"/>
            </div>
          </div>
        </div>
      )}
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      <div className="tv-details">
        <div className="cmb-16">
          <h1>Tv show détails</h1>
        </div>
      </div>
      <div className="recommandations">
        <div className="cmb-16">
          <h1>Recommandations</h1>
        </div>
      </div>
    </div>
  );
}
