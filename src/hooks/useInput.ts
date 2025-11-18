import { useState } from "react";
import type { ChangeEvent } from "react";

interface UseInputProps {
    initialValue?: string;
    validation?: (value: string) => string | null;
}

export const useInput = ({
    initialValue = "",
    validation,
}: UseInputProps = {}) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);

        if (touched && validation) {
            const validationError = validation(newValue);
            setError(validationError);
        }
    };

    const handleBlur = () => {
        setTouched(true);
        if (validation) {
            const validationError = validation(value);
            setError(validationError);
        }
    };

    const reset = () => {
        setValue(initialValue);
        setError(null);
        setTouched(false);
    };

    return {
        value,
        error,
        touched,
        onChange: handleChange,
        onBlur: handleBlur,
        reset,
        setValue,
    };
};

export const validators = {
    required:
        (message = "This field is required") =>
        (value: string) => {
            return value.trim() ? null : message;
        },

    email:
        (message = "Invalid email address") =>
        (value: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? null : message;
        },

    minLength: (length: number, message?: string) => (value: string) => {
        return value.length >= length
            ? null
            : message || `Must be at least ${length} characters`;
    },

    maxLength: (length: number, message?: string) => (value: string) => {
        return value.length <= length
            ? null
            : message || `Must be at most ${length} characters`;
    },

    combine:
        (...validators: Array<(value: string) => string | null>) =>
        (value: string) => {
            for (const validator of validators) {
                const error = validator(value);
                if (error) return error;
            }
            return null;
        },
};
