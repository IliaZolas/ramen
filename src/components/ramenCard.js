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

const RamenCard = () => {
    const [ramens, setRamen] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const token = cookies.get("TOKEN");

    
    useEffect(() => {
        fetch(`${URL}/app/ramen`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setRamen(data);
            })
            .catch((err) => {
                console.log(err.message);
            });  
        }, []);

    const deleteRamen = async (id, public_id) => {
        console.log("delete:",id)
        console.log("delete:",public_id)

        await fetch(`${URL}/app/ramen/delete/${id}/${public_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `${token}` 
        },
        }).then((response) => {            
            if (response.status === 200) {
                setRamen();
                console.log("Ramen deleted");
                } else {
                    console.log("Ramen not deleted");
                }
            });
        };

    const viewRamen = async (id) => {
        console.log("this is id", id);
        navigate(`/ramen/show/${id}`);
    };

    const updateRamen = (id) => {
        navigate(`/ramen/update/${id}`);
    };

    return (
        <div className="">
            <div className="card-area">
                {ramens.map((ramen) => {
                return (
                    <div id={ramen._id} className="ramen-card" >
                        <div class="card-image-container">
                            <img src={ramen.imageUrl} alt="" style={{width: 400}} />
                        </div>
                        <div className="card-text-area">
                            <h4>{ramen.title}</h4>
                            <h2>{ramen.ingredients}</h2>
                        {user ? (
                            <div className="card-button-area">
                                <div className="show-button button" onClick={() => viewRamen(ramen._id)} >
                                    <FontAwesomeIcon icon={faEye} className="eye"/>
                                </div>
                                <div className="update-button button" onClick={() => updateRamen(ramen._id)} >
                                    <FontAwesomeIcon icon={faPenToSquare} className="update"/>
                                </div>
                                <div className="delete-button button" onClick={() => deleteRamen(ramen._id, ramen.public_id)} id={ramen.id}>
                                    <FontAwesomeIcon icon={faTrash} className="delete"/>
                                </div>
                            </div>
                                ) : (
                                    <div className="card-button-area">
                                        <div className="show-button button" onClick={() => viewRamen(ramen._id)} >
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

export default RamenCard;