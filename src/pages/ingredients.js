import IngredientList from '../components/ingredientList';
import './ramen.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlFood } from '@fortawesome/free-solid-svg-icons'


const Ingredient = () => {
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
                    <h1>All ingredients <FontAwesomeIcon icon={faBowlFood} className="ramen-bowl"/></h1>
                </div>
                <IngredientList />
            </div>
        </div>
    );
}

export default Ingredient;