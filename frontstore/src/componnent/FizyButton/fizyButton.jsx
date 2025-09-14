import './fizyBuuton.scss'; 

const FizzyButton = () => {
  const spots = Array.from({ length: 52 });

  return (
    <div className="button">
      <input id="button" type="checkbox" />
      <label htmlFor="button" >
        <div className="button_inner " style={{ backgroundColor:"#d9f9f2"}}  >
        <span>
            <button type="button" className="fizzy-btn">⚙</button>
          </span>

          <span>
            <i className="tick ion-checkmark-round"></i>
          </span>
          <div className="b_l_quad">
            {spots.map((_, index) => (
              <div key={index} className="button_spots"></div>
            ))}
          </div>
        </div>
      </label>
    </div>
  );
};

export default FizzyButton;
