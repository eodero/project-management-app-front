import { useState } from "react";
import api from "../utils/api";
import { useAuthContext } from "./useAuthContext";

export const useAddProject = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const addProject = async (projectData) => {
    setError(null);
    setIsPending(true);

    if (!user) {
      setError("User not authenticated");
      setIsPending(false);
      return;
    }

    try {
      await api.post("/projects", projectData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      setIsPending(false);
    } catch (error) {
      setError("Could not add project");
      setIsPending(false);
    }
  };

  return { addProject, error, isPending };
};