import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { deleteLinkService } from "../services";
import { AuthContext } from "../context/AuthContext";



export const Enlace = ({ enlace, removeLink }) => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  console.log(user);

  const deleteLink = async (id) => {
    try {
      await deleteLinkService({ id, token });
     
      if (removeLink) {
        removeLink(id);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <article className="link">
      <h2>{enlace.enlace}</h2>
      <Link to={`/enlace/${enlace.id}`}>{enlace.titulo}</Link>
      <p> Descripción: {enlace.descripcion}</p>
      {enlace.image ? (
        <img
          src={`${process.env.REACT_APP_API}/uploads/${enlace.image}`}
          alt={enlace.titulo}
        />
      ) : null}

     {/*  <p> by: <Link to={`/user/${enlace.user_id}`}>{user.email}</Link> 
        <Link to={`/enlace/${enlace.id}`}></Link></p> */}

      <p> Votos Totales: {enlace.votosTotales}</p>
      <p>Fecha de creación: {new Date(enlace.created_at).toLocaleString()}</p>
      {user && user.id === enlace.user_id ? (
      <section>
          <button onClick={() => {
           if (window.confirm("¿Estás seguro que quieres borrar el Link?")) deleteLink(enlace.id);}}>Borrar Link</button>
          {error ? <p>{error}</p> : null}
      </section>
      ) : null}
    </article>
  );
};
