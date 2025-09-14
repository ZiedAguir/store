import "./videoTestiMonial.css"
const videoTestimonialsData = [
  {
    title: "Customer Testimonial ",
    url: "https://www.youtube.com/embed/Jw7s42Op2ao", 
  },
  {
    title: "Customer Testimonial 1",
    url: "https://www.youtube.com/embed/KNG-OqNe5PU", 
  },
  {
    title: "Customer Testimonial 2",
    url: "https://www.youtube.com/embed/a3dpJp92gys", 
  },
  {
    title: "Customer Testimonial 3",
    url: "https://www.youtube.com/embed/5MYXrwCszyE", 
  },
  {
    title: "Customer Testimonial 4",
    url: "https://www.youtube.com/embed/0F9NViANva8", 
  },
  {
    title: "Customer Testimonial 5",
    url: "https://www.youtube.com/embed/6pi25ozkBw8", 
  },
  {
    title: "Customer Testimonial 6",
    url: "https://www.youtube.com/embed/HPVfdg86lOc", 
  },
];

function VideoTestimonials() {
  return (
    <div className="video-testimonials-section">
      <h2 className="text-center my-4">Video Testimonials</h2>
      <div className="video-grid">
        {videoTestimonialsData.map((video, index) => (
          <div key={index} className="video-item">
            <h3>{video.title}</h3>
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="315"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoTestimonials;
