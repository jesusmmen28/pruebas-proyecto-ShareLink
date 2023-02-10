import { useEffect, useState } from "react";
import { getAllLinksServices } from "../services";

const useLinks = () => {
  const [enlaces, setEnlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLinks = async () => {
      try {
        setLoading(true);
        const data = await getAllLinksServices();
        setEnlaces(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadLinks();
  }, []);

  const addLink = (enlace) => {
    setEnlaces([enlace, ...enlaces]);
  };

  const removeLink = (id) => {
    setEnlaces(enlaces.filter((enlace) => enlace.id !== id));
  };
  return { enlaces, error, loading, addLink, removeLink };
};

export default useLinks;
