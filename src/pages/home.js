import {PrimaryButton} from "../components/buttons";
import "./home.css"
import Footer from "../components/footer";

const Home = () => {
    return (
        <div className="">
            <div className="hero-banner">
               <h1>Ramen Cookbook</h1>
               <p>Find a ramen to cook from this database</p>
               <p>For ramen enthusiasts</p>
               <PrimaryButton />
            </div>
            <Footer />
        </div>
      );
}

export default Home;