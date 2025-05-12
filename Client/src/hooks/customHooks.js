import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ErrorContext } from "../context/ErrorContext";
import { ThemeContext } from "../context/Theme";


export const useAuth = () => {
    return useContext(AuthContext);
}

export const useError = () => {
    return useContext(ErrorContext);
}

export const useDebounce = (inputValue, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
        const timeOut = setTimeout(() => setDebouncedValue(inputValue), delay || 500);

        return () => {
            clearTimeout(timeOut)
        };
        
    }, [inputValue, delay]);

    return { debouncedValue };
}

export const useTheme = () => {
    return useContext(ThemeContext);
}