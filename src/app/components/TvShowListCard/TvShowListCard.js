import {getImageUrl} from "@/app/api/tv-show";

/**
 * TvShowListCard Component
 *
 * Displays a single TV show card with backdrop image and title.
 * Used within carousel/list layouts to represent individual shows.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.tvShow - TV show data object from TMDB API
 * @param {number} props.tvShow.id - Unique identifier
 * @param {string} props.tvShow.name - TV show title
 * @param {string} props.tvShow.backdrop_path - Image path
 * @param {Function} props.onClickItem - Callback function triggered when card is selected
 *
 * @returns {JSX.Element} Accessible card element
 */
export const TvShowListCard = ({tvShow, onClickItem}) => {
  const handleClick = () => {
    if (onClickItem) {
      onClickItem(tvShow);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      className="tv-show-list__card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Select ${tvShow.name}`}
      type="button"
    >
      <img
        className="tv-show-list__card-img"
        src={getImageUrl(tvShow.backdrop_path, 'w300')}
        alt={tvShow.name}
      />
      <div className="tv-show-list__card-title cp-10">
        <h3 className="fs-17">{tvShow.name}</h3>
      </div>
    </button>
  );
}
