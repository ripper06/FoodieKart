import { getRecipes } from "../utils/api";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import "../css/Recipes.css";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRecipes = async (filters = {}) => {
        try {
            const res = await getRecipes(filters);
            setRecipes(res.data.results ?? res.data ?? []);
        } catch (err) {
            console.error("Error:", err.response?.status, err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <div className="recipes-page">
            <h1>Recipes 🍲</h1>
            <SearchBar onSearch={fetchRecipes} />
            <div className="recipes-container">
                {loading && <p className="recipes-empty">Loading recipes...</p>}
                {!loading && recipes.length === 0 && <p className="recipes-empty">No recipes found.</p>}
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default Recipes;