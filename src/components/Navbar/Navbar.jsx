import './Navbar.css';

function Navbar(props) {
  const { search = '', mySearch = () => {}, movies = [] } = props || ''
  function handleSearch(e) {
    const val = e.target.value;
    mySearch(val);
  }

  return (
    <nav className='nav-bar'>
      <div className='logo'>
        <span>🍿</span>
        <h1>Usepopcorn</h1>
      </div>
      <input
        className='search'
        type='text'
        placeholder='Search movies...'
        value={search}
        onChange={handleSearch}
      />
      <p className='num-results'>
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
}

export default Navbar;