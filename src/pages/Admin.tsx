import EmployeList from "../components/admin/EmployeList";
import Formulaire from "../components/admin/Formulaire";
import { useState, useEffect } from "react";
import SignUp from "../components/admin/SignUp";
import UpdateUser from '../components/admin/UpdateUser';

const Admin = () => {
  const [connected, setConnected] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem("connexion")) {
      setConnected(false);
    }
  }, []);
  return (
    <div className="admin">
      {connected === true ? (
        <div className="formulaire">
          <Formulaire setConnected={setConnected} connected={connected} />
        </div>
      ) : (
        <div className="admin-dashboard">
          <h1 id="h1">Gestion et Suivi des Employés</h1>
          <EmployeList />
        </div>
      )}
      {/* <SignUp/> */}
    {/* <UpdateUser/> */}
      </div>
  );
};

export default Admin;
