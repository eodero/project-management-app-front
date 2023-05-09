import { createContext } from "react";
import jwtDecode from "jwt-decode"
import { usePersistedState } from "../hooks/usePersistedState";

export const AuthContext = createContext();

// export const authReducer = (state, action) => {
//     console.log('Current state:', state);
//     console.log('Dispatched action:', action);
//     switch (action.type) {
//         case 'LOGIN':
//             return {  
//                 ...state, 
//                 user: action.payload, 
//                 isAuthenticated: true 
//             }
//         case 'LOGOUT':
//             return { 
//                 ...state,
//                 user: null,
//                 isAuthenticated: false
//             }
//         default:
//             return state
//     }
// }

const initialState = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        return {
            user: { ...decodedToken, token },
            isAuthenticated: true,
        };
    }
    return{
     user:null,
    isAuthenticated: false,
    }
};


export const AuthContextProvider = ({ children }) => {
    // const [state, dispatch] = useReducer(authReducer, {
    //     user: null,
    //     isAuthenticated: false
    // })
    
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const decodedToken = jwtDecode(token)
    //         dispatch({ type: 'LOGIN', payload: { ...decodedToken, token}});
    //     }
    // },[])
    
    const [authState, setAuthState] = usePersistedState("authState", initialState());
    
    const dispatch = (action) => {
        switch (action.type) {
            case "LOGIN":
                setAuthState({
                    ...authState, 
                    user: action.payload,
                    isAuthenticated: true,
                });
                break;
            case "LOGOUT":
                setAuthState({
                    ...authState,
                    user: null,
                    isAuthenticated: false,
                });
                  break;
                default:
                  break;
        }
    }
    
    return (
        <AuthContext.Provider value={{ ...authState, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}