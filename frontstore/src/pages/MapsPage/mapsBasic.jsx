import { useEffect, useRef } from "react";
import SideBar from "../../componnent/SideBare/sideBare";
import Header from "../../componnent/Header/headerprofil";


function MapsBasic() {
    const basicMapRef = useRef(null); 
    const markerMapRef = useRef(null); 
  
    useEffect(() => {
      // Fonction pour initialiser la carte de base
      const initBasicMap = () => {
        const location = { lat: -34.397, lng: 150.644 }; 
        new window.google.maps.Map(basicMapRef.current, {
          zoom: 8,
          center: location,
        });
      };
  
      // Fonction pour initialiser la carte avec marqueurs
      const initMarkerMap = () => {
        const location = { lat: -34.397, lng: 150.644 }; 
        const map = new window.google.maps.Map(markerMapRef.current, {
          zoom: 8,
          center: location,
        });
  
        // Ajouter un marqueur
        new window.google.maps.Marker({
          position: location,
          map: map,
          title: 'Hello World!',
        });
      };
  
      // Charger le script Google Maps
      const loadGoogleMapsScript = () => {
        const script = document.createElement('script');
        script.src = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
        script.async = true;
        script.defer = true;
  
        // Attacher les fonctions de callback aux éléments globaux
        window.initMap = () => {
          initBasicMap();
          initMarkerMap();
        };
  
        document.head.appendChild(script); 
      };
  
      // Vérifier si l'API Google Maps est déjà chargée
      if (!window.google) {
        loadGoogleMapsScript();
      } else {
        initBasicMap();
        initMarkerMap();
      }
    }, []);
    return (
<section className="body">
  {/* start: header */}
 <Header/>
  {/* end: header */}
  <div className="inner-wrapper">
    {/* start: sidebar */}
    <aside id="sidebar-left" className="sidebar-left">
      <div className="sidebar-header">
        <SideBar/>
        </div>
       
     
    </aside>
    {/* end: sidebar */}
    <section role="main" className="content-body card-margin">
      <header className="page-header">
        <h2>Basic Maps</h2>
        <div className="right-wrapper text-end">
          <ol className="breadcrumbs">
            <li>
              <a href="index.html">
                <i className="bx bx-home-alt" />
              </a>
            </li>
            <li><span>Maps</span></li>
            <li><span>Basic</span></li>
          </ol>
          <a className="sidebar-right-toggle" data-open="sidebar-right">
            <i className="fas fa-chevron-left" />
          </a>
        </div>
      </header>
      
      {/* start: page */}
      <div className="row">
        <div className="col-lg-6">
          <section className="card">
            <header className="card-header">
              <div className="card-actions">
                <a href="#" className="card-action card-action-toggle" data-card-toggle />
                <a href="#" className="card-action card-action-dismiss" data-card-dismiss />
              </div>
              <h2 className="card-title">Basic</h2>
            </header>
            <div className="card-body">
              {/* Carte de base */}
              <div ref={basicMapRef} style={{ height: 500, width: 1000 }} />
            </div>
          </section>
        </div>

        <div className="col-lg-6">
          <section className="card">
            <header className="card-header">
              <div className="card-actions">
                <a href="#" className="card-action card-action-toggle" data-card-toggle />
                <a href="#" className="card-action card-action-dismiss" data-card-dismiss />
              </div>
              <h2 className="card-title">Basic with Markers</h2>
            </header>
            <div className="card-body">
              {/* Carte avec marqueur */}
              <div ref={markerMapRef} style={{ height: 500, width: '100%' }} />
            </div>
          </section>
        </div>
      </div>
      {/* end: page */}
    </section>
  </div>
 
</section>



    );
  }
  
  export default MapsBasic;