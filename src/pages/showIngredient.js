import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { config } from '../config/config';
import "./showramen.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Cookies from "universal-cookie";
const cookies = new Cookies();

const URL = config.url;

const ShowIngredient = () => {
    const [ingredient, setIngredient] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const id = params.id;

        fetch(`${URL}/app/ingredient/show/${id}`, {
            method: 'GET',
            }).then((response) => response.json())
            .then((data) => {
                setIngredient(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        },
        []);
        
        const deleteIngredient = async (id, public_id) => {
            console.log("delete:",id)
            console.log("delete:",public_id)
            const token = cookies.get("TOKEN");

            fetch(`${URL}/app/ingredient/delete/${id}/${public_id}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `${token}`,
        },
            }).then((response) => {            
                if (response.status === 200) {
                    setIngredient();
                    console.log("Ingredient deleted");
                    } else {
                        return;
                    }
                });
                navigate('/ingredients');
            };

            const allIngredients = () => {
                navigate('/ingredients');
            }

            const updateIngredient = (id) => {
                navigate(`/ingredient/update/${id}`);
            };

    return (
        <div className="show-ramen-container fade-page">
            <div className="show-ramen">
                <div className="flex space-around" >
                    <div className="show-page-img-ing">   
                        <div className="show-image-container">  
                            <img src={ingredient.imageUrl} style={{width: 400}} alt="" />
                        </div>
                    </div>
                    <div className="show-page-description">
                    <h1>{ingredient.ingredient}</h1>
                        <div dangerouslySetInnerHTML={{ __html: ingredient.calories}} />
                        {user ? (
                        <div className="card-button-area-show flex">
                            <div className="show-button button" onClick={() => allIngredients()} ><FontAwesomeIcon icon={faCircleLeft} className="back"/> Back to list</div>
                            <div className="update-button button" onClick={() => updateIngredient(ingredient._id)} ><FontAwesomeIcon icon={faPenToSquare} className="update"/> Update</div>
                            <div className="delete-button button" onClick={() => deleteIngredient(ingredient._id, ingredient.public_id)} id={ingredient.id} ><FontAwesomeIcon icon={faTrash} className="delete"/> Delete</div>
                        </div>
                        ) : (
                        <div className="card-button-area-show">
                            <div className="show-button button" onClick={() => allIngredients()} ><FontAwesomeIcon icon={faCircleLeft} className="ramen-bowl"/> Back to list</div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowIngredient;