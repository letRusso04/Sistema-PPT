import styled from "styled-components";
import men_ico from "../../../../../application/Assets/img/icon_hombre.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Session } from "bc-react-session";
import { UserControllerRepository } from "../../../../../application/Controller/AppController";
import { GlobalAPIRouter } from "../../../../../infrastructure/router/ServicesRouter";

export function Organism_preview() {
  const router = new GlobalAPIRouter();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const session = Session.get("user_information");
  const user_id = session.payload["user_id"];
  const user_admin = session.payload["user_admin"];
  const userRepo = new UserControllerRepository();

  useEffect(() => {
    async function fetchUserData() {
      const response = await userRepo.controllerCallUser(user_id);
      if (response && response.length > 0) {
        const parsedUsers = response
          .filter((user) => user[1] !== 0)
          .map((user) => ({
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
          }));
        setUsers(parsedUsers);
      }
    }
    fetchUserData();
  }, [user_id]);

  const handleDelete = async (user) => {
    const confirmDelete = window.confirm(`¿Deseas eliminar a ${user.nombre}?`);
    if (!confirmDelete) return;

    try {
      await axios.post(`${router.routerUser.deleteMember}`, { iduser: user.id });
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      alert("Usuario eliminado correctamente.");
    } catch (err) {
      alert("Error al eliminar usuario.");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await axios.post(`${router.routerUser.changeMember}`, {
        id: data.id,
        rol: data.permisos,
        correo: data.correo,
        cedula: data.cedula,
        estado: data.estado,
        ubicacion: data.direccion,
        telefono: data.telefono,
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === data.id ? data : u))
      );
      alert("Usuario actualizado.");
      setEditingUser(null);
    } catch (err) {
      alert("Error al actualizar el usuario.");
    }
  };

  if (users.length === 0) return <div>No hay usuarios verificados disponibles.</div>;

  return (
    <>
      {users.map((user) => (
        <ContentCardsStyles key={user.id}>
          <div className="imagen_content">
            <img src={men_ico} alt="Avatar" />
            <p>{user.nombre}</p>
            <p>{user.permisos === 1 ? "Administrador" : "Usuario"}</p>
          </div>
          <div className="user_information">
            <div className="user_information_data">
              <h1>ESTADO NACIONAL: <span>{user.estado}</span></h1>
              <h1>UBICACIÓN GEOGRÁFICA: <span>{user.direccion}</span></h1>
              <h1>CORREO ELECTRÓNICO: <span>{user.correo}</span></h1>
              <h1>NÚMERO DE TELÉFONO: <span>{user.telefono}</span></h1>
              <h1>CEDULA: <span>{user.cedula}</span></h1>
            </div>
            {user_admin === 1 && (
              <div className="user_information_button">
                <label className="delete_user" onClick={() => handleDelete(user)}>ELIMINAR USUARIO</label>
                <label className="update_user" onClick={() => setEditingUser(user)}>ACTUALIZAR USUARIO</label>
              </div>
            )}
          </div>
        </ContentCardsStyles>
      ))}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleUpdate}
        />
      )}
    </>
  );
}

// ---------- MODAL ----------

const venezuelanStates = [
  "Amazonas", "Anzoátegui", "Apure", "Aragua", "Barinas", "Bolívar", "Carabobo",
  "Cojedes", "Delta Amacuro", "Distrito Capital", "Falcón", "Guárico", "Lara",
  "Mérida", "Miranda", "Monagas", "Nueva Esparta", "Portuguesa", "Sucre",
  "Táchira", "Trujillo", "La Guaira", "Yaracuy", "Zulia"
];

function EditUserModal({ user, onClose, onSave }) {
  const [form, setForm] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "telefono" || name === "cedula") && !/^\d*$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!validateEmail(form.correo)) return alert("Correo no válido.");
    if (!form.telefono || !form.cedula) return alert("Teléfono y cédula requeridos.");
    onSave(form);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>Editar Usuario</h2>
        {["nombre", "telefono", "direccion", "correo", "cedula"].map((field) => (
          <div key={field}>
            <label>{field.toUpperCase()}</label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <div>
          <label>ESTADO</label>
          <select name="estado" value={form.estado} onChange={handleChange}>
            {venezuelanStates.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>
        <div className="buttons">
          <button className="gray" onClick={onClose}>Cancelar</button>
          <button onClick={handleSubmit}>Guardar</button>
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
}

// ---------- ESTILOS ----------

const ContentCardsStyles = styled.div`
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin: 12px auto;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

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
      margin-top: 10px;
      font-weight: bold;
      color: #ffffff;
      text-transform: uppercase;
    }
  }

  .user_information {
    width: 70%;
    display: flex;
    flex-direction: column;

    .user_information_data {
      margin-bottom: 12px;

      h1 {
        font-size: 14px;
        color: #ffffff;
        margin: 4px 0;

        span {
          font-weight: normal;
          color: #dddddd;
        }
      }
    }

    .user_information_button {
      display: flex;
      gap: 20px;

      label {
        padding: 6px 12px;
        font-size: 13px;
        font-weight: bold;
        border-radius: 6px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
      }

      .delete_user {
        background-color: #6a0000;
        color: #ffffff;
      }

      .update_user {
        background-color: #4a4a00;
        color: #ffffff;
      }

      label:hover {
        opacity: 0.8;
        transform: scale(1.05);
      }
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #1e1e1e;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  color: #fff;

  h2 {
    margin-bottom: 16px;
  }

  div {
    margin-bottom: 12px;

    label {
      display: block;
      margin-bottom: 4px;
      font-weight: bold;
      color: #ccc;
    }

    input, select {
      width: 100%;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #555;
      background: #2a2a2a;
      color: #fff;
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    button {
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: #fff;
      background: #005f5f;

      &.gray {
        background: #444;
      }

      &:hover {
        opacity: 0.85;
      }
    }
  }
`;
