import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="Cocktail" className="Logo"></img>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
