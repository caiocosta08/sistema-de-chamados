"use client"
// 1o passo: criar o context
import { createContext, useState } from "react";

export const MainContext = createContext()

// 2o passo: criar o provider

export const MainProvider = ({ children }) => {

    const [userData, setUserData] = useState({
        _id: "", name: "", email: "", department: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    return (
        <MainContext.Provider value={{ userData, setUserData, isLoading, setIsLoading }}>
            {children}
        </MainContext.Provider>
    )
}

// 3o passo: criar as variáveis de estado

// 4o passo: exportar!!!

// 5o passo: importar o provider no layout.js
