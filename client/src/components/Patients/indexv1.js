<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';

const PatientList = ({
  patients,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!patients.length) {
    return <h3>No Patients Yet</h3>;
  }

  return (
    <div>
       <h3>You have {patients.length} patient</h3>
      {showTitle && <h3>{title}</h3>}
      {patients &&
        patients.map((patient) => (
          <div key={patient._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${patient.email}`}
                >
                  {patient.email} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this patient on {patient.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this patient on {patient.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{patient.patientText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/patients/${patient._id}`}
            >
              Join the discussion on this patient.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PatientList;
=======
import React from 'react';
import { Link } from 'react-router-dom';

const PatientList = ({
  patients,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!patients.length) {
    return <h3>No Patients Yet</h3>;
  }

  return (
    <div>
       <h3>You have {patients.length} patient</h3>
      {showTitle && <h3>{title}</h3>}
      {patients &&
        patients.map((patient) => (
          <div key={patient._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${patient.email}`}
                >
                  {patient.email} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this patient on {patient.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this patient on {patient.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{patient.patientText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/patients/${patient._id}`}
            >
              Join the discussion on this patient.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PatientList;
>>>>>>> abda662c57dad32b13ddb96ff3e2dfd86a6b08c2
