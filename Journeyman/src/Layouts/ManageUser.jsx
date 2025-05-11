import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false); // Added state for dropdown

  useEffect(() => {
    axios.get("https://journeyman-server-sigma.vercel.app/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (email) => {
    axios.delete(`https://journeyman-server-sigma.vercel.app/users/${email}`)
      .then((response) => {
        if (response.status === 200) {
          setUsers(users.filter(user => user.email !== email));
          alert("User deleted successfully!");
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleRoleUpdate = () => {
    axios.put(`https://journeyman-server-sigma.vercel.app/users/${selectedUser.email}`, { role: newRole })
      .then((response) => {
        if (response.status === 200) {
          setUsers(users.map(user => user.email === selectedUser.email ? { ...user, role: newRole } : user));
          alert("User role updated successfully!");
          setSelectedUser(null);
        }
      })
      .catch((error) => console.error("Error updating user role:", error));
  };

  return (
    <div className='space-y-6 mx-4'>
      <h1 className="text-3xl font-semibold text-center text-gray-400">
        Manage all the users in one page
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className='border-b-2'>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt="User Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-lg text-gray-400">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className='text-gray-400'>{user.email}</td>
                <td className='text-gray-400'>{user.role || "Not Assigned"}</td>
                <th className='space-x-2'>
                  <button className="btn bg-customColor text-white btn-xs rounded-full" onClick={() => setSelectedUser(user)}>Update</button>
                  <button className="btn bg-gray-300 text-white btn-xs rounded-full" onClick={() => handleDelete(user.email)}>
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60">
          <div className="bg-[#66b3b3] text-white p-6 rounded-2xl shadow-xl transform scale-100 transition-transform duration-300">
            <h2 className="text-2xl font-bold mb-6">Update Role for {selectedUser.name}</h2>
            <div className="relative">
              <div className="bg-white text-gray-800 rounded-lg shadow-md cursor-pointer">
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown state
                  className="px-4 py-2 flex justify-between items-center"
                >
                  {newRole || "Select Role"}
                  <span className="material-icons"></span>
                </div>
                {dropdownOpen && (
                  <ul className="absolute w-full bg-white rounded-lg shadow-lg z-10">
                    {["Admin", "Buyer", "Worker"].map((role) => (
                      <li
                        key={role}
                        onClick={() => {
                          setNewRole(role);
                          setDropdownOpen(false); // Close dropdown after selection
                        }}
                        className="px-4 py-2 hover:bg-[#66b3b3] hover:text-white cursor-pointer"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-6 py-3 rounded-lg bg-gray-300 text-black font-semibold hover:bg-gray-400 transition-colors"
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-3 rounded-lg bg-white text-[#66b3b3] font-bold hover:bg-[#4fa0a0] transition-colors"
                onClick={handleRoleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageUser;