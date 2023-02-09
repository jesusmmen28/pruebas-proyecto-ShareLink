import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendLiknService } from "../services";

export const NewLink = ({addLink}) => {
  const { token } = useContext(AuthContext);
  const [enlace, setEnlace] = useState();
  const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData();
      data.append("enlace", enlace);
      data.append("titulo", titulo);
      data.append("descripcion", descripcion);
      data.append("image", image); 

      const enlaces = await sendLiknService({ data, token });

      addLink(enlaces);
      e.target.reset();
      setImage(null);
    } catch (error) {
      setError('es un error que no sé de dónde sale :(');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1>Sube el nuevo Link</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="text">Link</label>
          <input
            type="text"
            name="enlace"
            value={enlace}
            onChange={(e) => setEnlace(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="text">Título</label>
          <input
            type="text"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="text">Descripción</label>
          <input
            type="text"
            name="description"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </fieldset>
        <fieldset>
        <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image ? 
            <figure>
             <img
                src={URL.createObjectURL(image)}
                style={{ width: "100px" }}
                alt="Preview"
              />
            </figure> : null}
        </fieldset>
        <button>Enviar Link</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Cargando Link...</p> : null}
      </form>
    </>
  );
};
