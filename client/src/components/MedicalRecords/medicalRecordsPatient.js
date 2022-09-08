import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

//import SkillsList from '../components/SkillsList';
import MedicalRecordListPatient from '../MedicalRecords/medicalrecordList';
//import SkillForm from '../components/SkillForm';
import MedicalRecordForm from '../MedicalRecords/medicalrecordForm';

import { QUERY_SINGLE_PATIENT } from '../../utils/queries';

import Auth from '../../utils/auth';

const MedicalRecordsPatients = () => {
  // Use `useParams()` to retrieve value of the route parameter `:patientId`
  const { patientId } = useParams();
  //console.log('patientId',patientId);
  const { loading, data } = useQuery(QUERY_SINGLE_PATIENT, {
    // pass URL parameter
    variables: { patientId: patientId },
  });

  const patient = data?.patient || {};
  //console.log('patient',patient);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (    
    <div>
          {Auth.loggedIn() ? (
            <>
              <h4 className="card-header mt-3 mb-2"  style={{ backgroundColor: '#1d3557', color: 'white', padding: '10px'}}>
                {patient.name} {patient.lastname} Records
              </h4>
              {/*UserId:*/} {/*Auth.getProfile().data._id*/}
              {patient.medicalrecords?.length > 0 && <MedicalRecordListPatient medicalrecords={patient.medicalrecords} />}

              {
                <div className="my-4 p-4" style={{ border: '1px' }}>
                  <MedicalRecordForm 
                    patientId={patient._id} 
                    userId={Auth.getProfile().data._id}
                  />
                </div>
              }

              </>
                  ) : (
                    <>
                      <div>You need to login</div>
                    </>
                  )}

    </div>
  );
};

export default MedicalRecordsPatients;
