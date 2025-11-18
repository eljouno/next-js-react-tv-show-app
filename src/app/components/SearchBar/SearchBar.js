
import './searchbar.scss';

/**
 * SearchBar Component
 *
 * Displays a search input field with icon for TV show queries.
 *
 * @component
 * @returns {JSX.Element} Search bar with input and icon
 */
export const SearchBar = () => {
  return (
    <div className="search-bar">
      <i className="bi bi-search search-bar__icon"></i>
      <input
        type="text"
        placeholder="Search for TV shows..."
        className="search-bar__input cpy-5 cpl-10 cpr-30"
      />
    </div>
  );
}
