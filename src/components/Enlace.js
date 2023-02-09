import { Link } from "react-router-dom";

export const Enlace = ({ enlace }) => {
    return(
    <article className="link">
    <h2>{enlace.enlace}</h2>
    <Link to={`/enlace/${enlace.id}`}>
    {enlace.titulo}
        </Link>
    <p> Descripción: {enlace.descripcion}</p>
    {enlace.image ? 
    ( <img 
     src={`${process.env.REACT_APP_API}/uploads/${enlace.image}`}
     alt={enlace.titulo}
     />
      ) : null} 
    <p> Votos Totales: {enlace.votosTotales}</p>
    <p>Fecha de creación: {new Date(enlace.created_at).toLocaleString()}
    </p>
    </article>
  );
};