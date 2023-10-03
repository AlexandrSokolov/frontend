import {fetchUsers} from "./usersRest";
import {useEffect, useState} from "react";

function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  return (
    <div className="users">
      <div>Users</div>
      {users && users.map(user =>
        <div key={user.id}>
          <span>id: </span><span>{user.id} </span>
          <span>name: </span><span>{user.name} </span>
          <span>age: </span><span>{user.age} </span>
        </div>
      )}
    </div>
  )
}

export default Users;