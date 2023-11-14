import { Link } from 'react-router-dom';
import logo from '../Logo.png';
import '../App.css'


function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
            {<img src={logo} alt="Logo" className="navbar-logo" />}
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
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
