import { useEffect, useState } from "react";
import apiRequest from "../axios/axiosInstance";

const ReviewComponent = ({ productId }) => {
  const [review, setReview] = useState({
    username: '',
    email: '',
    rating: 0,
    description: '',
  });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await apiRequest.get('/review', { params: { product: productId } });
        setReviews(res.data.data || res.data.review || []);
      } catch (e) {
        setError(e?.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchReviews();
  }, [productId]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setReview((prevReview) => ({
      ...prevReview,
      rating,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await apiRequest.post('/review/create-review', {
        message: review.description,
        productId,
        rating: review.rating || 5,
      });
      const res = await apiRequest.get('/review', { params: { product: productId } });
      setReviews(res.data.data || res.data.review || []);
      setReview({ username: '', email: '', rating: 0, description: '' });
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div className="review-component">
      <h4 className="mb-4">Reviews</h4>
      {loading && <div>Loading reviews...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && reviews.length === 0 && <div>No reviews yet.</div>}
      {!loading && reviews.map((r) => (
        <div className="media mb-4" key={r._id}>
          <img src={r.image || "/public/img/avatars/avatar-2.jpg"} alt="User" className="img-fluid mr-3 mt-1" style={{ width: 45 }} />
          <div className="media-body">
            <h6>{r.user?.name || 'User'}<small> - <i>{new Date(r.createdAt).toLocaleDateString()}</i></small></h6>
            <div className="text-primary mb-1">{"⭐".repeat(Math.max(1, Math.min(5, r.rating || 5)))}</div>
            <p>{r.message}</p>
          </div>
        </div>
      ))}

      <h4 className="mb-4">Leave a review</h4>
      <small>Your email address will not be published. Required fields are marked *</small>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <p className="mb-0 mr-2">Your Rating * :</p>
          <div className="text-primary">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`far fa-star ${review.rating >= star ? 'selected' : ''}`}
                onClick={() => handleRatingChange(star)}
              />
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Your Review *</label>
          <textarea
            id="description"
            name="description"
            cols={30}
            rows={5}
            className="form-control"
            value={review.description}
            onChange={handleInputChange}
          />
        </div>
        {/* Name and email collected from authenticated user on backend; keep form minimal */}
        <div className="form-group mb-0">
          <input
            type="submit"
            value="Leave Your Review"
            className="btn btn-primary px-3"
          />
        </div>
      </form>
    </div>
  );
};

export default ReviewComponent;