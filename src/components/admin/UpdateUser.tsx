import io from "socket.io-client";
import { useState } from "react";
import { isBuffer } from "util";
import { Alert } from "react-bootstrap";

const Server_Address: string = "http://localhost:5000";
const socket = io(Server_Address);

// interface Props{
//   id: number
// }

const UpdateUser = () => {
  const [name, setname] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confPassword, setConfPassword] = useState<string>("")
  const [sexe, setSexe] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const s: React.RefAttributes<HTMLDivElement> = <h1>salut</h1>

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault()
    // socket.emit("updateUser",id)
    // socket.on("updateUserSuccess",()=>{})
    console.log(name, lastName, password, confPassword, sexe, role)
    if(password !== confPassword){
      console.log('gggg')
    } 
  }

  return (
    <div className="signup-body">
      <h1>Update User</h1>
      <div className="signup-container">
        <div className="form-container">
          <div className="form-header">
            <h1>Update User</h1>
          </div>
          <div className="form-body">
            <form action="" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" value={name} defaultValue={name} onChange={(e)=>{setname(e.target.value)}}placeholder="Name" />
                <input type="text" value={lastName}defaultValue={lastName} onChange={(e)=>{setLastName(e.target.value)}}placeholder="Last name" />
              </div>
              <div className="form-group two">
                <input type="password" value={password}defaultValue={password} onChange={(e)=>{setPassword(e.target.value)}}placeholder="New password" />
                <input type="password" value={confPassword}defaultValue={confPassword} onChange={(e)=>{setConfPassword(e.target.value)}}placeholder="Confirm password" />
              </div>
              <div className="form-group">
                <label htmlFor="sexe">Sexe</label>
                <select name="Sexe" id="sexe"  value={sexe} defaultValue={sexe} onChange={(e)=> setSexe(e.target.value)}>
                  <option value="Masculin">Masculin</option>
                  <option value="Feminin">Feminin</option>
                </select>
                <label htmlFor="role">Rôle</label>
                <select name="Rôle" id="role" value={role} onChange={(e)=>{setRole(e.target.value)}}defaultValue={role}>
                  <option value="Employé">Employé</option>
                  <option value="Comtabilité">Comtabilité</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>
              <div className="buton">
                <button className="btn btn-success">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
