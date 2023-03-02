import {PrimaryButton} from "../components/buttons";
import "./home.css"
import Ramen from "./assets/ramen-home.png"

const Home = () => {
    return (
        <div className="container fade-page">
            <div className="hero-banner">
                <div className="hero-txt">
                    <h1 style={{
                        color: "#ED3D1E"
                        }}>ラメン</h1>
                    <hr style={{
                        background: "#272624",
                        border: "1px solid",
                        height:"1px"
                    }}
                    />
                    <div className="hero-txt-area">
                        <h1>A RAMEN COOBOOK</h1>
                        <p>Made for ramen lovers, this cookbook will help you in your pursuit of becoming your own fully fledged ramen chef.</p>
                    </div>
                    <PrimaryButton />
                </div>
                <div className="hero-img"> 
                    <img src={Ramen} alt="ramen" style={{ width: "500px"}} />
                </div>
            </div>
        </div>
    );
}

export default Home;