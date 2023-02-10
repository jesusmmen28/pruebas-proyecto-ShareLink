import useLinks from "../hooks/useLink";
import { ErrorMessage } from "./ErrorMessage";
import { ListEnlaces } from "./ListEnlaces";

export const UserLinks = ({ id }) => {
  const { enlaces, loading, error, removeLink } = useLinks(id);

  if (loading) return <p>Loading Links...</p>;
  if (error) return <ErrorMessage message={error} />;

  return <ListEnlaces enlaces={enlaces} removeLink={removeLink} />;
};