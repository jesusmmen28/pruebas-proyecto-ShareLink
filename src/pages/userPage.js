import { useParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loading } from "../components/Loading";
//import { UserLinks } from "../components/UserLinks";
import useUser from "../hooks/useUser";

export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Hola {user.nombre}</h1>
      <section>
        <p>Tu ID de usuario es: {user.id}</p>
        <p>Te registraste {new Date(user.created_at).toLocaleString()}</p>
      </section>

    </section>
  );
};
