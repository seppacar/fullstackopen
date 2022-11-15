const Filter = ({ handleFilter, query }) => {
  return (
    <div>
      findcountries
      <input name="filter" onChange={handleFilter} value={query}></input>
    </div>
  );
};

export default Filter;
