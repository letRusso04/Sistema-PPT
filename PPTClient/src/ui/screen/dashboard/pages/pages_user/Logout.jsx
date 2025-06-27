import React from 'react';
import styled from 'styled-components';
import { Session } from 'bc-react-session';

function Logout() {
  const user = Session.get("user_information")?.payload || {
    user_name: "Usuario",
  };

  const handleLogout = () => {
    Session.destroy();
    window.location.href = "/";
  };

  return (
    <LogoutStyles>
      <LogoutPanel>
        <Header>
          <h1>Hasta pronto, {user.user_name} 👋</h1>
          <p>¿Estás seguro de que deseas cerrar sesión?</p>
        </Header>

        <ButtonLogout onClick={handleLogout}>Cerrar Sesión</ButtonLogout>

        <NewsSection>
          <h2>📰 Noticias recientes</h2>
          <ul>
            <li>
              <strong>Actualización de seguridad:</strong> Ahora puedes proteger tu cuenta con autenticación de dos pasos.
            </li>
            <li>
              <strong>Nuevo sistema de verificación:</strong> Disponible en el panel administrativo.
            </li>
            <li>
              <strong>Compatibilidad móvil mejorada:</strong> Disfruta la plataforma desde cualquier dispositivo.
            </li>
          </ul>
        </NewsSection>
      </LogoutPanel>
    </LogoutStyles>
  );
}

const LogoutStyles = styled.div`
  background: linear-gradient(to bottom, #0f0f0f, #1c1c1c);
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LogoutPanel = styled.div`
  background: #121212;
  width: 100%;
  max-width: 500px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Header = styled.div`
  h1 {
    color: #f0f0f0;
    font-size: 24px;
  }
  p {
    color: #aaa;
    margin-top: 8px;
  }
`;

const ButtonLogout = styled.button`
  background: #600000;
  border: none;
  color: #fff;
  font-weight: bold;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #800000;
    transform: scale(1.02);
  }
`;

const NewsSection = styled.div`
  h2 {
    color: #d0d0d0;
    font-size: 18px;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding-left: 0;

    li {
      color: #bbb;
      margin-bottom: 8px;
      font-size: 14px;

      strong {
        color: #eee;
      }
    }
  }
`;

export default Logout;
