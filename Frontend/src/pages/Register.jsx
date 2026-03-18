import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        dietaryPreferences: "",
        allergies: "",
        dislikedIngredients: "",
        skillLevel: "beginner"
    });



    const handleChange =(e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const paylod = {
                ...form,
                dietaryPreferences : form.dietaryPreferences
                    .split(",")
                    .map(item => item.trim().toLowerCase())
                    .filter(item => item !== ""),
                allergies : form.allergies
                    .split(",")
                    .map(item => item.trim().toLowerCase())
                    .filter(item => item !== ""),
                dislikedIngredients : form.dislikedIngredients
                    .split(",")
                    .map(item => item.trim().toLowerCase())
                    .filter(item => item !== ""),
            };
            console.log(paylod);
            const res = await axios.post("http://localhost:4090/api/v1/auth/register", paylod);
            // console.log(JSON.stringify(res.data));

            if(res.data)localStorage.setItem("user", JSON.stringify(res.data));
            
            alert("Registration successful!");
            navigate("/login");
        }
        catch(error){
            console.log(error);
            alert(error.response?.data?.message || "Error");
        }
    }
    
    return (
        <div>
        <h1>Register</h1>
        
        <form onSubmit={handleSubmit}>
            <input name = "name" placeholder = "Name" onChange = {handleChange} required />
            <br />
            <input name="email" placeholder="Email" onChange = {handleChange} required />
            <br />
            <input name = "password" placeholder="Password" onChange ={handleChange} required />
            <br />
            <input name="dietaryPreferences" placeholder="Diet (comma separated)" onChange={handleChange} />
            <br />
            <input name="allergies" placeholder="Allergies (comma separated)" onChange={handleChange} />
            <br />
            <input name="dislikedIngredients" placeholder="Disliked Ingredients" onChange={handleChange} />
            <br />

            <select name="skillLevel" onChange={handleChange}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
            </select>
            <br />
            <button type="submit">Register</button>
        </form>
        </div>
    )
}

export default Register
