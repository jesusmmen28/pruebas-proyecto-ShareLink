import { useParams } from "react-router-dom";
import useLink from "../hooks/useLink";
import { ErrorMessage } from "../components/ErrorMessage";
import { Enlace } from "../components/Enlace";


export const EnlacePages = () => {
  const { id } = useParams(); 
  const { enlace, error, loading } = useLink(id);

  if (loading) return <p>Cargando link...</p>
  if (error) return <ErrorMessage message={error} />;
  

    return (
      <section>
        <h1>Link subido por {enlace.user_id}</h1>
        <Enlace enlace={enlace} />
      </section>
    );
  };
  