import {getRecipes} from "../utils/api"
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async (filters = {}) => {
        try {
            const res = await getRecipes(filters);
            setRecipes(res.data.results ?? res.data ?? []);
        } catch (err) {
            console.error("Error:", err.response?.status, err.response?.data);
        }
    };

    console.log("Recipes Component Rendered with recipes:", recipes);

    useEffect(() => {
         fetchRecipes();
    }, []);

    return (
        <div>
            <h1>Recipes 🍲</h1>

            <SearchBar onSearch={fetchRecipes} />

            <div className="recipes-container">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default Recipes;