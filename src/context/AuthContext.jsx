import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile as fbUpdateProfile,
  updatePassword as fbUpdatePassword,
  updateEmail as fbUpdateEmail,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, googleProvider, isFirebaseConfigured } from "@/config/firebase";
import { formatDisplayName } from "@/utils";

export const AuthContext = createContext(undefined);

async function ensureUserDocument(user) {
  if (!user?.uid) return;
  const displayName = formatDisplayName(user.displayName, user.email);
  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      email: user.email || "",
      displayName,
      photoURL: user.photoURL || null,
      emailVerified: user.emailVerified || false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
  return {
    ...user,
    displayName,
  };
}

/**
 * Unified auth surface using Firebase Authentication.
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let normalized = user;
      if (user) {
        normalized = await ensureUserDocument(user);
      }
      setCurrentUser(normalized);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = useCallback(async (email, password, displayName) => {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase is not configured.");
    }
    const friendlyName = formatDisplayName(displayName, email);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await fbUpdateProfile(cred.user, { displayName: friendlyName });
    const normalizedUser = await ensureUserDocument({ ...cred.user, displayName: friendlyName });
    setCurrentUser(normalizedUser);
    return cred.user;
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase is not configured.");
    }
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const normalizedUser = await ensureUserDocument(cred.user);
    setCurrentUser(normalizedUser);
    return cred;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase is not configured.");
    }
    const cred = await signInWithPopup(auth, googleProvider);
    const user = cred.user;
    const friendlyName = user.displayName || formatDisplayName(null, user.email);
    if (!user.displayName && friendlyName) {
      await fbUpdateProfile(user, { displayName: friendlyName });
    }
    const normalizedUser = await ensureUserDocument({ ...user, displayName: friendlyName });
    setCurrentUser(normalizedUser);
    return cred;
  }, []);

  const resetPassword = useCallback(async (email) => {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase is not configured.");
    }
    return sendPasswordResetEmail(auth, email);
  }, []);

  const logOut = useCallback(async () => {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase is not configured.");
    }
    return signOut(auth);
  }, []);

  const updateUserProfile = useCallback(async ({ displayName, photoURL }) => {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase is not configured.");
    }
    const updates = {};
    if (typeof displayName === "string") updates.displayName = displayName;
    if (typeof photoURL === "string") updates.photoURL = photoURL || null;
    await fbUpdateProfile(auth.currentUser, updates);
    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      {
        ...updates,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    setCurrentUser((prev) => (prev ? { ...prev, ...updates } : prev));
  }, []);

  const updateUserEmail = useCallback(async (newEmail) => {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase is not configured.");
    }
    await fbUpdateEmail(auth.currentUser, newEmail);
    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      {
        email: newEmail,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    setCurrentUser((prev) => (prev ? { ...prev, email: newEmail } : prev));
  }, []);

  const updateUserPassword = useCallback(async (newPassword) => {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase is not configured.");
    }
    return fbUpdatePassword(auth.currentUser, newPassword);
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      signUp,
      signIn,
      signInWithGoogle,
      resetPassword,
      logOut,
      updateUserProfile,
      updateUserEmail,
      updateUserPassword,
    }),
    [
      currentUser,
      loading,
      signUp,
      signIn,
      signInWithGoogle,
      resetPassword,
      logOut,
      updateUserProfile,
      updateUserEmail,
      updateUserPassword,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
