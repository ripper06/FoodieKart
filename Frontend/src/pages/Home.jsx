
import { useState } from "react";
import "../css/Home.css"

// 1. DATA — recipe cards stored in an array of objects
const recipes = [
  { id: 1, emoji: "🍝", name: "Spaghetti Carbonara", time: "25 min", rating: 4.9, tags: ["Italian"] },
  { id: 2, emoji: "🍛", name: "Chicken Tikka Masala", time: "40 min", rating: 4.7, tags: ["Indian"] },
  { id: 3, emoji: "🥗", name: "Greek Salad", time: "10 min", rating: 4.5, tags: ["Healthy"] },
];

// 2. SMALL COMPONENT — reusable star display
const Stars = ({ n }) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

// 3. SMALL COMPONENT — a single recipe card
const RecipeCard = ({ recipe }) => (
  <div className="card">
    <div className="card-img">{recipe.emoji}</div>
    <div className="card-body">
      <span className="tag">{recipe.tags[0]}</span>
      <h3>{recipe.name}</h3>
      <p>⏱ {recipe.time} &nbsp; <span className="stars"><Stars n={recipe.rating} /></span> {recipe.rating}</p>
    </div>
  </div>
);

// 4. MAIN COMPONENT — the full landing page
const Home = () => {
  const [query, setQuery] = useState(""); // tracks what user types in search

  // filter recipes: show all OR only ones matching the search
  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>

      {/* HERO */}
      <section className="hero">
        <h1>Find & Rate <em>Delicious</em> Recipes</h1>
        <p>Search thousands of recipes. Cook. Rate. Share.</p>
        <input
          placeholder="Search recipes... e.g. pasta, salad"
          value={query}
          onChange={e => setQuery(e.target.value)} // update state on every keystroke
        />
      </section>

      {/* RECIPE GRID — .map() turns the array into cards */}
      <section className="grid">
        {filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}
        {filtered.length === 0 && <p className="empty">No recipes found for "{query}"</p>}
      </section>
    </main>
  );
};

export default Home;