import React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import Modal from 'react-bootstrap/Modal'
 


const Server_Address: string = "http://localhost:5000";
const socket = io(Server_Address);

interface Props{
  setCreateUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp = (props: Props) => {
  const [name, setname] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [password, setPassword] = useState<string>("")
  const [confPassword, setConfPassword] = useState<string>("")
  const [sexe, setSexe] = useState<string>("")
  const [role, setRole] = useState<string>("Employé")
  const   [error, setError] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = (e:React.SyntheticEvent)=>{
    e.preventDefault()
    if(password !== confPassword){
      setError(true)
      setTimeout(() => {
        setError(false);
      }, 2000);
    }else{
      const userData={
        first_name: name, 
        last_name: lastName,
        sexe : sexe === "Feminin" ? "F" : "M",
        secret_code: password,
        role: role === "Employé" ? "employe": (role === "Comptabilité" ? "compta" : "admin")}
      socket.emit("createUser",userData)
      socket.on("createUserSuccess",()=>{
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false);
        }, 4000);
    })}

  }
  return (
    <div className='signup-body'>
      <div className="signup-container">
        <div className="form-container">
          <div className="form-header">
            <h1>Create New User</h1>
            <span id="close" onClick={()=>{props.setCreateUserModal(false)}}>&#10005;</span>
          </div>
          <div className="form-body">
            <form action="" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" value={name} onChange={(e)=>setname(e.target.value)}placeholder='Name'/>
                <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder='Last name'/>
              </div>
              <div className="form-group two">
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}placeholder='New password'/>
                <input type="password" value={confPassword} onChange={(e)=>{setConfPassword(e.target.value)}} placeholder='Confirm password'/>
              </div>
              <div className="form-group">
                <label htmlFor="sexe">Sexe</label>
                <select name="Sexe" id="sexe" value={sexe} onChange={(e)=>setSexe(e.target.value)}>
                  <option value="Masculin">Masculin</option>
                  <option value="Feminin">Feminin</option>
                </select>
                <label htmlFor="role">Rôle</label>
                <select name="Rôle" id="role" value={role} onChange={(e)=>setRole(e.target.value)}>
                  <option value="Employé">Employé</option>
                  <option value="Comptabilité">Comptabilité</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>
              <div className="buton">
                <button className='btn btn-success'>Create</button>
              </div>
              {error === true && <div className="error">
                <span>Mots de passes invalides. Reéssayer...</span>
              </div>}
              {success === true && <div className="success">
                    <span>Utilisateur creé avec success</span>
                </div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;