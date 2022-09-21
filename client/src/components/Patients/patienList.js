import React from 'react';
import { Link } from 'react-router-dom';

const PatientList = ({ patients, title }) => {
  if (!patients.length) {
    return <h3>No Patients Yet</h3>;
  }

  return (
    <div>
      <h3 className="mt-4" style={{color: 'black', fontSize: '22px'}}>{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {patients &&
          patients.map((patient) => (
            <div key={patient._id} className="col-12 col-xl-6">
              <div className="card mb-2">
                <h4 className="card-header text-light p-2 m-0"
                style={{ backgroundColor: '#caf0f8', color: 'black', padding: '10px'  }}
                >
               {/*patient._id*/} {/* patient.name */} 
               <Link
                  className="text-black"
                  to={`/medicalrecords/${patient._id}`}
                >
                 <span className="text-black" style={{ fontSize: '20px' }}>{patient.name} {patient.lastname}</span>
                </Link>
               
               <br />
                  <span className="text-black" style={{ fontSize: '14px' }}>
                    currently has {patient.medicalrecords ? patient.medicalrecords.length : 0}{' '}
                    medical record
                    {patient.medicalrecords && patient.medicalrecords.length === 1 ? '' : 's'}
                  </span>
                </h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PatientList;
