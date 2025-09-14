import  { useState } from 'react';
import { motion } from 'framer-motion';

const ImageUploadSection = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null); 

  // Fonction pour gérer le changement de fichier
  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setSelectedImage(file); 
      if (onImageUpload) {
        onImageUpload(file); 
      }
    }
  };

  return (
    <motion.section
      className="card card-modern card-big-info"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <div className="card-body">
        <div className="row">
          <div className="col-lg-2-5 col-xl-1-5">
            <i className="card-big-info-icon bx bx-camera" />
            <h2 className="card-big-info-title">Category Image</h2>
            <p className="card-big-info-desc">Upload your category image</p>
          </div>
          <div className="col-lg-3-5 col-xl-4-5">
            <div className="form-group row align-items-center">
              <div className="col">
        
                 <div className="form-group row align-items-center pb-3">
                  <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                    Image :
                  </label>
                  <div className="col-lg-7 col-xl-6">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    {selectedImage && (
                  <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '5px' }}
                    />
                    <p style={{ marginTop: '5px', fontSize: '14px' }}>
                      {selectedImage.name}
                    </p>
                  </div>
                )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ImageUploadSection;