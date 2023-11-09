import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ErrorContext } from "../context/ErrorContext";


export const useAuth = () => {
    return useContext(AuthContext);
}

export const useError = () => {
    return useContext(ErrorContext);
}