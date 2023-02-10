import { Enlace } from "./Enlace";

export const ListEnlaces = ({ enlaces, removeLink }) => {
  return enlaces.length ? (
    <ul className="link-list">
    {enlaces.map((enlace) => {
      return (
        <li key={enlace.id}>
          <Enlace enlace={enlace} removeLink={removeLink} />
        </li>
      );
    })}
  </ul>
) : (
    <p>No hay links...</p>
  );
};