import { createContext, useState } from "react";

export const ErrorContext = createContext(null);

export const ErrorProvider = ({ children }) => {
    const [customError, setCustomError] = useState({});

    const handleError = (key, msg) => {
        setCustomError(prev => ({
            ...prev,
            [key]: msg,
        }))
    }

    const deleteError = (key) => {
        if (customError.hasOwnProperty(key)) {
            const updatedCustomError = { ...customError };
            delete updatedCustomError[key];
            setCustomError(updatedCustomError);
        }
    }

    const clearCustomErrors = () => {
        setCustomError({});
    }

    return (
        <ErrorContext.Provider value={{ customError, handleError, deleteError, clearCustomErrors }}>
            {children}
        </ErrorContext.Provider>
    );
};
