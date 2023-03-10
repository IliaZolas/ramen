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

const ShowRamen = () => {
    const [ramen, setRamen] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const id = params.id;

        fetch(`${URL}/app/ramen/show/${id}`, {
            method: 'GET',
            }).then((response) => response.json())
            .then((data) => {
                setRamen(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        },
        []);
        
        const deleteRamen = async (id, public_id) => {
            console.log("delete:",id)
            console.log("delete:",public_id)
            const token = cookies.get("TOKEN");

            fetch(`${URL}/app/ramen/delete/${id}/${public_id}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `${token}`,
        },
            }).then((response) => {            
                if (response.status === 200) {
                    setRamen();
                    console.log("Ramen deleted");
                    } else {
                        return;
                    }
                });
                navigate('/ramen');
            };

            const allRamens = () => {
                navigate('/ramen');
            }

            const updateRamen = (id) => {
                navigate(`/ramen/update/${id}`);
            };

    return (
        <div className="show-ramen-container fade-page">
            <div className="show-ramen">
                <div className="flex space-around" >
                    <div className="show-page-img-ing">   
                        <div className="show-image-container">  
                            <img src={ramen.imageUrl} style={{width: 400}} alt="" />
                        </div>
                        <h1>Ingredients</h1>
                        <h2 className="">{ramen.ingredients}</h2>
                    </div>
                    <div className="show-page-description">
                    <h1>{ramen.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: ramen.description}} />
                        {user ? (
                        <div className="card-button-area-show flex">
                            <div className="show-button button" onClick={() => allRamens()} ><FontAwesomeIcon icon={faCircleLeft} className="back"/> Back to list</div>
                            <div className="update-button button" onClick={() => updateRamen(ramen._id)} ><FontAwesomeIcon icon={faPenToSquare} className="update"/> Update</div>
                            <div className="delete-button button" onClick={() => deleteRamen(ramen._id, ramen.public_id)} id={ramen.id} ><FontAwesomeIcon icon={faTrash} className="delete"/> Delete</div>
                        </div>
                        ) : (
                        <div className="card-button-area-show">
                            <div className="show-button button" onClick={() => allRamens()} ><FontAwesomeIcon icon={faCircleLeft} className="ramen-bowl"/> Back to list</div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowRamen;