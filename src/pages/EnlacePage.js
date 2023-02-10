import { useParams } from "react-router-dom";
import useLink from "../hooks/useLink";
import { ErrorMessage } from "../components/ErrorMessage";
import { Enlace } from "../components/Enlace";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const EnlacePages = () => {
  const { id } = useParams(); 
  const { enlace, error, loading } = useLink(id);
  const { user } = useContext(AuthContext);

  if (loading) return <p>Cargando link...</p>
  if (error) return <ErrorMessage message={error} />;
  
    return (
      <section>
        <h1>Link subido por {user.email}</h1>  
       

        <Enlace enlace={enlace} />
      </section>
    );
  };
