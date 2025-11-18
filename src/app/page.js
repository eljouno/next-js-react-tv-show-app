"use client"

import { getPopularTVShows, getImageUrl, getTVShowRecommendations } from "./api/tv-show";
import { useState, useEffect } from "react";
import {TvShowDetails} from "./components/TvShowDetails/TvShowDetails";
import {Logo} from "@/app/components/Logo/Logo";
import logo from "@/app/assets/img/logo.png"
import { TvShowList } from "./components/TvShowList/TvShowList";
import { SearchBar } from "./components/SearchBar/SearchBar"

export default function App() {
  const [tvShowsList, setTvShowsList] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [recommendedShows, setRecommendedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchPopulars = async () => {
    try {
      setLoading(true);
      const data = await getPopularTVShows();
      setTvShowsList(data.results || []);
      setSelectedShow(data.results?.[0] || null);
    } catch (err) {
      console.error('Error fetching TV shows:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchRecommended = async (tvId) => {
    try {
      const data = await getTVShowRecommendations(tvId);
      setRecommendedShows(data.results || []);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPopulars();
  }, []);
  
  useEffect(() => {
    if (selectedShow?.id) {
      fetchRecommended(selectedShow.id);
    }
  }, [selectedShow]);
  
  const getBackgroundStyle = () => {
    if (selectedShow?.backdrop_path) {
      return `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${getImageUrl(selectedShow.backdrop_path, 'w1280')}") no-repeat center/cover`;
    }
    return 'black';
  };
 
  return (
    <div className='main-container__max'
         style={{
           background: getBackgroundStyle(),
         }}
    >
      {tvShowsList.length > 0 && tvShowsList[0] && (
        <>
          <div className="header container">
            <div className="row">
              <div className="col-12 col-4-L">
                <div className="cmb-16 cmb-XL-0">
                  <Logo
                    img={logo}
                    title="TV Show choice"
                    subtitle="Find the TV show you should have choosen"
                  />
                </div>
              </div>
              <div className="header__search col-12 col-4-XL">
                <SearchBar />
              </div>
            </div>
          </div>
          <div className="tv-details">
            {selectedShow && <TvShowDetails tvShow={selectedShow} />}
          </div>
          <div className="recommandations">
            <div className="cmb-16">
              <h1>Recommandations</h1>
              <TvShowList onClickItem={setSelectedShow} shows={recommendedShows.slice(1, 15)} />
            </div>
          </div>
          
          <div className="most-populars">
            <div className="cmb-16">
              <h1>Most popular series</h1>
              <TvShowList shows={tvShowsList.slice(1, 15)} onClickItem={setSelectedShow} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
