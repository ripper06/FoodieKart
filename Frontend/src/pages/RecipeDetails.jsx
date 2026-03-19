import { useLocation } from "react-router-dom";
import "../App.css"
import ReviewSection from "../components/ReviewSection";

const RecipeDetails = () => {
  const location = useLocation();
  const recipe = location.state?.recipe;

  if (!recipe) {
    return <h2>No recipe data found</h2>;
  }

  return (
    <div>
      <h1 style={{padding : "10px", margin : "8px", color:"#6367FF"}}>{recipe.title}</h1>

      <img src={recipe.image} alt={recipe.title} />

      <p>⏱ {recipe.readyInMinutes} mins</p>
      <p>🍽 {recipe.servings}</p>

      <h2 style={{ marginTop: "20px", color : "black"}}>Ingredients : </h2>
      <ol >
        {recipe.extendedIngredients?.map((item) => (
          <li key={item.id} style={{padding : "5px", margin : "5px", border : "2px solid black", color:"#000", backgroundColor : "pink"}}>{item.original}</li>
        ))}
      </ol>

      <h2 style={{ marginTop: "20px", color : "black"}}>Steps : </h2>
      <ol>
        {recipe.analyzedInstructions[0]?.steps.map((step) => (
          <li key={step.number} style={{padding : "5px", margin : "5px", border : "2px solid black", color:"#000", backgroundColor : "#89D4FF"}}>{step.step}</li>
        ))}
      </ol>
      {/* 🔥 ADD REVIEW SECTION */}
      <ReviewSection 
        recipeId={recipe.id} 
        recipeName={recipe.title} 
      />
    </div>
  );
};

export default RecipeDetails;