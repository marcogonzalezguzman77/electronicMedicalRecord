import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

//import ThoughtForm from '../components/ThoughtForm';
import PatientList from '../Patients/patienList.js';

import { QUERY_SINGLE_USER, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const Profile = () => {
  const { userId } = useParams();
  //console.log('userParam', useParams() );
  const { loading, data } = useQuery(userId ? QUERY_SINGLE_USER : QUERY_ME, {
    variables: { userId: userId },
  });

  //console.log('data',data);

  const user = data?.me || data?.user || {};
  //console.log('user',user);
  

  // navigate to personal profile page if _id is yours
  //console.log('outside Auth.loggedIn()')
  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    //console.log('inside Auth.loggedIn()')
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.name) {
    return (          
      <h4>        
         {/*Auth.getProfile().data.name*/} You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center">
    {/*    <h4 className="col-12 col-md-10 p-3 mb-2" style={{ backgroundColor: '', color: 'black', padding: '10px'  }}>
       {/* Viewing {userId ? `${user.name}'s` : 'your'} profile.  {/*user.name} {JSON.stringify(user.patients)*/} 
    {/*    </h4>*/}

        <div className="col-12 col-md-10 mb-5">
         <PatientList
            patients={user.patients}
            title={`${user.name}'s patients...`}
            showTitle={false}
            showUsername={false}
        />
        </div>

        {/*!userId && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <PatientForm />
          </div>
        )*/}
      </div>
    </div>
  );
};

export default Profile;
