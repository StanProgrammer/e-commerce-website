import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SummaryApi from '../comman';
import '../styles/AllUsers.scss';
import moment from 'moment';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditUserModal from '../components/UserModal';
import { toast } from 'react-toastify';
const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(SummaryApi.all_users, {
        withCredentials: true,
      });
      setAllUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSave = async (updatedData) => {
    try {
      const updateUser = await axios.post(`${SummaryApi.update_user}`, updatedData, {
        withCredentials: true,
      });
      toast.success(updateUser.data.message);
      fetchAllUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    // Handle delete action
    try {
      const response = await axios.delete(`${SummaryApi.update_user}/${userId}`,{
        withCredentials: true,
      });
      toast.success(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="all-users-container container mt-5">
      <h2 className="mb-4">All Users</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Sr</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Created On</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{moment(user.createdAt).format('LL')}</td>
                <td className="d-flex justify-content-center align-items-center h-100">
                  <FaEdit
                    className="text-primary cursor-pointer me-3"
                    onClick={() => handleEdit(user)}
                    size={25}
                  />
                  <FaTrash
                    className="text-danger cursor-pointer"
                    onClick={() => handleDelete(user._id)}
                    size={20}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <EditUserModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          user={selectedUser}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default AllUsers;
