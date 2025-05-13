import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Profile = () => {
  const { logOut, user, updateUserProfile, notifyError, notify } =
    useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [email] = useState(user?.email || "");
  const [profilePicture, setProfilePicture] = useState(
    user?.photoURL || ""
  );

  // new state for file upload
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(user?.photoURL || "");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  // handle raw file selection & preview
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // uploads the file to ImgBB and returns the URL
  const uploadToImgBB = async (imageFile) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", imageFile);
    const resp = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await resp.json();
    if (!data.success) {
      throw new Error("Image upload failed");
    }
    return data.data.url;
  };

  // handle profile save: upload if needed, then update profile
  const handleSave = async () => {
    setUploading(true);
    try {
      let photoURL = profilePicture;
      // if user selected a new file, upload it
      if (file) {
        photoURL = await uploadToImgBB(file);
      }
      // update displayName and photoURL
      await updateUserProfile({ displayName: name, photoURL });
      setProfilePicture(photoURL);
      notify("Profile updated successfully");
    } catch (err) {
      console.error(err);
      notifyError("Failed to update profile");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-500">
        Welcome to Your Dashboard
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-10 mb-10">
        <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-left text-gray-500">
          Profile Information
        </h2>

        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={preview || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-48 h-48 object-cover rounded-full shadow-md border-4 border-gray-300"
            />
          </div>

          {/* User Info */}
          <div className="flex-grow space-y-5 text-lg text-gray-700">
            <p>
              <span className="font-medium text-gray-900">Name:</span>{" "}
              {user?.displayName || "Not provided"}
            </p>
            <p>
              <span className="font-medium text-gray-900">Email:</span>{" "}
              {user?.email || "Not provided"}
            </p>
            <p>
              <span className="font-medium text-gray-900">Phone:</span>{" "}
              {user?.phoneNumber || "Not provided"}
            </p>
            <p>
              <span className="font-medium text-gray-900">Address:</span>{" "}
              {user?.address || "Not provided"}
            </p>
            <p>
              <span className="font-medium text-gray-900">DOB:</span>{" "}
              {user?.dateOfBirth || "Not provided"}
            </p>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-gray-100 shadow-lg rounded-lg p-8 mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-left text-gray-500">
            Edit Your Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customColor"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customColor"
                value={email}
                readOnly
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-customColor
                           hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div className="mt-8 text-left">
            <button
              onClick={handleSave}
              disabled={uploading}
              className={`px-6 py-3 bg-customColor hover:bg-opacity-90 font-semibold rounded-full text-white shadow-md transition-all duration-200 ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {uploading ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;