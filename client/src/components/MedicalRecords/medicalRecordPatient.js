//import React, { useState } from 'react';
import React from 'react';
// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_SINGLE_MEDICAL_RECORD } from '../../utils/queries';

import Auth from '../../utils/auth';
import { format } from 'date-fns';

import MedicalRecordPatientForm from '../MedicalRecords/medicalRecordPatientForm';

const MedicalRecordPatient = () => {
  
  const { medicalRecordId } = useParams();
 

  const { loading, data } = useQuery(QUERY_SINGLE_MEDICAL_RECORD, {
    // pass URL parameter
    variables: { medicalRecordId: medicalRecordId },
  });

  const medicalrecord = data?.medicalrecord || {};
  console.log('medicalrecord.medicalstory',medicalrecord.medicalstory);


  if (loading) {
    return <div>Loading...</div>;
  }

   return (        
    <div>                    
          {Auth.loggedIn() ? (            
            <> 
          
              <div className="mt-3 mb-2"  style={{ backgroundColor: '#1d3557', color: 'white', padding: '10px'}}>
                Patient: {medicalrecord.patient.name+' '+medicalrecord.patient.lastname}<br />
                Date: {format(medicalrecord.createdAt,'dd-MM-yyyy hh:mm')} 
              </div>
              {
                <div className="my-1 p-1" style={{ border: '1px' }}>
                  <MedicalRecordPatientForm 
                    medicalrecord={medicalrecord}
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

export default MedicalRecordPatient;
