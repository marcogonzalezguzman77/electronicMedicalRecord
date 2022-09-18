<<<<<<< HEAD
import React from 'react';
import UserList from '../Users/userList.js';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';

import Auth from '../../utils/auth';

const Users = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

  return (
    <main>
       {Auth.loggedIn() ? (
            <>
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

            </>
            ) : (
              <>
                <div>You need to login</div>
              </>
            )}

    </main>
  );
};

export default Users;
=======
import React from 'react';
import UserList from '../Users/userList.js';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';

import Auth from '../../utils/auth';

const Users = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

  return (
    <main>
       {Auth.loggedIn() ? (
            <>
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

            </>
            ) : (
              <>
                <div>You need to login</div>
              </>
            )}

    </main>
  );
};

export default Users;
>>>>>>> abda662c57dad32b13ddb96ff3e2dfd86a6b08c2
