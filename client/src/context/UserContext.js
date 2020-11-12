import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");

    return (
        <UserContext.Provider value={{USER: [user, setUser], TOKEN: [token, setToken]}}>
            {props.children}
        </UserContext.Provider>
    )
}