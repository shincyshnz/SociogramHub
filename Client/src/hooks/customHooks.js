import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ErrorContext } from "../context/ErrorContext";


export const useAuth = () => {
    return useContext(AuthContext);
}

export const useError = () => {
    return useContext(ErrorContext);
}

export const useDebounce = ({ inputValue, delay }) => {
    const [debouncedValue, setDebouncedValue] = useState();

    useEffect(() => {
        const timeOut = setTimeout(setDebouncedValue(inputValue), delay || 500);

        return () => {
            clearTimeout(timeOut);
        }
    }, [inputValue, delay]);

    return {debouncedValue};
}