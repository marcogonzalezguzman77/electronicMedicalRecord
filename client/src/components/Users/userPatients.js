import React from 'react';
import UserList from './userList.js';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';

const Users = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
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

export default Users;
