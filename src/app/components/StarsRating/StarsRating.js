import './stars-rating.scss';

/**
 * StarsRating Component
 *
 * Displays a visual star rating with filled, half-filled, and empty stars
 * based on a numeric rating value. Shows both visual stars and numeric rating.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.rating - Rating value (0-5 scale)
 *
 * @returns {JSX.Element} Star rating display with numeric value
 */
export const StarsRating = ({ rating }) => {
  const starList = [];
  
  /** @constant {number} Total number of stars to display */
  const starCount = 5;
  
  /**
   * Round rating to nearest 0.5 for half-star precision
   * @type {number}
   * @example 4.3 → 4.5, 4.2 → 4.0
   */
  const roundedRating = Math.floor(rating * 2) / 2;
  
  /**
   * Number of completely filled stars
   * @type {number}
   */
  const starFillCount = Math.floor(roundedRating);
  
  /**
   * Whether to display a half star
   * @type {boolean}
   */
  const hasHalfStar = roundedRating - starFillCount >= 0.5;
  
  /**
   * Number of empty stars to display
   * @type {number}
   */
  const starEmptyCount = starCount - starFillCount - (hasHalfStar ? 1 : 0);
  
  // Render filled stars
  for (let i = 1; i <= starFillCount; i++) {
    starList.push(<i key={'fill-' + i} className="bi bi-star-fill"></i>);
  }
  
  // Render half star if needed
  if (hasHalfStar) {
    starList.push(<i key="half" className="bi bi-star-half"></i>);
  }
  
  // Render empty stars
  for (let i = 1; i <= starEmptyCount; i++) {
    starList.push(<i key={'empty-' + i} className="bi bi-star"></i>);
  }
  
  return (
    <div className="stars-rating fs-14">
      {starList} {roundedRating.toFixed(1)}/5
    </div>
  );
};
