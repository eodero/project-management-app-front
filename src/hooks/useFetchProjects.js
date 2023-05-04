import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuthContext } from "./useAuthContext";

export const useFetchProjects = (reFetch = false) => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false)
    const { user } = useAuthContext();
    
    useEffect(() => { 
        const fetchProjects = async () => {
            setError(null);
            setIsPending(true);
            
            if(!user) {
                setError('Could not load projects, user not authenticated');
                setIsPending(false);
                return;
            }
            try {
                const res = await api.get('/projects', {
                    headers:{
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json"
                    },
                });
                if(res.status !== 200) {
                    setError(`Error fetching projects, status code: ${res.status}`)
                    console.error("Fetch projects error:", error); 
                    setIsPending(false)
                }
                setProjects(res.data.projects);
                setIsPending(false)
            } catch (error) {
                setError('Could not fetch projects');
                setIsPending(false);
            }
        };
        
        fetchProjects();
    }, [user, reFetch])
    
    return { projects, error, isPending }
}