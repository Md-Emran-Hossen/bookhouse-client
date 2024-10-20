/* eslint-disable no-undef */
import { createContext, useEffect, useState } from "react";

import { 
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    signInWithPopup

 } from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const [loading, setLoading] = useState(true);

    const registerWithEmail = async (email, password, name, phone, photo, address) => {
        setLoading(true);

        try {
            const userCredintial = await createUserWithEmailAndPassword(auth, email, password);

            console.log(userCredintial.user);
            const newUser = userCredintial.user;

            const response = await fetch("http://localhost:5000/users",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            uid: newUser.uid,
                            email: newUser.email,
                            displayName: name,
                            photoUrl: photo,
                            phone: phone,
                            address: address,
                            isAdmin: false,
                            isBlocked: false,
                        }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to register user data.");
            }
            return newUser;
        }
        catch (error) {
            console.error("Registration failed:", error.message);
            throw error; // Re-throw error for further handling if needed
        }
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    // const githubSignIn = (provider) => {
    //     setLoading(true);
    //     return signInWithPopup(auth, provider);
    // };

    const updateUserProfile = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log(currentUser);

            if (currentUser) {
                try {
                    const response = await fetch(`http://localhost:5001/user/${currentUser.uid}`);

                    if (!response.ok) {
                        throw new error("Failed to fetch");
                    }
                    const data = await response.json();
                    setUser(data);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => {
            unSubscribe();
        };

    }, []);

    const authInfo = {
        user,
        loading,
        registerWithEmail,
        signIn,
        googleSignIn,
        // githubSignIn,
        updateUserProfile,
        logOut,
    };

    return (
        <div>
            <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;