import { useState, useEffect } from "react";
import "../css/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Demo fallback data
const DEMO_RECIPES = [
  { _id: "demo1", recipeName: "Spaghetti Carbonara", rating: 5, review: "Creamy, rich and absolutely delicious!", createdAt: new Date().toISOString(), userId: { name: "Demo User" } },
  { _id: "demo2", recipeName: "Chicken Tikka Masala", rating: 4, review: "Amazing flavours, will make again!", createdAt: new Date().toISOString(), userId: { name: "Demo User" } },
  { _id: "demo3", recipeName: "Greek Salad", rating: 4, review: "Fresh, healthy and super easy to make.", createdAt: new Date().toISOString(), userId: { name: "Demo User" } },
];

const Stars = ({ n }) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

const RecipeCard = ({ recipe, isDemo }) => (
  <div className={`card ${isDemo ? "demo-card" : ""}`}>
    <div className="card-img">🍲</div>
    <div className="card-body">
      {isDemo && <span className="demo-badge">Demo</span>}
      <span className="tag">👤 {recipe.userId?.name ?? "Anonymous"}</span>
      <h3>{recipe.recipeName}</h3>
      <p>
        <span className="stars"><Stars n={recipe.rating} /></span> {recipe.rating}/5
      </p>
      <p className="review">"{recipe.review}"</p>
      <p className="date">🗓 {new Date(recipe.createdAt).toLocaleDateString()}</p>
    </div>
  </div>
);

const Home = () => {
  const [realRecipes, setRealRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:4090/api/v1/reviews");
        setRealRecipes(data?.length > 0 ? data : []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setRealRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isDemo = realRecipes.length === 0;
  const source = isDemo ? DEMO_RECIPES : realRecipes;

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <h1>Find & Rate <em>Delicious</em> Recipes</h1>
        <p>Explore thousands of recipes, share your feedback, and discover what others love.</p>

        {/* CTA Banner */}
        <div className="cta-banner">
          <p>🔐 Login to explore recipes and leave your own reviews!</p>
          <button className="cta-btn" onClick={() => navigate("/login")}>
            Login to Get Started →
          </button>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="reviews-header">
        <h2>⭐ What People Are Saying</h2>
        {isDemo && !loading && (
          <p className="demo-notice">⚠️ Showing demo reviews — be the first to add one!</p>
        )}
      </section>

      <section className="grid">
        {loading ? (
          <p className="loading">Loading reviews...</p>
        ) : (
          source.map(r => <RecipeCard key={r._id} recipe={r} isDemo={isDemo} />)
        )}
      </section>
    </main>
  );
};

export default Home;