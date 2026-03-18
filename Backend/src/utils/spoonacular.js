const axios = require("axios");
const { RECIPE_API } = require("../config/server-config");

const fetchRecipesFromAPI = async (params) => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${RECIPE_API}`, {
            params : {
                ...params,
                number: 10,
                addRecipeInformation:true,
                addRecipeInstructions:true,
                fillIngredients: true,
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("API Error:", error.response.data);
        } else {
             console.error("Server Error:", error.message);
        }
        throw new Error("Failed to fetch recipes");
    }
}

module.exports = {
    fetchRecipesFromAPI,
}