import { useEffect, useState } from "react";
import MoisList from "./MoisList";
import io from "socket.io-client";
import UpdateUser from './UpdateUser';
import { userInfo } from "os";
import SignUp from './SignUp';
import DeleteUserModal from "./DeleteUserModal";
const Server_Address: string = "http://localhost:5000";
const socket = io(Server_Address);

interface Props{
  role: string
}

type tableauObjet = Array<{
  id: number;
  first_name: string;
  last_name: string;
  sexe: string;
  presence: string;
}>;

interface UserInfo{
  id: number,
  first_name: string,
  last_name: string, 
  sexe: string,
  secret_code: string,
  role: string
}

const EmployeList = (props:Props) => {

  const [persons, setPersons] = useState<tableauObjet>([]);
  const [moisList, setMoisList] = useState<boolean>(false);
  const [updateUserModal, setUpdateUserModal] = useState<boolean>(false)
  const [deleleUserModal, setDeleteUserModal] = useState<boolean>(false)
  const [createUserModal, setCreateUserModal] = useState<boolean>(false)
  const [deleteid, setDeleteId] = useState<number>(0)
  const [dashboard, setDashboard] = useState<boolean>(true)
  const [id, setId] = useState<number>(0);
  const [moisListData, setData] = useState();
  const [updateUserInfo, setUpdateUserInfo] = useState<UserInfo>({ id:0,first_name: "",
    last_name: "", 
    sexe: "",
    secret_code: "",
    role: ""})

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

  const history= (e: number) => {
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

  const updateUser = (e: number) =>{
    setUpdateUserModal(true)
    socket.emit("updateUser", e)
    socket.on("updateUserRes", (res)=>{
      setUpdateUserInfo(res)
    })
    socket.emit("allusers")
  }


  // const createUser = (data: UserInfo) =>{
  //   socket.emit("createUser", data)
  //   socket.on("createUserRes",()=>{

  //   })
  //   socket.emit("allusers")
  // }

  return (
    <>
      {dashboard === true && <div className="presence-list-admin">
          <div className="table-cont">
            <button
              onClick={disconnect}
              id="deconnexion"
              className="btn btn-secondary"
            >
              Deconnexion
            </button>
            {props.role === "admin" && <button
              onClick={()=>setCreateUserModal(true)}
              id="create"
              className="btn btn-secondary"
            >
              Creéer un nouvel utilisateur
            </button>}
            <div className="tablle-body">
                  <table className="table-body">
            <thead className="tablle-container" id="tablle">
              <tr className="tablle-head">
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Sexe</th>
                  {props.role==="admin" && <th>Presence</th>}
                  <th className="info-th">Informations</th>
              </tr>
              </thead>
            <tbody>
              {persons.map((person, index) => {
              return (
                <tr
                  key={index}
                  className="table-body-row" >
                      <td>{person.first_name}</td>
                      <td>{person.last_name}</td>
                      <td>{person.sexe}</td>
                      {props.role === "admin" && <td>
                        {person.presence === "present" ? (
                          <span id="green">Present</span>
                        ) : (
                          <span id="red">Absent</span>
                        )}
                      </td>}
                      <td id="btn-td">
                        <button
                          onClick={() => {
                            history(person.id);
                          }}
                          className="btn btn-success"
                        >
                          horaires
                        </button>
                        {props.role === "admin" &&
                        <>
                          <button
                            onClick={() => {
                              updateUser(person.id);
                            }}
                            className="btn btn-primary"
                            >
                            modifier
                          </button>
                          <button
                            onClick={() => {
                              setDeleteId(person.id)
                              setDashboard(false)
                              setDeleteUserModal(true)
                            }}
                            className="btn btn-danger"
                            >
                            supprimer
                          </button>
                        </>
                        }
                      </td>
                      
                </tr>
              );
            })}
            </tbody>
            
                  </table>
            </div>
        
          </div>
        </div>}
      {moisList === true  && <MoisList setMoisList={setMoisList} id={id} data={moisListData} />}
      {updateUserModal === true && <UpdateUser userInfo={updateUserInfo} setUpdateUserModal={setUpdateUserModal}/>} 
      {createUserModal === true && <SignUp setCreateUserModal={setCreateUserModal}/>}
      {deleleUserModal === true && <DeleteUserModal setDashboard={setDashboard} id={deleteid}setDeleteUserModal={setDeleteUserModal}/>}
    </>
  );
};

export default EmployeList;



