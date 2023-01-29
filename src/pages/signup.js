import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import ramens from "../../../server/models/ramens";
import {Image} from 'cloudinary-react';
import { config } from '../config/config';
import "../components/ramenForm.css"
import "./signup.css"

const URL = config.url;

const AddUser = () => {
    const [name, setName ] = useState('');
    const [surname, setSurname ] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [publicId, setPublicId] = useState('');
    const navigate = useNavigate();

    // console.log("image url in state:",imageUrl);

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

    const AddUser = async ( name, surname, email, password, imageUrl, publicId) => {
        await fetch(`${URL}/app/signup`, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            surname: surname,
            email: email,
            password: password,
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
        setName();
        setSurname();
        setEmail();
        setPassword();
        // setImageUrl();
        })
        .catch((err) => {
        console.log(err.message , ":error message");
    });
    // navigate('/ramen');
};

const handleSubmit = (e) => {
    e.preventDefault();
    // uploadImage(file);
    AddUser(name, surname, email, password, imageUrl, publicId);
};

    return (
    <div>
        <div className="form-user-image-container">
            <Image className="new-user-image" cloudName="iliacloud9" publicId={imageUrl} />
        </div>
        <form method="post" onSubmit={handleSubmit} enctype="multipart/form-data">
            <label className="labels">
                Name
                <input 
                    type="text" 
                    name="name" 
                    placeholder="name"
                    onChange={e => setName(e.target.value)} />
            </label>
            <label className="labels">
                Surname
                <input 
                    type="text" 
                    name="surname" 
                    placeholder="surname"
                    onChange={e => setSurname(e.target.value)} />
            </label>
            <label className="labels">
                Email
                <input
                    type="text" 
                    name="email" 
                    placeholder="email"
                    onChange={e => setEmail(e.target.value)} />
            </label>
            <label className="labels">
                Password
                <input 
                    type="text" 
                    name="password" 
                    placeholder="password"
                    onChange={e => setPassword(e.target.value)} />
            </label>
            <label className="labels">
                Image
                <input type="file" name="ramen" onChange={uploadImage}/>
            </label>
            <label className="labels hidden">
                imageUrl
                <input
                    type="text" 
                    name="imageUrl" 
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)} />
            </label>
            <label className="labels hidden">
                publicId
                <input
                    type="text" 
                    name="publicId" 
                    value={publicId}
                    onChange={e => setPublicId(e.target.value)} />
            </label>
            <input type="submit" value="Submit" className="primary-submit-button" />
        </form>
    </div>
    )
};

export default AddUser;
