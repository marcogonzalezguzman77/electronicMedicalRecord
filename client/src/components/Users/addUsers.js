import React from 'react';
import { useQuery } from '@apollo/client';

import UserForm from '../../components/Users/userForm';
import UserList from '../../components/Users/userList.js';


import { QUERY_addUSERS } from '../../utils/queries';

const AddUsers = () => {
    const { loading, data } = useQuery(QUERY_addUSERS);
    const users = data?.users || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          
        >
          <UserForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <UserList
              users={users}
              title="Actual system users"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default AddUsers;
