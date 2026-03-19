import { useNavigate } from "react-router-dom";
import "../App.css"

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`, {
      state: { recipe },
    });
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={recipe.image} alt={recipe.title} />

      <h3>{recipe.title}</h3>

      <p>⏱ {recipe.readyInMinutes} mins</p>
    </div>
  );
};

export default RecipeCard;