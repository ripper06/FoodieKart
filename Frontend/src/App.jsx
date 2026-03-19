import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";
import ProtectedRoute from "./components/ProtectedRoute";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <Router>
      <Header />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/recipes"
            element={
              <ProtectedRoute>
                <Recipes />
              </ProtectedRoute>
              }
          />

          <Route path="/recipe/:id" element={<RecipeDetails />} />

        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;