/* eslint-disable */
const Search = ({query, setQuery}) => {

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={setQuery}
      />
    </div>
  );
};

export default Search;
