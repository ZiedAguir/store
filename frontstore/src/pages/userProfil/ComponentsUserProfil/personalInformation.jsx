import { useState } from "react";
import UploadWidget from "../../../componnent/UploadWidget/UploadWidget";
import "./PersonalInformation.css";
import apiRequest from "../../../componnent/axios/axiosInstance";

function PersonalInformation() {
  const [avatar, setAvatar] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = {
     name:formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      addresseProfil: formData.get("addresseProfil"),
      Projects: formData.get("projects"),
      descriptionOfproject:formData.get("descriptionOfproject"),
      Language: formData.get("language"),
      about: formData.get("about"),
      profileImg: Array.isArray(avatar) ? avatar[0] : avatar, 
      
    };

    try {
      const response = await apiRequest.put("/users/updateMe", userData);
      console.log("Update successful", response.data);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div id="edit" className="tab-pane">
      <form className="p-3" onSubmit={handleSubmit}>
        <h4 className="mb-3 font-weight-semibold text-dark">Personal Information</h4>
        <div className="row mb-4">
        <div className="mb-3">
            <label htmlFor="FormControlInput3" className="form-label">name</label>
            <input type="text" className="form-control" id="FormControlInput3" name="name" placeholder="name..." required />
          </div>
          <div className="mb-3">
            <label htmlFor="FormControlInput1" className="form-label">Email</label>
            <input type="email" className="form-control" id="FormControlInput1" name="email" placeholder="name@example.com" required />
          </div>
          <div className="mb-3">
            <label htmlFor="tel1" className="form-label">Phone</label>
            <input type="tel" className="form-control" id="tel1" name="phone" placeholder="phone" required />
          </div>
          <div className="form-group col">
            <label htmlFor="inputAddress">Address</label>
            <input type="text" className="form-control" id="inputAddress" name="addresseProfil" placeholder="Apartment, Studio, or floor" required />
          </div>
        </div>

        <div className="form-group col">
          <label htmlFor="project">Projects</label>
          <input type="text" className="form-control" id="project" name="projects" placeholder="projects..." />
        </div>
        <div className="form-group col">
          <label htmlFor="descriptionOfproject">description Of project :</label>
          <input type="text" className="form-control" id="descriptionOfproject" name="descriptionOfproject" placeholder="description of projects..." />
        </div>
        <div className="form-group col">
          <label htmlFor="langue">Language</label>
          <input type="text" className="form-control" id="langue" name=" language" placeholder="language..." />
        </div>
        <div className="form-group col">
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">About</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" name="about" placeholder="Write your career"></textarea>
          </div>
        </div>

        <hr className="dotted tall" />

        <div className="sideContainer">
          <img src={avatar || "img/noavatar.jpg"} width={80} height={80} alt="Avatar" className="avatar" />
          <UploadWidget
            uwConfig={{
              cloudName: "abdoudev",
              uploadPreset: "estate",
              multiple: false,
              maxImageFileSize: 2000000,
              folder: "PersonalInformation",
            }}
            setState={setAvatar}
          />
        </div>

        <div className="row">
          <div className="col-md-12 text-end mt-3">
            <button className="btn btn-primary modal-confirm">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PersonalInformation;
