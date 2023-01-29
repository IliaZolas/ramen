import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { config } from '../config/config';
import "./showramen.css"

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
            // const id = params.id;
            // console.log("this is the id in deleteRamen:", id)
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
        <div className="show-ramen-container">
            <div className="">
                    <div className="" >
                        <div className="show-image-container">  
                            <img src={ramen.imageUrl} style={{width: 400}} alt="" />
                        </div>
                        <h1>{ramen.id}</h1>
                        <h1>{ramen.title}</h1>
                        <h2 className="">{ramen.ingredients}</h2>
                        <p className="">{ramen.description}</p>
                        {user ? (
                        <div className="card-button-area">
                            <div className="show-button button" onClick={() => allRamens()} >Back to list</div>
                            <div className="update-button button" onClick={() => updateRamen(ramen._id)} >Update</div>
                            <div className="delete-button button" onClick={() => deleteRamen(ramen._id, ramen.public_id)} id={ramen.id}>Delete</div>
                        </div>
                        ) : (
                        <div className="card-button-area">
                            <div className="show-button button" onClick={() => allRamens()} >Back to list</div>
                        </div>
                        )}
                    </div>
            </div>
        </div>
    );
}

export default ShowRamen;