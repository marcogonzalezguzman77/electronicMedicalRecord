import React from 'react';
//import Moment from 'moment';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const MedicalRecordListPatient = ({ medicalrecords}) => {
  //console.log('medicalrecords.length',medicalrecords.length)
  if (!medicalrecords.length) {
    return <h3>No Medical Records Yet</h3>;
  }

  return (
    <div>      
      <div className="flex-row justify-space-between my-4">            

        {/* div--> Lines per each diagnostic */}
        {medicalrecords &&
          medicalrecords.map((medicalrecord) => (
            <div key={medicalrecord._id} className="col-12 col-xl-6 container">

              {/* principal div for two divs with data (diagnostic and date) */}  
              <div className="flex-row mb-1">
                <div className="p-2 m-0 col-8 col-md-8"
                 style={{ backgroundColor: '#caf0f8', color: 'black', padding: '10px'  }}>
                    <Link className="text-black"
                      to={`/medicalrecord/${medicalrecord._id}`}
                    >
                      <span className="text-black" style={{ fontSize: '20px' }}>{medicalrecord.diagnostic}</span>
                    </Link>                                      
                </div>
                <div className="p-2 m-0 col-4 col-md-4"
                 style={{ backgroundColor: '#caf0f8', color: 'black', padding: '10px'  }}>
                  <Link className="text-black"
                      to={`/medicalrecord/${medicalrecord._id}`}
                    >
                      <span className="text-black" style={{ fontSize: '20px' }}>{format(medicalrecord.createdAt,'dd-MM-yyyy hh:mm')}</span>
                    </Link>                   
                </div>
              </div>
            
            </div>
          ))}
      </div>
    </div>
  );
};

export default MedicalRecordListPatient;
