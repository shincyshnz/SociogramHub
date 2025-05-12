import React, { createContext, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { set } from "react-hook-form";

// const themes = {
//     dark: {
//       primary: "#1ca086",
//       separatorColor: "rgba(255,255,255,0.20)",
//       textColor: "white",
//       backgroundColor: "#121212",
//       headerBackgroundColor: "rgba(255,255,255,0.05)",
//       blockquoteColor: "rgba(255,255,255,0.20)",
//       icon: "white"
//     },
//     light: {
//       primary: "#1ca086",
//       separatorColor: "rgba(0,0,0,0.08)",
//       textColor: "black",
//       backgroundColor: "white",
//       headerBackgroundColor: "#f6f6f6",
//       blockquoteColor: "rgba(0,0,0,0.80)",
//       icon: "#121212"
//     }
//   };

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


