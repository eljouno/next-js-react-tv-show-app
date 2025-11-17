import './tv-show-details.scss';
import {StarsRating} from "@/app/components/StarsRating/StarsRating";

/**
 * TvShowDetails Component
 *
 * Displays detailed information about a TV show including title, rating, and overview.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.tvShow - TV show data object from TMDB API
 * @param {string} props.tvShow.name - The name/title of the TV show
 * @param {number} props.tvShow.vote_average - Average vote rating (0-10 scale from TMDB)
 * @param {string} props.tvShow.overview - Description/synopsis of the TV show
 *
 * <TvShowDetails tvShow={tvShow} />
 *
 * @returns {JSX.Element} Rendered TV show details section
 */
export const TvShowDetails = ({ tvShow }) => {
  /**
   * Convert TMDB rating (0-10) to 5-star scale
   * @type {number}
   */
  const rating = tvShow.vote_average / 2;
  
  return (
    <>
      {/* TV Show Title */}
      <h2 className="tv-details__title cmb-16 fs-34 fs-40-L special-elite">
        {tvShow.name}
      </h2>
      
      {/* Star Rating Display */}
      <div className="tv-details__vote">
        <StarsRating rating={rating}/>
      </div>
      
      {/* TV Show Overview/Description */}
      <div className="tv-details__overview cmt-5">
        <p className="fs-19">{tvShow.overview}</p>
      </div>
    </>
  );
};
