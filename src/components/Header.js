import { Auth } from "./Auth";
import { Link } from "react-router-dom";
import './Header.css'

export const Header = () => {
  return (
    <header>
      <h1>
        <Link to={"/"} className ="header">ShareLink</Link>
      </h1>
      <nav>
        <Auth />
      </nav>
    </header>
  );
};