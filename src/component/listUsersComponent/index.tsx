import { useEffect, useState } from "react";
import { deleteUser, listUsers } from "../../services/UserServices";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalComponent from "../Modal"; // adjust the path as necessary
import AddUserComponent from "../AddUser";
import UpdateUserComponent from "../UpdateUser";
import "./index.css";
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

const ListUsersComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const navigator = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const openModalWithComponent = (component: React.ReactNode) => {
    setModalContent(component);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  function getAllUsers() {
    listUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }

  // function addNewUser() {
  //   navigator("/add-user");
  // }

  // function updateUser(id: any) {
  //   navigator(`/update-user/${id}`);
  // }

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
    <div className={`container ${modalContent ? "blur-background" : ""}`}>
      <h2 className="">Manage users</h2>
      <div className="text-end">
        {/* <button className="btn btn-primary mb-2" onClick={openModal}>
          Add User
        </button> */}
        <button
          className=""
          onClick={() => openModalWithComponent(<AddUserComponent />)}
        >
          Add user
        </button>
        <ModalComponent
          isOpen={modalContent !== null}
          onRequestClose={closeModal}
        >
          {modalContent}
        </ModalComponent>
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
                  onClick={() =>
                    openModalWithComponent(<UpdateUserComponent id={user.id} />)
                  }
                >
                  <span>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </span>
                </button>
                <ModalComponent
                  isOpen={modalContent !== null}
                  onRequestClose={closeModal}
                >
                  {modalContent}
                </ModalComponent>
                {/* <button onClick={openModal}>
                  <span>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </span>
                </button>
                <ModalComponent
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                >
                  <UpdateUserComponent id={user.id} />
                </ModalComponent> */}
                <button
                  //   className="btn btn-danger"
                  onClick={() => removeUser(user.id)}
                  style={{ marginLeft: "10px" }}
                >
                  <span>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
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
