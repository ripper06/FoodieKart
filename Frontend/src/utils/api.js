import axios from 'axios';

const API = axios.create({
    baseURL : "http://localhost:4090/api/v1"
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

// export const getRecipeById = (id) => API.get(`/recipes/${id}`);