import { useEffect, useState } from "react";
import Footer from "../../componnent/Footer/footer";
import Header from "../../componnent/Header/headerprofil";
import VideoTestimonials from "./VideoTestiMonial/videoTestiMonial";
import CustomerFeedback from "./CustomerFeedBack/customerFeedback";

function HomeTestimonial() {
  const [testimonialOptions, setTestimonialOptions] = useState({});

  useEffect(() => {
    // Retrieve the selected options for testimonials from localStorage
    const step3Data = JSON.parse(localStorage.getItem("step3Data"));
    if (step3Data && step3Data.formSelections?.Testimonial) {
      const options = step3Data.formSelections.Testimonial.reduce((acc, item) => {
        acc[item] = true;
        return acc;
      }, {});
      setTestimonialOptions(options);
    }
  }, []);

  return (
    <div>
      {testimonialOptions.Header && <Header />}

      <div className="testimonial-page">
        <h1 className="text-center p-5 my-5">What Our Customers Say</h1>
        
        {testimonialOptions.CustomerFeedback && <CustomerFeedback/>}
        {testimonialOptions.VideoTestimonials && <VideoTestimonials/>}
      </div>

      {testimonialOptions.footer && <Footer />}
    </div>
  );
}

export default HomeTestimonial;
