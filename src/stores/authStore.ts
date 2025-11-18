import { create } from "zustand";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    FacebookAuthProvider,
    OAuthProvider,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { logEvent } from "firebase/analytics";
import { analytics } from "../services/firebase";
import type { AuthState, User } from "../types/auth";

const USER_STORAGE_KEY = "worlder_user";

const saveUserToStorage = (user: User | null) => {
    if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(USER_STORAGE_KEY);
    }
};

const getUserFromStorage = (): User | null => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: getUserFromStorage(),
    isAuthenticated: !!getUserFromStorage(),
    isLoading: true,

    initializeAuth: () => {
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const user: User = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    provider:
                        (firebaseUser.providerData[0]?.providerId.includes(
                            "google"
                        )
                            ? "google"
                            : firebaseUser.providerData[0]?.providerId.includes(
                                  "facebook"
                              )
                            ? "facebook"
                            : firebaseUser.providerData[0]?.providerId.includes(
                                  "apple"
                              )
                            ? "apple"
                            : "email") as User["provider"],
                };
                saveUserToStorage(user);
                set({ user, isAuthenticated: true, isLoading: false });
                if (analytics) {
                    logEvent(analytics, "login", { method: user.provider });
                }
            } else {
                saveUserToStorage(null);
                set({ user: null, isAuthenticated: false, isLoading: false });
            }
        });
    },

    register: async (email: string, password: string, displayName: string) => {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await updateProfile(userCredential.user, { displayName });

        const user: User = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName,
            photoURL: null,
            provider: "email",
        };

        saveUserToStorage(user);
        set({ user, isAuthenticated: true });

        if (analytics) {
            logEvent(analytics, "sign_up", { method: "email" });
        }
    },

    login: async (email: string, password: string) => {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user: User = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            photoURL: userCredential.user.photoURL,
            provider: "email",
        };

        saveUserToStorage(user);
        set({ user, isAuthenticated: true });

        if (analytics) {
            logEvent(analytics, "login", { method: "email" });
        }
    },

    loginWithSocial: async (provider: "google" | "facebook" | "apple") => {
        let authProvider;

        switch (provider) {
            case "google":
                authProvider = new GoogleAuthProvider();
                break;
            case "facebook":
                authProvider = new FacebookAuthProvider();
                break;
            case "apple":
                authProvider = new OAuthProvider("apple.com");
                break;
        }

        const userCredential = await signInWithPopup(auth, authProvider);
        const user: User = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            photoURL: userCredential.user.photoURL,
            provider,
        };

        saveUserToStorage(user);
        set({ user, isAuthenticated: true });

        if (analytics) {
            logEvent(analytics, "login", { method: provider });
        }
    },

    logout: async () => {
        await signOut(auth);
        saveUserToStorage(null);
        set({ user: null, isAuthenticated: false });

        if (analytics) {
            logEvent(analytics, "logout");
        }
    },
}));
