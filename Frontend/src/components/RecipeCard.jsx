import { useNavigate } from "react-router-dom";
import "../css/Recipes.css";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`, {
      state: { recipe },
    });
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipe-card-img"
      />
      <div className="recipe-card-body">
        <h3>{recipe.title}</h3>
        <p>⏱ {recipe.readyInMinutes} mins</p>
        <span className="view-btn">View Recipe →</span>
      </div>
    </div>
  );
};

export default RecipeCard;