import React from 'react';
import { useQuery } from '@apollo/client';

import PatientForm from '../Patients/patientForm';
import PatientList from '../Patients/patienList.js';


import { QUERY_PATIENTS } from '../../utils/queries';

import Auth from '../../utils/auth';

const AddPatient = () => {
    const { loading, data } = useQuery(QUERY_PATIENTS);
    const patients = data?.patients || [];

  return (
    <main>

{Auth.loggedIn() ? (
            <>

      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          
        >
          <PatientForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
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
                <div>You need to login</div>
              </>
            )}

    </main>
  );
};

export default AddPatient;
