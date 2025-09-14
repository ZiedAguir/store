
  import { useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { FormContext } from "../../context/AuthContext";

function AiFillStarComponent() {
  const { formData, setFormData } = useContext(FormContext);

  const rating = formData.step1?.rating || 0; 

  const handleRatingChange = (newRating) => {
    // Mettre à jour le contexte avec le nouveau rating
    setFormData((prevData) => ({
      ...prevData,
      step1: {
        ...prevData.step1,
        rating: newRating,
      },
    }));
  };

  return (
    <div className="nav-form d-none d-xl-inline-block" style={{ marginLeft: "-20px" }}>
      {/* Générer dynamiquement les étoiles */}
      {Array.from({ length: 5 }, (_, index) => (
        <AiFillStar
          key={index}
          size={25}
          color={index < rating ? "gold" : "gray"} 
          onClick={() => handleRatingChange(index + 1)} 
          style={{ cursor: "pointer", margin: "0 5px" }}
        />
      ))}
      
    </div>
  );
}

export default AiFillStarComponent;
