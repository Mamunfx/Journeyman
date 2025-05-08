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

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const userLogin = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
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
      notify("Logout successful");
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
      notify("Profile updated successfully");
    } catch (error) {
      notifyError(error.message);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
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
    updateUserProfile
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
