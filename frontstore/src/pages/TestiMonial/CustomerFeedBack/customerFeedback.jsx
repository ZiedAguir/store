import "./customerFeedBack.css"; 
const feedbackData = [
  {
    name: "Zied Aguir",
    feedback: "Astra-Store has been incredibly helpful for my business. The products are top-notch, and the customer service is unparalleled.",
    profilePic: "/img/ayman.webp", 
  },
  {
    name: "Jane Smith",
    feedback: "The team at Astra-Store is amazing! They went above and beyond to make sure I had everything I needed. Highly recommended!",
    profilePic:"/img/ahlem.jpeg",
  },
  {
    name: "Michael Brown",
    feedback: "I’m very pleased with my experience. The platform is easy to use, and the support team is very responsive.",
    profilePic: "/img/elhem.jpg",
  },
];

function CustomerFeedback() {
  return (
    <div className="customer-feedback-section">
      <h2 className="text-center">Customer Feedback</h2>
      <div className="feedback-cards">
        {feedbackData.map((feedback, index) => (
          <div key={index} className="feedback-card">
            <img src={feedback.profilePic} alt={`${feedback.name}'s profile`} className="profile-pic" />
            <div className="feedback-content">
              <h4 className="customer-name">{feedback.name}</h4>
              <p className="customer-feedback">{feedback.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerFeedback;
