import React, { createContext, useCallback, useEffect, useState } from "react";

export const ThemeContext = createContext({
    themeName: 'dark',
    themeToggle: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [themeName, setThemeName] = useState('light');

    const preferdDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const preferdLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    useEffect(()=>{
        if(preferdDark){
            setThemeName("dark");
        }

        if(preferdLight){
            setThemeName("light");
        }

    },[preferdDark, preferdLight]);
 
    const themeToggle = useCallback(()=>{
        setThemeName(prev => (prev === "dark" ? "light" : "dark"));
    },[]);
    
    return (
        <ThemeContext.Provider value={{ themeName, themeToggle }}>
            {children}
        </ThemeContext.Provider>)
};


