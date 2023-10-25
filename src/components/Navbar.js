import { Link } from 'react-router-dom';
//import logo from '../images/racecource-view-low-resolution-logo-color-on-transparent-background.png'


function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
            {/*<img src={logo} alt="Logo" className="navbar-logo" />*/}
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/memories">Memories</Link>
        </li>
        <li>
          <Link to="/bucket_lists">Bucket List</Link>
        </li>
        <li>
          <Link to="/achievements">Achievements</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
