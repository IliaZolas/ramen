import RamenCard from '../components/ramenCard';
import './ramen.css'

const Ramen = () => {
    return (
        <div className="ramen-list-body">
            <div className="">
                <h1>All ramens</h1>
                <RamenCard />
            </div>
        </div>
    );
}

export default Ramen;