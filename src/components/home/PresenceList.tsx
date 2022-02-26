import { useEffect, useState } from "react";
import Modal from "./Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";
const Server_Address: string = "http://localhost:5000";
const socket = io(Server_Address);

const PresenceList = () => {
  type tableauObjet = Array<{
    id: number;
    first_name: string;
    last_name: string;
    sexe: string;
    presence: string;
  }>;

  const [persons, setPersons] = useState<tableauObjet>([]);
  const [userId, setUserId] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    socket.emit("allusers", "salut");
    socket.on("allusersres", (res) => {
      setPersons(res);
    });
  }, []);

  return (
    <div className="presence-list">
      {modal === true && (
        <Modal
          persons={persons}
          setPersons={setPersons}
          userId={userId}
          modal={modal}
          setModal={setModal}
        />
      )}
      <div className="header">
        <h1>Controle De Présence</h1>
        <span className="info">
          NB:Cliquez sur votre nom. Ensuite entrez votre code pour valider votre
          présence
        </span>
      </div>
      <div className="table-container">
        <table className="table table-striped" id="table">
          <thead className="table-head">
            <tr className="table-head-row">
              <th>Nom</th>
              <th>Prenom</th>
              <th>Sexe</th>
              <th>Presence</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {persons.map((person, index) => {
              return (
                <tr
                  key={index}
                  className="table-body-row"
                  onClick={() => {
                    setModal(true);
                    setUserId(person.id);
                  }}
                >
                  <td>{person.first_name}</td>
                  <td>{person.last_name}</td>
                  <td>{person.sexe}</td>
                  <td>
                    {person.presence === "present" ? (
                      <span id="green">Present</span>
                    ) : (
                      <span id="red">Absent</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PresenceList;
