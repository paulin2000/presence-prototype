import io from "socket.io-client";
import { useState } from "react";
const Server_Address: string = "http://localhost:5000";
const socket = io(Server_Address);

interface form {
  setConnected: any;
  connected: boolean;
  setRole: any

}

const Formulaire = (props: form) => {
  const [identifiant, setIdentifiant] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    socket.emit("authentification", { identifiant, password });
    socket.on("authSuccessAdmin", (role) => {
      props.setConnected(false);
      props.setRole(role)
      localStorage.setItem(
        "connexion",
        JSON.stringify({ status: "connected" })
      );
    });
    socket.on("authSuccessCompta", (role) => {
      props.setConnected(false);
      props.setRole(role)
      localStorage.setItem(
        "connexion",
        JSON.stringify({ status: "connected" })
      );
    });
    socket.on("authError", () => {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    });
  };
  return (
    <div className="wrapper">
      <form className="form-group-in" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <hr />
        <div className="form-group">
          <label htmlFor="identifiant"></label>
          <input
            type="text"
            className="form-control"
            id="identifiant"
            placeholder="identifiant"
            value={identifiant}
            onChange={(e) => {
              setIdentifiant(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {error === true && (
          <div className="modal-error">
            <span>Informations Incorrects. Reéssayer</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Formulaire;
