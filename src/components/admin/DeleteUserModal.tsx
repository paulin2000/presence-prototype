import React from 'react';
import io from "socket.io-client";
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';


const Server_Address: string = "http://localhost:5000";
const socket = io(Server_Address);

interface Props{
  setDeleteUserModal:React.Dispatch<React.SetStateAction<boolean>>;
  id:number
  setDashboard:React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteUserModal = (props:Props) => {
  
  const deleteUser = ()=>{
    socket.emit("deleteUser",props.id)
    socket.on("deleteUserRes", (res)=>{
      socket.emit("allusers")
    })
    props.setDeleteUserModal(false)
    props.setDashboard(true)
  }
  return (
    <Modal.Dialog>
      <Modal.Header closeButton onClick={()=>{props.setDeleteUserModal(false);props.setDashboard(true)}} >
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Voulez vous vraiment supprimer cet utilisateur?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={()=>{deleteUser()}} >Confimer</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export default DeleteUserModal;