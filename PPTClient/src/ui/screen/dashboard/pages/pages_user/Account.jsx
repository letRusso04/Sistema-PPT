import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Session } from "bc-react-session";
import axios from "axios";
import { GlobalAPIRouter } from "../../../../../infrastructure/router/ServicesRouter";
import icon_main from "../../../../../application/Assets/img/icon_main.png";

function MiCuenta() {
  const [user, setUser] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  let router = new GlobalAPIRouter();
  useEffect(() => {
    const sessionData = Session.get("user_information");
    if (sessionData && sessionData.payload) {
      setUser(sessionData.payload);
    }
  }, []);

const handleAvatarChange = async (e) => {
  const file = e.target.files[0];
  if (!file || !user) return;

  const formData = new FormData();
  formData.append("avatar", file);
  formData.append("iduser", user.user_id);

  try {
    const response = await axios.post(`${router.routerUser.ChangeImage}`, formData);
    
    if (response.status === 200) {
      const { avatarUrl } = response.data;

      // Actualiza solo el campo `user_image` dentro del objeto completo
      const currentSession = Session.get("user_information");
      if (currentSession && currentSession.payload) {
        const updatedUser = {
          ...currentSession.payload,
          user_image: avatarUrl,
        };

        // Vuelve a setear toda la sesión actualizada
        Session.start("user_information", { payload: updatedUser });

        alert("Avatar actualizado");
        window.location.reload();
      }
    }
  } catch (err) {
    alert("Error al subir la imagen");
    console.error(err);
  }
};


  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await axios.post(`${router.routerUser.changePassword}`, {
        iduser: user.user_id,
        contranueva: newPass,
        contravieja: currentPass,
      });

      if (res.data.success) {
        alert("Contraseña cambiada con éxito");
        setCurrentPass("");
        setNewPass("");
        setConfirmPass("");
      } else {
        alert(res.data.error || "Error en el cambio");
      }
    } catch (err) {
      alert("Error del servidor al cambiar la contraseña");
    }
  };

  if (!user) return <LoadingContainer>Cargando datos...</LoadingContainer>;

  const avatarURL = user.user_image
    ? `${router.routerUser.callImage}${user.user_image}`
    : icon_main;

  return (
    <Container>
      <LeftPanel>
        <AvatarContainer>
          <img src={avatarURL} alt="avatar" />
          <div>
            <h2>{user.user_name}</h2>
            <input type="file" onChange={handleAvatarChange} />
          </div>
        </AvatarContainer>

        <DataRow><span>Cédula:</span> {user.user_cedula}</DataRow>
        <DataRow><span>Ubicación:</span> {user.user_ubicacion}</DataRow>
        <DataRow><span>Correo:</span> {user.user_email}</DataRow>
        <DataRow><span>Teléfono:</span> {user.user_phone}</DataRow>
        <DataRow><span>Estado:</span> {user.user_estado}</DataRow>
        <DataRow><span>Rol:</span> {user.user_admin === 1 ? 'Administrador' : 'Usuario'}</DataRow>
      </LeftPanel>

      <RightPanel>
        <h3>Cambiar contraseña</h3>
        <form onSubmit={handlePasswordChange}>
          <Input
            type="password"
            placeholder="Contraseña actual"
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Nueva contraseña"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirmar nueva contraseña"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
          <Button type="submit">Cambiar</Button>
        </form>
      </RightPanel>
    </Container>
  );
}

export default MiCuenta;

// ====================== ESTILOS ========================

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #0f0f0f;
  color: #f0f0f0;
`;

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111;
  color: #ccc;
  font-size: 20px;
`;

const LeftPanel = styled.div`
  width: 50%;
  padding: 40px;
  border-right: 1px solid #222;
  display: flex;
  flex-direction: column;
`;

const RightPanel = styled.div`
  width: 50%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: #111;

  h3 {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }

  input {
    margin-top: 10px;
    background-color: transparent;
    color: white;
  }

  h2 {
    font-size: 22px;
    color: #fff;
  }
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #333;

  span {
    font-weight: bold;
    color: #ccc;
  }
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 14px;
  border: none;
  background: #222;
  color: #eee;
  font-size: 15px;

  &:focus {
    outline: 2px solid #2a56c6;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #2a56c6;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #2346a1;
  }
`;
