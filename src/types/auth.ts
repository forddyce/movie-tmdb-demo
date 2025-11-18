export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    provider: "email" | "google" | "facebook" | "apple";
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (
        email: string,
        password: string,
        displayName: string
    ) => Promise<void>;
    loginWithSocial: (
        provider: "google" | "facebook" | "apple"
    ) => Promise<void>;
    logout: () => Promise<void>;
    initializeAuth: () => void;
}
