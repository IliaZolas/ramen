import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import {Image} from 'cloudinary-react';
import { config } from '../config/config';
import "./ramenForm.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Cookies from "universal-cookie";
const cookies = new Cookies();

const URL = config.url;

const UpdateIngredientForm = () => {
    const [ingredient, setIngredient ] = useState('');
    const [calories, setCalories ] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [publicId, setPublicId] = useState('');
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const id = params.id;
        fetch(`${URL}/app/ingredient/show/${id}`, {
            method: 'GET',
            }).then((response) => response.json())
            .then((data) => {
                setIngredient(data.title);
                setCalories(data.ingredients);
                setImageUrl(data.imageUrl);
                setPublicId(data.public_id);
            })
            .catch((err) => {
                console.log(err.message);
            });
        },
        []);

    const uploadUrl = `https://api.cloudinary.com/v1_1/iliacloud9/image/upload`

    const uploadImage = async (files) => {

        const formData = new FormData()
        formData.append("file", files.target.files[0])
        formData.append("upload_preset", "yxlthn8k")

        await fetch(uploadUrl, {
            method: 'POST',
            body: formData
            })
            .then(async (response) => {
            const data = await response.json();
            setImageUrl(data.secure_url)
            setPublicId(data.public_id)
            })            
        };

    const updateIngredient = async (id, ingredient, calories, imageUrl, publicId) => {
        const token = cookies.get("TOKEN");

        await fetch(`${URL}/app/ingredient/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                ingredient: ingredient,
                calories: calories,
                imageUrl: imageUrl,
                publicId: publicId
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `${token}`,
            },
            })
            .then((response) => { 
                response.json();
            })
            .then(() => {
            setIngredient();
            setCalories();
            setImageUrl();
            setPublicId();
            })
            .catch((err) => {
            console.log(err.message , ":error message");
        });
    }

    const handleSubmit = () => {
        const id = params.id
        updateIngredient(id, ingredient, calories, imageUrl, publicId );
        navigate(`/ingredient/show/${id}`);
        
    };
    

    return (
        <div>
        <div className="form-image-container">
            <Image className="new-ramen-image" cloudName="iliacloud9" publicId={imageUrl} />
        </div>
        <form method="post" onSubmit={handleSubmit} enctype="multipart/form-data">
            <label className="labels">
                Ingredient
                <input 
                    type="text" 
                    name="title" 
                    placeholder={ingredient}
                    onChange={e => setIngredient(e.target.value)} />
            </label>
            <label className="labels">
                Calories
                <input 
                    type="text" 
                    name="ingredients" 
                    placeholder={calories}
                    onChange={e => setCalories(e.target.value)} />
            </label>
            <label className="labels">
                Image
                <input type="file" name="ramen" onChange={uploadImage}/>
            </label>
            <label className="labels hidden">
                imageUrl
                <textarea 
                    type="textarea" 
                    name="imageUrl" 
                    value={imageUrl}
                    placeholder={imageUrl}
                    onChange={e => setImageUrl(e.target.value)} />
            </label>
            <label className="labels hidden">
                publicId
                <textarea 
                    type="textarea" 
                    name="publicId" 
                    value={publicId}
                    placeholder={publicId}
                    onChange={e => setPublicId(e.target.value)} />
            </label>
            <input type="submit" value="Submit" className="primary-submit-button" />
        </form>
    </div>
    )
};

export default UpdateIngredientForm;
