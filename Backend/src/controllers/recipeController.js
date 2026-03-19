const {UserModel} = require("../models");
const { createCacheKey, getCache, setCache } = require("../utils/cache");
const { fetchRecipesFromAPI } = require("../utils/spoonacular");


const getRecipes = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const user = await UserModel.findById(userId);

    const { search, cuisine, maxTime } = req.query;

    // 🔥 STEP 1: BUILD PARAMS (user + query)
    let params = {
      query: search || "",
      diet: user.dietaryPreferences?.join(","),
      intolerances: user.allergies?.join(","),
      excludeIngredients: user.dislikedIngredients?.join(","),
      cuisine: cuisine || "",
    };

    // 🔥 STEP 2: CLEAN PARAMS
    params = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v)
    );

    // // 🔥 STEP 3: CREATE CACHE KEY
    const cacheKey = createCacheKey(params);

    // // 🔥 STEP 4: CHECK CACHE
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      console.log("✅ CACHE HIT:", cacheKey);
      return res.status(200).json(cachedData);
    }

    console.log("❌ CACHE MISS → API CALL:", cacheKey);

    // 🔥 STEP 5: CALL SPOONACULAR
    const recipes = await fetchRecipesFromAPI(params);

    // 🔥 STEP 6: STORE IN CACHE
    setCache(cacheKey, recipes);

    if(recipes)return res.status(200).json(recipes);

    return res.status(404).json({ message: "No recipes found" });

  } catch (error) {
    console.error("Error in getRecipes:", error);
    return res.status(500).json({
      message: "Failed to fetch recipes"
    });
  }
};

module.exports = { getRecipes };