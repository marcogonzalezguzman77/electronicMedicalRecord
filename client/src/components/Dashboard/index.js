<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

//from server/utils/auth.js I Can get email,name,_id with getProfile()

const Dashboard = () => {
  
  return (
        <div>
          {Auth.loggedIn() ? (
            <>

            <div className="float-left m-2">
                <div className='m-2'>
                <h4>Welcome {Auth.getProfile().data.name} {Auth.getProfile().data.lastname } {/*Auth.getProfile().data._id*/}</h4> 
                </div>
                <div>
                    <Link className="btn btn-md btn-primary m-2" to="/me">
                        My  Patients
                    </Link>
                    <Link className="btn btn-md btn-primary m-2" to="/addpatient">
                        Add Patient
                    </Link>
                </div>

            </div>

            </>
          ) : (
            <>
              <div>You need to login</div>
            </>
          )}

        </div>
   
  );
};

export default Dashboard;
=======
import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

//from server/utils/auth.js I Can get email,name,_id with getProfile()

const Dashboard = () => {
  
  return (
        <div>
          {Auth.loggedIn() ? (
            <>

            <div className="float-left m-2">
                <div className='m-2'>
                <h4>Welcome {Auth.getProfile().data.name} {Auth.getProfile().data.lastname } {/*Auth.getProfile().data._id*/}</h4> 
                </div>
                <div>
                    <Link className="btn btn-md btn-primary m-2" to="/me">
                        My  Patients
                    </Link>
                    <Link className="btn btn-md btn-primary m-2" to="/addpatient">
                        Add Patient
                    </Link>
                </div>

            </div>

            </>
          ) : (
            <>
              <div>You need to login</div>
            </>
          )}

        </div>
   
  );
};

export default Dashboard;
>>>>>>> abda662c57dad32b13ddb96ff3e2dfd86a6b08c2
