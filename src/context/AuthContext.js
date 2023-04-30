import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    console.log('Current state:', state);
    console.log('Dispatched action:', action);
    switch (action.type) {
        case 'LOGIN':
            return {  
                ...state, 
                user: action.payload, 
                isAuthenticated: true 
            }
        case 'LOGOUT':
            return { 
                ...state,
                user: null,
                isAuthenticated: false
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthenticated: false
    })
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}