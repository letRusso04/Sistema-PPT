import styled from "styled-components";
import men_ico from "../../../../../application/Assets/img/icon_hombre.png";
import women_ico from "../../../../../application/Assets/img/icon_mujer.png";
import React, { useState, useEffect } from "react";
import { Session } from "bc-react-session";
import { UserControllerRepository } from "../../../../../application/Controller/AppController";
import Icon from "@mdi/react";
import { mdiAccountCheck, mdiAccountCancel } from "@mdi/js";
import axios from "axios";
import { GlobalAPIRouter } from "../../../../../infrastructure/router/ServicesRouter";

export function Organism_verif() {
  const router = new GlobalAPIRouter();
  const [users, setUsers] = useState([]);
  const [modalData, setModalData] = useState(null);
  const session = Session.get("user_information");
  const user_admin = session.payload["user_admin"];
  
  const userRepo = new UserControllerRepository();

  useEffect(() => {
       if (user_admin !== 1) {
      alert("Acceso no autorizado");
      window.location.href = "/dashboard/registro/miembros"; // Redirección segura
      return;
    }
    async function fetchUsers() {
      const res = await userRepo.controllerCallUser();
      if (res) {
        const filtered = res.filter(user => user[1] === 0);
        const parsed = filtered.map(user => ({
          id: user[0],
          verificado: user[1],
          nombre: user[2],
          telefono: user[3],
          direccion: user[4],
          correo: user[5],
          cedula: user[6],
          estado: user[7],
          permisos: user[8],
          imagen: user[9],
          genero: user[10],
        }));
        setUsers(parsed);
      }
    }
    fetchUsers();
  }, []);

  const handleAction = (id, action) => {
    setModalData({ id, action });
  };

  const confirmAction = async () => {
    try {
      if (modalData.action === "aprobar") {
        await axios.post(`${router.routerUser.acceptMember}`, {
          iduser: modalData.id,
        });
        alert("Usuario aprobado exitosamente.");
      } else {
        await axios.post(`${router.routerUser.deleteMember}`, {
          iduser: modalData.id,
        });
        alert("Usuario eliminado exitosamente.");
      }

      setUsers((prev) => prev.filter((u) => u.id !== modalData.id));
    } catch (error) {
      alert("Ocurrió un error al procesar la solicitud.");
    } finally {
      setModalData(null);
    }
  };

  const cancelAction = () => {
    setModalData(null);
  };

  return (
    <>
      {users.map(user => (
        <Card key={user.id}>
          <div className="imagen_content">
            <img src={men_ico} alt="Avatar" />
            <p>{user.nombre}</p>
            <p>SIN VERIFICACIÓN</p>
          </div>
          <div className="user_information">
            <div className="user_information_data">
              <h1>CEDULA IDENTIDAD: <span>{user.cedula}</span></h1>
              <h1>ESTADO: <span>{user.estado}</span></h1>
              <h1>DIRECCIÓN: <span>{user.direccion}</span></h1>
              <h1>CORREO: <span>{user.correo}</span></h1>
              <h1>TELÉFONO: <span>{user.telefono}</span></h1>
            </div>
            {user_admin === 1 && (
              <div className="user_information_button">
                <label
                  className="reject_user"
                  onClick={() => handleAction(user.id, "rechazar")}
                >
                  <Icon path={mdiAccountCancel} size={1} /> RECHAZAR
                </label>
                <label
                  className="approve_user"
                  onClick={() => handleAction(user.id, "aprobar")}
                >
                  <Icon path={mdiAccountCheck} size={1} /> APROBAR
                </label>
              </div>
            )}
          </div>
        </Card>
      ))}

      {modalData && (
        <ModalOverlay>
          <ModalBox>
            <h2>¿Estás seguro?</h2>
            <p>¿Deseas {modalData.action} este usuario?</p>
            <div className="modal_buttons">
              <button onClick={confirmAction}>Sí</button>
              <button onClick={cancelAction}>Cancelar</button>
            </div>
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
}

const Card = styled.div`
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  display: flex;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 0 8px #000;

  .imagen_content {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      height: 80px;
      width: 80px;
      border-radius: 50%;
      object-fit: cover;
    }

    p {
      color: #fff;
      font-weight: bold;
      margin-top: 10px;
    }

    label {
      color: #ccc;
      font-size: 12px;
    }
  }

  .user_information {
    width: 75%;
    display: flex;
    flex-direction: column;

    .user_information_data {
      h1 {
        color: #fff;
        font-size: 14px;
        margin: 4px 0;
        span {
          color: #ddd;
          font-weight: normal;
        }
      }
    }

    .user_information_button {
      display: flex;
      gap: 12px;
      margin-top: 10px;

      label {
        padding: 6px 10px;
        font-size: 13px;
        border-radius: 6px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .approve_user {
        background: #225522;
        color: white;
      }

      .reject_user {
        background: #772222;
        color: white;
      }

      label:hover {
        opacity: 0.85;
      }
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 10, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: #1e1e1e;
  padding: 24px;
  border-radius: 10px;
  text-align: center;
  color: white;
  max-width: 300px;

  h2 {
    margin-bottom: 12px;
  }

  .modal_buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 16px;

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      background: #333;
      color: white;
      cursor: pointer;
      transition: all 0.3s;
      width: 100px;
      &:hover {
        background: #555;
      }
    }
  }
`;
