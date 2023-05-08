import { useState, useEffect } from 'react';

export const usePersistedState = (key, value) => {
    const [state, setState] = useState(() => {
        const persistedState = localStorage.getItem(key);
        return persistedState ? JSON.parse(persistedState) : value;
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    
    return [state, setState];
}