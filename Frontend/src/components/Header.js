import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="flex justify-between px-40">
      <Link to="/">Accueil</Link>
      <Link to="/csvToDatabase">CsvToDatabase</Link>
      <Link to="/sesterceToDatabase">SesterceToDatabase</Link>
    </nav>
  );
}
