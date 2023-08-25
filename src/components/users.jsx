import { useState } from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, getUsers, deleteUser } from '../redux/usersSlice';
import CreateUser from './createUser';
import { selectUsers, selectUsersError} from '../redux/store';


const Users = () => {
    const dispatch = useDispatch();
    const users= useSelector(selectUsers);
    const error = useSelector(selectUsersError);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    if (error) {
        return <h1>{error}</h1>;
      }

      if (!users) {
        return (
          <h3 className="">
            Loading...
          </h3>
        );
      }

      if (!users.length) {
        return <h1 className="">There are no users available</h1>;
      }

      const handleDelete = (id) => {
        dispatch(deleteUser(id));
      };





    return (
        <div>
            <h1>Users</h1>
            <div>
                
            </div>
            <div>
                {users.map((user) => (
                    <div key={user.id}>
                        <h3>{user.firstname}</h3>
                        <h3>{user.lastname}</h3>
                        <h3>{user.age}</h3>
                        <h3>{user.email}</h3>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                        </div>
                ))}
        </div>
        </div>


    );

};

export default Users;