import { Enlace } from "./Enlace";

export const ListEnlaces = ({ enlaces }) => {
  return enlaces.length ? (
    <ul className="link-list">
    {enlaces.map((enlace) => {
      return (
        <li key={enlace.id}>
          <Enlace enlace={enlace} />
        </li>
      );
    })}
  </ul>
) : (
    <p>No hay links...</p>
  );
};