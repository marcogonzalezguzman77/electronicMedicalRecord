<<<<<<< HEAD
import React from 'react';
import MedicalRecordList from '../MedicalRecords/medicalrecordList';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICAL_RECORDS } from '../../utils/queries';


import Auth from '../../utils/auth';

const MedicalRecords = () => {
  const { loading, data } = useQuery(QUERY_MEDICAL_RECORDS);
  const medicalrecords = data?.medicalrecords || [];

  return (
    <main>      
       {Auth.loggedIn() ? (
            <>

            <div className="flex-row justify-center">
              <div className="col-12 col-md-10 my-3">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <MedicalRecordList
                      medicalrecords={medicalrecords}
                      title="Actual system Medical Records"
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

export default MedicalRecords;
=======
import React from 'react';
import MedicalRecordList from '../MedicalRecords/medicalrecordList';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICAL_RECORDS } from '../../utils/queries';


import Auth from '../../utils/auth';

const MedicalRecords = () => {
  const { loading, data } = useQuery(QUERY_MEDICAL_RECORDS);
  const medicalrecords = data?.medicalrecords || [];

  return (
    <main>      
       {Auth.loggedIn() ? (
            <>

            <div className="flex-row justify-center">
              <div className="col-12 col-md-10 my-3">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <MedicalRecordList
                      medicalrecords={medicalrecords}
                      title="Actual system Medical Records"
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

export default MedicalRecords;
>>>>>>> abda662c57dad32b13ddb96ff3e2dfd86a6b08c2
