import axios from 'axios';

const API = axios.create({
    baseURL : "https://foodie-kart-backend.vercel.app/api/v1"
});

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

export const getRecipes = (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

 //console.log(token + typeof token);

  return API.get("/recipes", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllReviews = () => {
    return API.get("/reviews");
}

export const getReviewsByRecipeId = (recipeId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    return API.get(`/reviews/${recipeId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
}

export const postReview = ({recipeId,recipeName,rating,review}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    return API.post("/reviews",
        {
          recipeId,
          recipeName,
          rating,
          review
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
    )
}

// export const getRecipeById = (id) => API.get(`/recipes/${id}`);