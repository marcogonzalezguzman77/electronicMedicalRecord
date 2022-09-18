<<<<<<< HEAD
import React from 'react';

const UserList = ({ users, title }) => {
  if (!users.length) {
    return <h3>No Users Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {users &&
          users.map((user) => (
            <div key={user._id} className="col-12 col-xl-6">
              <div className="card mb-1">
                <h4 className="card-header text-light p-2 m-0" style={{ backgroundColor: '#1d3557', color: 'white', padding: '10px'}}>
                <span className="text-white" style={{ fontSize: '20px' }}>{/*user._id*/} {user.name} {user.lastname}</span> <br />
                  <span className="text-white" style={{ fontSize: '14px' }}>
                    currently has {user.patients ? user.patients.length : 0}{' '}
                    patient
                    {user.patients && user.patients.length === 1 ? '' : 's'}
                  </span>
                </h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;
=======
import React from 'react';

const UserList = ({ users, title }) => {
  if (!users.length) {
    return <h3>No Users Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {users &&
          users.map((user) => (
            <div key={user._id} className="col-12 col-xl-6">
              <div className="card mb-1">
                <h4 className="card-header text-light p-2 m-0" style={{ backgroundColor: '#1d3557', color: 'white', padding: '10px'}}>
                <span className="text-white" style={{ fontSize: '20px' }}>{/*user._id*/} {user.name} {user.lastname}</span> <br />
                  <span className="text-white" style={{ fontSize: '14px' }}>
                    currently has {user.patients ? user.patients.length : 0}{' '}
                    patient
                    {user.patients && user.patients.length === 1 ? '' : 's'}
                  </span>
                </h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;
>>>>>>> abda662c57dad32b13ddb96ff3e2dfd86a6b08c2
