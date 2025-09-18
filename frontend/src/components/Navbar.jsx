import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">AgriChain</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/produce/add" className="hover:underline">Add Produce</Link>
        <Link to="/my-produce" className="hover:underline">My Produce</Link>
        <Link to="/transfer-produce" className="hover:underline">Transfer</Link>
        <Link to="/actors" className="hover:underline">Actors</Link>
        <Link to="/actors/create" className="hover:underline">Create Actor</Link>
      </div>
    </nav>
  );
}
