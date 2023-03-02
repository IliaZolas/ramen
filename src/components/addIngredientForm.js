import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {Image} from 'cloudinary-react';
import { config } from '../config/config';
import "./ramenForm.css"
import 'react-quill/dist/quill.snow.css';


const URL = config.url;

const AddIngredient= () => {
    const [ingredient, setIngredient ] = useState('');
    const [calories, setCalories ] = useState('');    
    const [imageUrl, setImageUrl] = useState('');
    const [publicId, setPublicId] = useState('');
    const navigate = useNavigate();

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

    const AddRamen = async ( ingredient, calories, imageUrl, publicId) => {
        await fetch(`${URL}/app/ingredient/add`, {
        method: 'POST',
        body: JSON.stringify({
            ingredient: ingredient,
            calories: calories,
            imageUrl: imageUrl,
            publicId: publicId
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        })
        .then((response) => { 
            console.log(response.json());
        })
        .then(() => {
        setIngredient();
        setCalories();
        })
        .catch((err) => {
        console.log("error message", err.message);
    });
    navigate('/ramen');
};

const handleSubmit = (e) => {
    e.preventDefault();
    AddRamen( ingredient, calories, imageUrl, publicId );
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
                    name="ingredient" 
                    placeholder="ingredient"
                    onChange={e => setIngredient(e.target.value)} />
            </label>
            <label className="labels">
                Calories
                <input 
                    type="text" 
                    name="calories" 
                    placeholder="calories"
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
                    onChange={e => setImageUrl(e.target.value)} />
            </label>
            <label className="labels hidden">
                publicId
                <textarea 
                    type="textarea" 
                    name="publicId" 
                    value={publicId}
                    onChange={e => setPublicId(e.target.value)} />
            </label>
            <input type="submit" value="Submit" className="primary-submit-button" />
        </form>
    </div>
    )
};

export default AddIngredient;
