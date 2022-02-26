import { useState, useEffect } from "react";
import io from "socket.io-client";
const Server_Address: string = "http://localhost:5000";
const socket = io(Server_Address);

type tableauObjet2 = Array<{ id: number; secret_code: string }>;
type tableauObjet = Array<{
  id: number;
  first_name: string;
  last_name: string;
  sexe: string;
  presence: string;
}>;

interface Props {
  modal: boolean;
  setModal: any;
  userId: number;
  setPersons: any;
  persons: tableauObjet;
}

export const Modal = (props: Props) => {
  const [secret_code, setSecret_code] = useState<string>("");
  const [data, setData] = useState<tableauObjet2>([]);
  const [sendData, setSendData] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setData([{ id: props.userId, secret_code }]);
    setSendData(true);
  };

  useEffect(() => {
    if (data !== [] && sendData === true) {
      setSendData(false);
      socket.emit("employeClick", data);
      socket.on("codeCorrect", () => {
        props.setModal(false);
      });
      socket.on("updateFront", (data) => {
        props.setPersons(data);
      });
      socket.on("updateFront2", (data) => {
        props.setPersons(data);
      });
      socket.on("codeIncorrect", () => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      });
    }
  }, [data, sendData, props.persons]);

  return (
    <div className="modal-container">
      <div className="modalle">
          <div className="modal-code">
            <span className="close" onClick={() => props.setModal(false)}>
              &#10005;
            </span>
            <form onSubmit={handleSubmit}>
              <label>Entrer votre code secret</label>
              <input
                type="password"
                className="input"
                value={secret_code}
                onChange={(e) => setSecret_code(e.target.value)}
              />
              <input type="submit" className="btn" value="valider" />
              {error === true && (
                <div className="modal-error">
                  <span>Code secret incorrect. Reéssayer</span>
                </div>
              )}
            </form>
          </div>
      </div>
    </div>
  );
};

export default Modal;
