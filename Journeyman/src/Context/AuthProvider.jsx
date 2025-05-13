import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.init";
import LoadingState from "../Components/LoadingState";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const notify = (message = 'Success!') => toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  const notifyError = (message = 'Error!') => toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });



  const createNewUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      notify("Registration successful");
    } catch (error) {
      // notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const userLogin = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      notify("User Logged In Successfully!");
    } catch (error) {
      notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    if (!user) {
      notifyError("No user logged in");
      return;
    }
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profile) => {
    if (!auth.currentUser) {
      notifyError("No user found to update profile.");
      return;
    }
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, profile);
     notify("Profile updated successfully. Now Login ");
    await signOut(auth);

    } catch (error) {
      // notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      notify("Google sign-in successful");
    } catch (error) {
      notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchUserData = async (email) => {
    try {
      const userResponse = await axios.get(
        `https://journeyman-server-sigma.vercel.app/users/${email}`,
      );
      if (userResponse.data) {
        setUserData(userResponse.data);
      } else {
        setUserData(null);
      }
    } catch (error) {
      //console.error("Error fetching user data:", error);
      notifyError(error.message);
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,async (currentUser) => {

      if (currentUser?.email) {
        setUser(currentUser);
        await fetchUserData(currentUser.email.toLowerCase()); 
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    })

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    createNewUser,
    logOut,
    userLogin,
    loading,
    handleGoogleSignIn,
    notify,
    notifyError,
    updateUserProfile,
    userData
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
