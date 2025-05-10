import React from 'react';

const ManageTask = () => {
    return (
        <div className='mx-4'>
            <h1 className='text-gray-400 text-3xl text-center my-3'>Manage all the tasks</h1>
            <hr className='my-4'/>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job tasks</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td><button className='btn btn-sm btn-outline rounded-full border-customColor text-gray-400 hover:bg-customColor'>Delete </button></td>
      </tr>
      {/* row 2 */}
      <tr className="hover">
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td><button className='btn btn-sm btn-outline rounded-full border-customColor text-gray-400 hover:bg-customColor'>Delete </button></td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td><button className='btn btn-sm btn-outline rounded-full border-customColor text-gray-400 hover:bg-customColor'>Delete </button></td>
      </tr>
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageTask;