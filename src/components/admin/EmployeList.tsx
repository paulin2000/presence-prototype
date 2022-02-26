import { useEffect, useState } from "react";
import MoisList from "./MoisList";
import io from "socket.io-client";
const Server_Address: string = "http://localhost:5000";
const socket = io(Server_Address);

const EmployeList = () => {
  type tableauObjet = Array<{
    id: number;
    first_name: string;
    last_name: string;
    sexe: string;
    presence: string;
  }>;

  const [persons, setPersons] = useState<tableauObjet>([]);
  const [moisList, setMoisList] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [moisListData, setData] = useState();

  useEffect(() => {
    socket.emit("allusers", id);
    socket.on("allusersres", (res) => {
      setPersons(res);
    });
    socket.on("updateFront", (data) => {
      setPersons(data);
    });
    socket.on("updateFront2", (data) => {
      setPersons(data);
    });
  }, [socket]);

  const disconnect = () => {
    localStorage.removeItem("connexion");
    window.location.reload();
  };

  const ProfilPage = (e: number) => {
    socket.emit("userHoraires", e);
    socket.on("userHorairesRes", (res) => {
      const data = res.rows.map((row: any) => {
        const { heureArrive, heureDepart, createdAt, times } = row;
        const newDate = new Date(createdAt);
        const mod = newDate.toString().slice(4, 10);
        return {
          heureArrive,
          heureDepart,
          mois: mod.slice(0, 3),
          jour: mod.slice(4, 6),
          dayhour: times,
        };
      });
      setData(data);
      setId(e);
      setMoisList(true);
    });
  };

  return (
    <>
      {moisList === true ? (
        <MoisList setMoisList={setMoisList} id={id} data={moisListData} />
      ) : (
        <div className="presence-list">
          <div className="table-cont">
            <button
              onClick={disconnect}
              id="deconnexion"
              className="btn btn-secondary"
            >
              Deconnexion
            </button>
            <table id="table" className="table table-striped">
              <thead className="table-head">
                <tr className="table-head-row">
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>sexe</th>
                  <th>presence</th>
                  <th className="info-th">Informations</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {persons.map((person, index) => {
                  return (
                    <tr key={index} className="table-body-row">
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
                      <td id="btn-td">
                        <button
                          onClick={() => {
                            ProfilPage(person.id);
                          }}
                          className="btn btn-info"
                        >
                          horaires
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeList;
