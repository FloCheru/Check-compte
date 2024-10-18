import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="flex justify-between px-40">
      <Link to="/">Accueil</Link>
      <Link to="/exportToNotion">ExportToNotion</Link>
      <Link to="/csvToDatabase">CsvToDatabase</Link>
    </nav>
  );
}
