<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="text-dark p-3 palign-center" style={{backgroundColor:'#004173'}}>
    <div className="container text-center" style={{color:'white'}}>
      <div className="row">
            <div className="col col-lg-6 col-md-6 ">
              <h2 className="m-0">Medical Records</h2>      
              <p className="m-0">Your patients everywhere!</p>
            </div>
            <div className="col col-lg-6 col-md-6">
              {Auth.loggedIn() ? (
                    <>
                    <div className="float-left m-2">
                      {Auth.getProfile().data.name}'s profile
                    </div>
                      {/*}  <Link className="btn btn-lg btn-primary m-2" to="/me">
                        View My Profile
                      </Link>*/}
                      <span className="float-right">
                      <button className="btn btn-md btn-light m-2"  onClick={logout}>
                        Logout
                      </button>
                      </span>

                    </>
                  ) : (
                    <>
                      <Link className="btn btn-md btn-primary m-2" to="/login">
                        Login
                      </Link>
                      <Link className="btn btn-md btn-light m-2" to="/signup">
                        Signup
                      </Link>
                    </>
                  )}
                </div> {/*div login logout */}
          </div> {/*div row */}
      </div> {/*div container */}
    </header>
  );
};

export default Header;
=======
import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="text-dark p-3 palign-center" style={{backgroundColor:'#004173'}}>
    <div className="container text-center" style={{color:'white'}}>
      <div className="row">
            <div className="col col-lg-6 col-md-6 ">
              <h2 className="m-0">Medical Records</h2>      
              <p className="m-0">Your patients everywhere!</p>
            </div>
            <div className="col col-lg-6 col-md-6">
              {Auth.loggedIn() ? (
                    <>
                    <div className="float-left m-2">
                      {Auth.getProfile().data.name}'s profile
                    </div>
                      {/*}  <Link className="btn btn-lg btn-primary m-2" to="/me">
                        View My Profile
                      </Link>*/}
                      <span className="float-right">
                      <button className="btn btn-md btn-light m-2"  onClick={logout}>
                        Logout
                      </button>
                      </span>

                    </>
                  ) : (
                    <>
                      <Link className="btn btn-md btn-primary m-2" to="/login">
                        Login
                      </Link>
                      <Link className="btn btn-md btn-light m-2" to="/signup">
                        Signup
                      </Link>
                    </>
                  )}
                </div> {/*div login logout */}
          </div> {/*div row */}
      </div> {/*div container */}
    </header>
  );
};

export default Header;
>>>>>>> abda662c57dad32b13ddb96ff3e2dfd86a6b08c2
