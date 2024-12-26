import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ onSubmit, movieId }) => {
  const [review, setReview] = useState({
    text: '',
    rating: 5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      movieId,
      content: review.text,
      rating: review.rating,
      author: 'Anonymous',
      created_at: new Date().toISOString()
    });
    setReview({ text: '', rating: 5 });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="review">Write your review</label>
        <textarea
          id="review"
          value={review.text}
          onChange={(e) => setReview({ ...review, text: e.target.value })}
          placeholder="Share your thoughts about this movie..."
          required
        />
      </div>
      
      <div className="form-footer">
        <div className="rating-select">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map(num => (
              <option key={num} value={num}>
                {num} Star{num !== 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit">Submit Review</button>
      </div>
    </form>
  );
};

export default ReviewForm;