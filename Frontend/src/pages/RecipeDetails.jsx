import { useLocation } from "react-router-dom";
import "../css/RecipeDetails.css";
import ReviewSection from "../components/ReviewSection";

const RecipeDetails = () => {
  const location = useLocation();
  const recipe = location.state?.recipe;

  if (!recipe) {
    return <p className="no-recipe">No recipe data found.</p>;
  }

  return (
    <div className="recipe-details">

      <h1>{recipe.title}</h1>

      <img src={recipe.image} alt={recipe.title} />

      <div className="recipe-meta">
        <p>⏱ {recipe.readyInMinutes} mins</p>
        <p>🍽 {recipe.servings} servings</p>
      </div>

      <h2>Ingredients</h2>
      <ol>
        {recipe.extendedIngredients?.map((item) => (
          <li key={item.id} className="ingredient-item">
            {item.original}
          </li>
        ))}
      </ol>

      <h2>Steps</h2>
      <ol>
        {recipe.analyzedInstructions[0]?.steps.map((step) => (
          <li key={step.number} className="step-item">
            <span className="step-number">{step.number}</span>
            {step.step}
          </li>
        ))}
      </ol>

      <hr className="recipe-divider" />

      <ReviewSection
        recipeId={recipe.id}
        recipeName={recipe.title}
      />

    </div>
  );
};

export default RecipeDetails;