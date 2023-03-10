import RamenCard from '../components/ramenCard';
import './ramen.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlFood } from '@fortawesome/free-solid-svg-icons'


const Ramen = () => {
    return (
        <div className="ramen-list-body fade-page">
            <div className="">
                <div className="page-title">
                    <h1 style={{
                                color: "#ED3D1E"
                                }}>いただきます</h1>
                    <hr style={{
                            background: "#272624",
                            border: "1px solid",
                            height:"1px"
                        }}/>
                    <h1>All ramens <FontAwesomeIcon icon={faBowlFood} className="ramen-bowl"/></h1>
                </div>
                <RamenCard />
            </div>
        </div>
    );
}

export default Ramen;