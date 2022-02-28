import io from "socket.io-client";
import { useState, useEffect } from 'react';
import { preProcessFile } from "typescript";


const Server_Address: string = "http://localhost:5000";
const socket = io(Server_Address);

interface UserInfo{
  id: number,
  first_name: string,
  last_name: string, 
  sexe: string,
  secret_code: string,
  role: string
}

interface Props{
  userInfo: any
  setUpdateUserModal: any
}

const UpdateUser = (props: Props) => {
  const [name, setname] = useState<string>(props.userInfo.first_name)
  const [lastName, setLastName] = useState<string>(props.userInfo.last_name)
  const [password, setPassword] = useState<string>("")
  const [confPassword, setConfPassword] = useState<string>("")
  const [sexe, setSexe] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const   [error, setError] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  let UserData: UserInfo = props.userInfo

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault()
    if(password === "" || password !== confPassword ){
      console.log("error")
      setError(true)
      setTimeout(() => {
        setError(false);
      }, 2000);
    }else{
      console.log(UserData)
      socket.emit("sakut","eee")
      socket.emit("updateUserData",UserData)
      socket.on("updateUserSuccess",()=>{
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false);
          props.setUpdateUserModal(false)
        }, 2000);
        
    })
    }
    
    
    
  }



  return (
    <div className="signup-body">
      <div className="signup-container">
        <div className="form-container">
          <div className="form-header">
            <h1>Update User</h1>
            <span id="close" onClick={()=>{props.setUpdateUserModal(false)}}>&#10005;</span>
          </div>
          <div className="form-body">
            <form action="" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text"  defaultValue={props.userInfo.first_name} onChange={(e)=>
                  {
                    UserData.first_name = e.target.value}}placeholder="Name" />
                <input type="text" defaultValue={props.userInfo.last_name}  onChange={(e)=>{ 
                  UserData.last_name = e.target.value}}placeholder="Last name" />
              </div>
              <div className="form-group two">
                <input type="password" onChange={(e)=>{
                  setPassword(e.target.value); UserData.secret_code = e.target.value;}}placeholder="New password" />
                <input type="password" onChange={(e)=>{setConfPassword(e.target.value)}}placeholder="Confirm password" />
              </div>
              <div className="form-group">
                <label htmlFor="sexe">Sexe</label>
                <select name="Sexe" id="sexe"  onChange={(e)=> UserData.sexe = e.target.value}>
                  <option value="Masculin">Masculin</option>
                  <option value="Feminin">Feminin</option>
                </select>
                <label htmlFor="role">Rôle</label>
                <select name="Rôle" id="role" defaultValue={props.userInfo.role} onChange={(e)=>{UserData.role = e.target.value}}>
                  <option value="Employé">Employé</option>
                  <option value="Comtabilité">Comtabilité</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>
              <div className="buton">
                <button className="btn btn-success">Update</button>
              </div>
              {error === true && <div className="error">
                <span>Mots de passes invalides. Reéssayer...</span>
              </div>}
              {success === true && <div className="success">
                    <span>Modification effectuer avec success</span>
                </div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
