
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FormContext } from "../../../../componnent/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import SummaryPage from "../summaryPage";
import "./step4.css";

function Step4() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(FormContext);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    setIsFullScreen(true);
  };

  const triggerConfetti = () => {
    const duration = 5* 1000; // 5 seconds
    const animationEnd = Date.now() + duration;
    const colors = ["#bb0000", "#ffffff", "#3333ff", "#00ff00","#f5f22b","#e32bf5","#f5312b"];

    const frame = () => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        particleCount: particleCount,
        spread: 100,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const handleAccept = () => {
    if (window.confirm("Are you sure you want to finalize this page?")) {
      triggerConfetti();

      // Save final data for the summary page
      updateFormData("finalData", formData.step3);
      localStorage.setItem("finalData", JSON.stringify(formData.step3));

      setTimeout(() => {
        navigate("/summaryPage");
      }, 2000);
    }
  };

  const handleBack = () => {
    if (window.confirm("Are you sure you want to go back to Step3?")) {
      const step3Data = JSON.parse(localStorage.getItem("step3Data")) || {
        selectedPages: formData.step3?.selectedPages || [],
        selectedOptions: formData.step3?.selectedOptions || {},
      };

      updateFormData("step3", step3Data);
      localStorage.setItem("step3Data", JSON.stringify(step3Data));
      navigate("/step3");
    }
  };

  return (
    <section className={`step4-container ${isFullScreen ? "full-screen" : ""}`}>
      <AnimatePresence>
        {!isFullScreen ? (
          <motion.div
            className="preview-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="preview-title">Summary Page Preview</h2>
            <p className="preview-subtitle">Click below to view in full-screen mode.</p>
            <button className="btn btn-primary" onClick={handleFullScreen}>
              View Full Screen
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="full-screen-summary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <SummaryPage />
            <div className="action-buttons">
              <motion.button
                className="btn btn-success"
                onClick={handleAccept}
                whileHover={{ scale: 1.1 }}
              >
                Accept
              </motion.button>
              <motion.button
                className="btn btn-danger"
                onClick={handleBack}
                whileHover={{ scale: 1.1 }}
              >
                Back
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Step4;











