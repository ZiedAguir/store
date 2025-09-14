import { useRef, useState, useEffect, useContext } from "react";
import apiRequest from "../../../componnent/axios/axiosInstance";
import moment from "moment";
import { FormContext } from "../../../componnent/context/AuthContext";

function UsersReviews() {
  const { currentUser } = useContext(FormContext);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null); 
  const [updatedMessage, setUpdatedMessage] = useState(""); 
  const [updatedImage, setUpdatedImage] = useState(null); 
  const [updatedPreview, setUpdatedPreview] = useState(null); 
  const fileInputRef = useRef(null);

  // Fonction pour récupérer les reviews
  const fetchReviews = async () => {
    try {
      const userId = currentUser?.data?._id;
      const response = userId
        ? await apiRequest.get(`/review/for-creator/${userId}`)
        : await apiRequest.get("/review");
      const reviewData = response.data?.data || [];

      const updatedReviews = await Promise.all(
        reviewData.map(async (review) => {
          try {
            const userResponse = await apiRequest.get(`/users/${review.user}`);
            const userName = userResponse.data?.data?.name || "Utilisateur inconnu";
            return { ...review, userName };
          } catch (error) {
            console.error("Erreur lors de la récupération du nom de l'utilisateur:", error);
            return { ...review, userName: "Utilisateur inconnu" };
          }
        })
      );

      localStorage.setItem("reviews", JSON.stringify(updatedReviews));
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Erreur lors de la récupération des reviews:", error);
    }
  };

  // Fonction pour supprimer une review
  const handleDeleteReview = async (reviewId) => {
    try {
      await apiRequest.delete(`/review/${reviewId}`);
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
      localStorage.setItem(
        "reviews",
        JSON.stringify(reviews.filter((review) => review._id !== reviewId))
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la review:", error);
    }
  };

  const handleUpdateReview = async () => {
    if (!selectedReview) return;
    try {
      const formData = new FormData();
      formData.append("message", updatedMessage);
      if (updatedImage) {
        formData.append("image", updatedImage);
      }
      const response = await apiRequest.put(`/review/update-review/${selectedReview._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      const updatedReview = {
        ...selectedReview,
        message: updatedMessage,
        image: response.data.review.image, 
      };
  
      // Mettre à jour l'état et le localStorage
      setReviews((prevReviews) => {
        const updatedReviews = prevReviews.map((review) =>
          review._id === selectedReview._id ? updatedReview : review
        );
        localStorage.setItem("reviews", JSON.stringify(updatedReviews)); 
        return updatedReviews;
      });
  
      setSelectedReview(null);
      setUpdatedMessage("");
      setUpdatedImage(null);
      setUpdatedPreview(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la review:", error);
    }
  };
  

  // Fonction pour gérer le changement de fichier dans la modal
  const handleUpdatedFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setUpdatedImage(selectedFile);
      setUpdatedPreview(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentUser]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;

    const formData = new FormData();
    formData.append("message", message);
    if (file) formData.append("image", file);

    try {
      const response = await apiRequest.post("/review/create-review", formData);
      let newReview = response.data?.review;

      if (newReview) {
        newReview.createdAt = newReview.createdAt || new Date().toISOString();
        try {
          const userResponse = await apiRequest.get(`/users/${newReview.user}`);
          const userName = userResponse.data?.data?.name || "Utilisateur inconnu";
          newReview = { ...newReview, userName };
        } catch (error) {
          console.error("Erreur lors de la récupération du nom de l'utilisateur:", error);
          newReview = { ...newReview, userName: "Utilisateur inconnu" };
        }

        setReviews((prevReviews) => {
          const updatedReviews = [newReview, ...prevReviews];
          localStorage.setItem("reviews", JSON.stringify(updatedReviews));
          return updatedReviews;
        });

        setMessage("");
        setFile(null);
        setPreview(null);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la review:", error);
    }
  };

  return (
    <div id="overview" className="tab-pane active">
      <div className="p-3">
        <h4 className="mb-3 font-weight-semibold text-dark">Write your comment</h4>
        <section className="simple-compose-box mb-3">
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Write here..."
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {preview && (
              <img
                src={preview}
                width={50}
                height={50}
                alt="Preview"
                className="avatar"
                style={{ marginRight: "10px", borderRadius: "50%" }}
              />
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <div className="compose-box-footer">
              <ul className="compose-toolbar">
                <li>
                  <i
                    className="fas fa-camera"
                    onClick={() => fileInputRef.current.click()}
                    style={{ cursor: "pointer", fontSize: "20px", marginLeft: "10px" }}
                  />
                </li>
              </ul>
              <ul className="compose-btn">
                <li>
                  <button type="submit" className="btn btn-primary btn-xs">Post</button>
                </li>
              </ul>
            </div>
          </form>
        </section>
<div className="reviews-container" >
{Array.isArray(reviews) && reviews.length > 0 ? (
          <>
            <h4 className="mb-3 pt-4 font-weight-semibold text-dark">Users Reviews</h4>
            <div className="timeline timeline-simple mt-3 mb-3">
              <div className="tm-body">
                {reviews.map((review, index) => (
                  <div key={index}>
                    <div className="tm-title">
                      <h5 className="m-0 pt-2 pb-2 text-dark font-weight-semibold text-uppercase">
                        {moment(review.createdAt).format("MMMM YYYY")}
                      </h5>
                    </div>
                    <ol className="tm-items">
                      <li>
                        <div className="tm-box">
                          <p className="text-muted mb-0">{moment(review.createdAt).fromNow()}.</p>
                          <p>{review.message}</p>
                          <div className="thumbnail-gallery">
                            {review.image && (
                              <a className="img-thumbnail lightbox" href={review.image}>
                                <img className="img-fluid" width={215} src={review.image} alt="Review" crossOrigin="anonymous" />
                                <span className="zoom">
                                  <i className="bx bx-search" />
                                </span>
                              </a>
                            )}
                          </div>
                          {review.userName && (
                            <p className="text-dark text-uppercase">{review.userName}</p>
                          )}
                          {!review.userName && (
                            <p className="text-dark text-uppercase">Anonymous</p>
                          )}
                          <div className="d-flex justify-content-end mt-2">
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => {
                                setSelectedReview(review);
                                setUpdatedMessage(review.message);
                                setUpdatedPreview(review.image);
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteReview(review._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>Aucune review disponible.</p>
        )}
</div>
        

        {/* Modal pour la mise à jour */}
        {selectedReview && (
          <div className="modal" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modifier votre review</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedReview(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <textarea
                    className="form-control mb-3"
                    rows="3"
                    value={updatedMessage}
                    onChange={(e) => setUpdatedMessage(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control mb-3"
                    onChange={handleUpdatedFileChange}
                  />
                  {updatedPreview && (
                    <img
                      src={updatedPreview}
                      alt="Preview"
                      className="img-fluid mb-3"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )}
                </div>
                <div className="modal-footer d-flex justify-content-end mt-2" style={{ width: "100%" }}> 
                  <button
                    style={{ width: "50%" }}
                    type="button"
                    className="btn btn-primary"
                    onClick={handleUpdateReview}
                  >
                    Save
                  </button>
                  <button
                    style={{ width: "50%" }}
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedReview(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Styles pour le scroll */}
      <style>
        {`
          .reviews-container {
            max-height: 68rem;
            overflow-y: auto;
            padding-right: 10px;
          }
          .reviews-container::-webkit-scrollbar {
            width: 8px;
          }
          .reviews-container::-webkit-scrollbar-thumb {
            background-color: #ccc;
            border-radius: 4px;
          }
        `}
      </style>
    </div>
  );
}

export default UsersReviews;

