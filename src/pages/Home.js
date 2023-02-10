import { ListEnlaces } from "../components/ListEnlaces";
import useLinks from "../hooks/useLinks";
import { ErrorMessage } from "../components/ErrorMessage";
import { NewLink } from "../components/NewLink";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";



export const Home = () => {
  const { enlaces, error, loading, addLink, removeLink } = useLinks();
  const { user } = useContext(AuthContext);


  if (loading) return <p>Cargando Links</p>;
  if (error) return <ErrorMessage message={error} />;


    return (
      <section>

        {user ? <NewLink addLink={addLink} /> : null}
        
        <h1>Últimos links</h1>
        

        <ListEnlaces enlaces={enlaces} removeLink={removeLink} />
        
      </section>
    );
  };