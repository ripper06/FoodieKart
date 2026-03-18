const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 4090,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.jwt_secret,
    RECIPE_API: process.env.SPOONACULAR_API
};