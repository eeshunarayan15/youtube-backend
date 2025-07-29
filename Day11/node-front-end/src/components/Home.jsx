import { Link } from "react-router-dom";
import Navigation from "./Routing/Navigation";
import AuthForm from "./AuthForm";
import Product from "../Products/Product";
import ProductGrid from "../Products/ProductGrid";

const Home = () => (
  <div className="min-h-screen text-white">
    <Navigation />
    <ProductGrid/>
    

  </div>
  // <div>
  //   <AuthForm/>
  // </div>
);
export default Home;