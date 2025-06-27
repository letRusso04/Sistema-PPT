import React from "react";
import styled from "styled-components";

const eventos = [
  {
    fecha: "2025-06-24",
    titulo: "Auditoría con nombres y permisos",
    descripcion:
      "Ahora los registros de auditoría muestran el ID SQL del usuario y el tipo de acción realizada (publicación, edición, expulsión, aprobación).",
    version: "v1.3.1",
  },
  {
    fecha: "2025-06-23",
    titulo: "Mejora en carga de imágenes",
    descripcion:
      "Optimización del renderizado de imágenes en publicaciones. Se maneja el peso y disponibilidad para evitar errores.",
    version: "v1.3.0",
  },
  {
    fecha: "2025-06-20",
    titulo: "Panel de publicaciones dinámicas",
    descripcion:
      "Integración de publicaciones creadas por superusuarios, visibles en el panel principal con título, texto e imagen.",
    version: "v1.2.5",
  },
  {
    fecha: "2025-06-14",
    titulo: "Sistema de verificación agregado",
    descripcion:
      "Ahora puedes aprobar o rechazar registros de usuarios desde la nueva sección Verificación.",
    version: "v1.2.0",
  },
  {
    fecha: "2025-06-10",
    titulo: "Mejoras responsivas",
    descripcion:
      "La interfaz de Miembros y Verificación se adapta mejor a pantallas móviles.",
  },
  {
    fecha: "2025-06-05",
    titulo: "Inicio del proyecto",
    descripcion: "Estructura base del sistema, login, registro y navegación.",
    version: "v1.0.0",
  },
];

export default function News() {
  return (
    <Container>
      <Background>
      <Overlay>
        <Header>Eventos / Actualizaciones</Header>
        <List>
          {eventos.map(({ fecha, titulo, descripcion, version }, i) => (
            <Card key={i}>
              <Fecha>{fecha}</Fecha>
              <TituloRow>
                <Titulo>{titulo}</Titulo>
                {version && <Version>{version}</Version>}
              </TituloRow>
              <Descripcion>{descripcion}</Descripcion>
            </Card>
          ))}
        </List>
      </Overlay>
  </Background>
    </Container>
  );
}

// ====== Estilos ======

const Container = styled.div`
overflow: scroll;
  width: 100vw;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #121212;
  color: #ddd;
`;

const Background = styled.div`

  top: 0;
  left: 0;
  width: 100vw;
  
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

const Overlay = styled.div`
  position: relative;
  z-index: 1;
  padding: 20px 40px;
  max-width: 900px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.55);
  border-radius: 8px;
  box-shadow: 0 0 15px #0009;
`;

const Header = styled.h1`
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 20px;
  color: #f0f0f0;
  text-align: center;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  background: #222;
  border-radius: 6px;
  padding: 20px;
  box-shadow: 0 0 12px #0008;
  transition: background-color 0.3s ease;
  cursor: default;

  &:hover {
    background-color: #333;
  }
`;

const Fecha = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: #a3a3a3;
  margin-bottom: 10px;
`;

const TituloRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Titulo = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #e0e0e0;
  margin: 0;
`;

const Version = styled.span`
  background-color: #36003a;
  color: #bb86fc;
  padding: 4px 12px;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 600;
  user-select: none;
`;

const Descripcion = styled.p`
  font-size: 15px;
  line-height: 1.5;
  color: #ccc;
  margin: 0;
`;
