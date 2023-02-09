import { useEffect, useState } from "react";
import { getSingleLinkService } from "../services";

const useLink = (id) => {
    const [enlace, setEnlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const loadEnlace = async () => {
        try {
          setLoading(true);
          const data = await getSingleLinkService(id);
  
          setEnlace(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      loadEnlace();
    }, [id]);
  
    return { enlace, error, loading };
  };
  
  export default useLink;
  