import { useState } from "react";
import { registerUserService } from "../services";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass1, setPass1] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass !== pass1) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerUserService({ nombre, email, password: pass });
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Nombre:
            </label>
            <input
              type="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              name="name"
            />
        </fieldset>
        <fieldset>
        <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            />
        </fieldset>
        <fieldset>
        <label htmlFor="pass">Password</label>
          <input
            type="password"
            id="pass"
            name="pass"
            value={pass}
            required
            onChange={(e) => setPass(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="pass1">Repeat password</label>
          <input
            type="password"
            id="pass1"
            name="pass1"
            value={pass1}
            required
            onChange={(e) => setPass1(e.target.value)}
          />
        </fieldset>
        <button>Register</button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};
