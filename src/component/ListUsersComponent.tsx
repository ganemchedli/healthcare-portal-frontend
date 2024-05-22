import { useEffect, useState } from "react";
import { deleteUser, listUsers } from "../services/UserServices";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: number;
  birthday: string;
  state: string;
  city: string;
  zipCode: number;
  role: string;
}

const ListUsersComponent = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const navigator = useNavigate();

  function getAllUsers() {
    listUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }

  function addNewUser() {
    navigator("/add-user");
  }

  function updateUser(id: any) {
    navigator(`/update-user/${id}`);
  }

  function removeUser(id: any) {
    console.log(id);
    deleteUser(id)
      .then((response) => {
        getAllUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h2 className="">List of users</h2>
      <div className="text-end">
        <button className="btn btn-primary mb-2" onClick={addNewUser}>
          Add User
        </button>
      </div>
      <table className="table table-striped table-bordred">
        <thead>
          <tr>
            <th>User ID</th>
            <th>FirstName</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Birthday</th>
            <th>State</th>
            <th>City</th>
            <th>Zip code</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.birthday}</td>
              <td>{user.state}</td>
              <td>{user.city}</td>
              <td>{user.zipCode}</td>
              <td>{user.role}</td>

              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateUser(user.id)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeUser(user.id)}
                  style={{ marginLeft: "10px" }}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsersComponent;
