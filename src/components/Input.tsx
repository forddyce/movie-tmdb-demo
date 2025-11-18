import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string | null;
    touched?: boolean;
}

export const Input = ({
    label,
    error,
    touched,
    className = "",
    ...props
}: InputProps) => {
    const showError = touched && error;

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}
            <input
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
          bg-white dark:bg-gray-800 
          text-gray-900 dark:text-white 
          border-gray-300 dark:border-gray-600
          placeholder-gray-400 dark:placeholder-gray-500
          ${showError ? "border-red-500 focus:ring-red-500" : ""}
          ${className}`}
                {...props}
            />
            {showError && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};
