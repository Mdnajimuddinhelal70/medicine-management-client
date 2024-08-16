import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const UpdateProfile = () => {
  const { user, updateUserProfile, updateUserPassword } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const promises = [];

      if (displayName !== user?.displayName || photoURL !== user?.photoURL) {
        promises.push(updateUserProfile(displayName, photoURL));
      }

      if (email !== user?.email) {
        // Re-authentication might be needed
        promises.push(user.updateEmail(email));
      }

      if (newPassword) {
        // Re-authentication might be needed
        promises.push(updateUserPassword(currentPassword, newPassword));
      }

      await Promise.all(promises);
      alert('Profile updated successfully!');
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        // Handle re-authentication scenario here
        setError('Please re-authenticate and try again.');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Your Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="displayName" className="mb-2 text-gray-600">Username:</label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-gray-600">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="photoURL" className="mb-2 text-gray-600">Photo URL:</label>
          <input
            id="photoURL"
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="currentPassword" className="mb-2 text-gray-600">Current Password:</label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="newPassword" className="mb-2 text-gray-600">New Password:</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Profile
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateProfile;
