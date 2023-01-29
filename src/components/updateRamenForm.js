import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import {Image} from 'cloudinary-react';
import { config } from '../config/config';
import "./ramenForm.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const URL = config.url;

const UpdateRamenForm = () => {
    const [title, setTitle ] = useState('');
    const [ingredients, setIngredients ] = useState('');
    const [description, setDescription ] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [publicId, setPublicId] = useState('');
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const id = params.id;
        // console.log(id, "useEffect")
        fetch(`${URL}/app/ramen/show/${id}`, {
            method: 'GET',
            }).then((response) => response.json())
            .then((data) => {
                setTitle(data.title);
                setIngredients(data.ingredients);
                setDescription(data.description);
                setImageUrl(data.imageUrl);
                setPublicId(data.public_id)
                // console.log(data.title, data.ingredients, "data from useEffect")
            })
            .catch((err) => {
                console.log(err.message);
            });
        },
        []);

    const uploadUrl = `https://api.cloudinary.com/v1_1/iliacloud9/image/upload`

    const uploadImage = async (files) => {
        // console.log("file being uploaded:",files.target.files[0]);

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

    const updateRamen = async (id, title, ingredients, description, imageUrl, publicId) => {
        const token = cookies.get("TOKEN");

        await fetch(`${URL}/app/ramen/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: title,
                ingredients: ingredients,
                description: description,
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
            setTitle();
            setIngredients();
            setDescription();
            setImageUrl();
            setPublicId();
            })
            .catch((err) => {
            console.log(err.message , ":error message");
        });
    }

    const handleSubmit = () => {
        const id = params.id
        updateRamen(id, title, ingredients, description, imageUrl, publicId );
        navigate(`/ramen/show/${id}`);
        
    };
    

    return (
        <div>
        <div className="form-image-container">
            <Image className="new-ramen-image" cloudName="iliacloud9" publicId={imageUrl} />
        </div>
        <form method="post" onSubmit={handleSubmit} enctype="multipart/form-data">
            <label className="labels">
                Title
                <input 
                    type="text" 
                    name="title" 
                    placeholder={title}
                    onChange={e => setTitle(e.target.value)} />
            </label>
            <label className="labels">
                Ingredients
                <input 
                    type="text" 
                    name="ingredients" 
                    placeholder={ingredients}
                    onChange={e => setIngredients(e.target.value)} />
            </label>
            <label className="labels">
                Description
                <textarea 
                    type="textarea" 
                    name="description" 
                    placeholder={description}
                    onChange={e => setDescription(e.target.value)} />
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

export default UpdateRamenForm;
