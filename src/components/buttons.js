import {Link} from 'react-router-dom';
import "./button.css"

const PrimaryButton = () => {
    return (
        <div className="">
                <Link to="/ramen" className="primary-button">
                    See Ramens
                </Link>
        </div>
    );
};


const SecondaryButton = () => {
    return (
        <div className="">
            <div className="">
                <Link to="/add-ramen">
                    <p>secondary buttont</p>
                </Link>
            </div>
        </div>
    );
};



const TertiaryButton = () => {
    return (
        <div className="">
            <div className="">
                <Link to="/add-ramen">
                    <p>tertiery button</p>
                </Link>
            </div>
        </div>
    );
};

export  {PrimaryButton, SecondaryButton, TertiaryButton};