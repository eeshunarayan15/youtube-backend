import { Link } from "react-router-dom";
import Navigation from "./Routing/Navigation";

const Home = () => (
  <div className="bg-zinc-900 min-h-screen text-white">
    <Navigation />
    <h1 className="text-3xl mb-6 text-center font-bold">Welcome to the App</h1>

  </div>
);
export default Home;