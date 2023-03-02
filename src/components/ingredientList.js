import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import './ramencard.css'
import Cookies from "universal-cookie";
import { config } from '../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'

const cookies = new Cookies();

const URL = config.url;
console.log("prod or dev?", URL)

const IngredientList = () => {
    const [ingredients, setIngredient] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const token = cookies.get("TOKEN");

    
    useEffect(() => {
        fetch(`${URL}/app/ingredients`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setIngredient(data);
            })
            .catch((err) => {
                console.log(err.message);
            });  
        }, []);

    const deleteIngredient = async (id, public_id) => {
        console.log("delete:",id)
        console.log("delete:",public_id)

        await fetch(`${URL}/app/ingredient/delete/${id}/${public_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `${token}` 
        },
        }).then((response) => {            
            if (response.status === 200) {
                setIngredient();
                console.log("Ingredient deleted");
                } else {
                    console.log("Ingredient not deleted");
                }
            });
        };

    const viewIngredient = async (id) => {
        console.log("this is id", id);
        navigate(`/ingredient/show/${id}`);
    };

    const updateIngredient = (id) => {
        navigate(`/ingredient/update/${id}`);
    };

    return (
        <div className="">
            <div className="card-area">
                {ingredients.map((ingredient) => {
                return (
                    <div id={ingredient._id} className="ramen-card" >
                        <div class="card-image-container">
                            <img src={ingredient.imageUrl} alt="" style={{width: 400}} />
                        </div>
                        <div className="card-text-area">
                            <h4>{ingredient.ingredient}</h4>
                            <h2>{ingredient.calories}</h2>
                        {user ? (
                            <div className="card-button-area">
                                <div className="show-button button" onClick={() => viewIngredient(ingredient._id)} >
                                    <FontAwesomeIcon icon={faEye} className="eye"/>
                                </div>
                                <div className="update-button button" onClick={() => updateIngredient(ingredient._id)} >
                                    <FontAwesomeIcon icon={faPenToSquare} className="update"/>
                                </div>
                                <div className="delete-button button" onClick={() => deleteIngredient(ingredient._id, ingredient.public_id)} id={ingredient.id}>
                                    <FontAwesomeIcon icon={faTrash} className="delete"/>
                                </div>
                            </div>
                                ) : (
                                    <div className="card-button-area">
                                        <div className="show-button button" onClick={() => viewIngredient(ingredient._id)} >
                                        <FontAwesomeIcon icon={faEye} className="eye"/>
                                        </div>
                                    </div>
                                )}
                            </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
};

export default IngredientList;