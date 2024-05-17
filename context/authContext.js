import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    //OnAuthStateChange
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user?.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unSub;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({
        ...user,
        username: data.username,
        profileUrl: data.profileUrl,
        userId: data.userId,
      });
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      let msg = error?.message;
      if (msg.includes("(auth/invalid-email).")) msg = "Invalid email";
      if (msg.includes("(auth/invalid-credential)."))
        msg = "Invalid Credential";
      if (
        msg.includes(
          "Password should be at least 6 characters (auth/weak-password)."
        )
      )
        msg = "Password should be at least 6 characters";
      return { success: false, msg };
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message, error: error };
    }
  };
  const register = async (email, password, username, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("response.user:" + response?.user);

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
      });
      console.log({ success: true, data: response?.user });
      return { success: true, data: response?.user };
    } catch (error) {
      let msg = error?.message;
      if (msg.includes("Firebase: Error (auth/invalid-email)."))
        msg = "Invalid email";
      if (msg.includes("(auth/email-already-in-use)."))
        msg = "Email already in use";
      if (
        msg.includes(
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        )
      )
        msg = "Password should be at least 6 characters";
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped inside a AuthContextProvider");
  }
  return value;
};
