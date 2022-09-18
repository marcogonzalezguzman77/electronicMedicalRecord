<<<<<<< HEAD
import React from 'react';
import PatientList from '../Patients/patienList.js';
import { useQuery } from '@apollo/client';
import { QUERY_PATIENTS } from '../../utils/queries';

import Auth from '../../utils/auth';

const Patients = () => {
  const { loading, data } = useQuery(QUERY_PATIENTS);
  const patients = data?.patients || [];

  return (
    <main>
      {Auth.loggedIn() ? (
            <>

            <div className="flex-row justify-center">
              <div className="col-12 col-md-10 my-3">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <PatientList
                      patients={patients}
                      title="Actual system patients"
                  />
                )}
              </div>
            </div>

            </>
            ) : (
              <>
                <div><h4 className='mt-4'>You need to login</h4  ></div>
              </>
            )}

    </main>
  );
};

export default Patients;
=======
import React from 'react';
import PatientList from '../Patients/patienList.js';
import { useQuery } from '@apollo/client';
import { QUERY_PATIENTS } from '../../utils/queries';

import Auth from '../../utils/auth';

const Patients = () => {
  const { loading, data } = useQuery(QUERY_PATIENTS);
  const patients = data?.patients || [];

  return (
    <main>
      {Auth.loggedIn() ? (
            <>

            <div className="flex-row justify-center">
              <div className="col-12 col-md-10 my-3">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <PatientList
                      patients={patients}
                      title="Actual system patients"
                  />
                )}
              </div>
            </div>

            </>
            ) : (
              <>
                <div><h4 className='mt-4'>You need to login</h4  ></div>
              </>
            )}

    </main>
  );
};

export default Patients;
>>>>>>> abda662c57dad32b13ddb96ff3e2dfd86a6b08c2
