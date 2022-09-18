import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const Welcome = () => {
 
 
 
  return (
    <main>

      {Auth.loggedIn() ? (
        <>

        <div className="flex-row justify-center">
          <div className="col-12 col-md-10 my-3">
          <h1>{Auth.getProfile().data.name}'s page</h1>
          <h2>This is the Home Route.</h2>          
          </div>

          <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/dashboard`}
            >
              Go to Dashboard.
          </Link>

        </div>
        </>
          ) : (
            <>
              <div><h4 className='mt-4'>Welcome you need to login</h4  ></div>
            </>
          )}

    </main>
  );



}; //end Welcom

export default Welcome;