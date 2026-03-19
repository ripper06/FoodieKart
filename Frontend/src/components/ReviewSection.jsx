import { useEffect, useState } from "react";
import { getReviewsByRecipeId, postReview } from "../utils/api";
import "../css/ReviewSection.css";

const Stars = ({ n }) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

const ReviewSection = ({ recipeId, recipeName }) => {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await getReviewsByRecipeId(recipeId);
      setReviews(res.data.reviews);
      setAvgRating(res.data.avgRating);
    } catch (err) {
      console.error("Fetch reviews error:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [recipeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postReview({ recipeId, recipeName, rating, review: comment });
      setComment("");
      setRating(5);
      fetchReviews();
    } catch (err) {
      console.error("Submit review error:", err);
    }
  };

  return (
    <div className="review-section">
      <h2>⭐ Reviews</h2>

      <p className="avg-rating">
        Average Rating: <strong>{avgRating.toFixed(1)}</strong> <Stars n={avgRating} />
      </p>

      {/* ── ADD REVIEW FORM ── */}
      <form className="review-form" onSubmit={handleSubmit}>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>{r} ⭐</option>
          ))}
        </select>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <button type="submit">Submit Review</button>
      </form>

      {/* ── REVIEW LIST ── */}
      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet — be the first!</p>
      ) : (
        <div className="review-list">
          {reviews.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-card-header">
                <strong>{r.userId?.name ?? "Anonymous"}</strong>
                <span className="stars"><Stars n={r.rating} /> {r.rating}/5</span>
              </div>
              <p>{r.review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;