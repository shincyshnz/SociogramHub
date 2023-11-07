import { createContext, useContext, useState } from "react";

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

    return (
        <ErrorContext.Provider value={{ customError, handleError, deleteError }}>
            {children}
        </ErrorContext.Provider>
    );
};

// custom Hook
export const useError = () => {
    return useContext(ErrorContext);
}