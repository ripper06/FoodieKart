import { useEffect, useState } from "react";
import axios from "axios";

const ReviewSection = ({ recipeId, recipeName }) => {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const token = JSON.parse(localStorage.getItem("user")).token;

  // 🔥 Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4090/api/v1/reviews/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setReviews(res.data.reviews);
      setAvgRating(res.data.avgRating);
    } catch (err) {
      console.error("Fetch reviews error:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [recipeId]);

  // 🔥 Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:4090/api/v1/reviews",
        {
          recipeId,
          recipeName,
          rating,
          review: comment
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // reset form
      setComment("");
      setRating(5);

      // refresh reviews
      fetchReviews();

    } catch (err) {
      console.error("Submit review error:", err);
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>⭐ Reviews</h2>

      {/* 🔥 Average Rating */}
      <p>Average Rating: {avgRating.toFixed(1)} ⭐</p>

      {/* 🔥 Add Review */}
      <form onSubmit={handleSubmit}>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>

        <br />

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <br />

        <button type="submit">Submit</button>
      </form>

      {/* 🔥 CONDITIONAL RENDERING */}
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first!</p>
      ) : (
        <div>
          {reviews.map((r, i) => (
            <div
              key={i}
              style={{
                border: "1px solid black",
                padding: "10px",
                margin: "10px 0"
              }}
            >
              <p><strong>{r.userId?.name}</strong></p>
              <p>Rating: {r.rating} ⭐</p>
              <p>{r.review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;