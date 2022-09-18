<<<<<<< HEAD
import React from 'react';
//import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  //const location = useLocation();
  //const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto text-dark p-4" style={{backgroundColor:'#004173'}}>
      <div className="container text-center text-white m-0" style={{backgroundColor:'#004173'}}>
        
        {/*
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        */}

        <h4>&copy; {new Date().getFullYear()} - CriptoSedena Tecnhologies</h4>
      </div>
    </footer>
  );
};

export default Footer;
=======
import React from 'react';
//import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  //const location = useLocation();
  //const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto text-dark p-4" style={{backgroundColor:'#004173'}}>
      <div className="container text-center text-white m-0" style={{backgroundColor:'#004173'}}>
        
        {/*
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        */}

        <h4>&copy; {new Date().getFullYear()} - CriptoSedena Tecnhologies</h4>
      </div>
    </footer>
  );
};

export default Footer;
>>>>>>> abda662c57dad32b13ddb96ff3e2dfd86a6b08c2
