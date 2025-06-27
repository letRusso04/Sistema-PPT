import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { 
  mdiPostOutline, 
  mdiPencilOutline, 
  mdiDeleteOutline, 
  mdiCheckCircleOutline, 
  mdiInformationOutline 
} from "@mdi/js";
import Icon from "@mdi/react";
import { GlobalAPIRouter } from "../../../../../infrastructure/router/ServicesRouter";


// Mapea código acción a ícono + texto y color
const accionMap = {
  1: { icon: mdiPostOutline, label: "Nuevo", color: "#3b82f6" },           // azul
  2: { icon: mdiPencilOutline, label: "Actualización", color: "#f97316" }, // naranja
  3: { icon: mdiDeleteOutline, label: "Eliminación/Expulsión", color: "#ef4444" }, // rojo
  4: { icon: mdiCheckCircleOutline, label: "Aprobación", color: "#22c55e" }, // verde
};

function Auditoria() {
  let router = new GlobalAPIRouter();
const API_URL = `${router.auditoria.callAudit}`; // Cambia a tu endpoint real
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Formatea fecha dd/mm/yyyy hh:mm
  const formatFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    const day = fecha.getDate().toString().padStart(2, "0");
    const month = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const year = fecha.getFullYear();
    const hour = fecha.getHours().toString().padStart(2, "0");
    const min = fecha.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hour}:${min}`;
  };

  useEffect(() => {
    async function fetchLogs() {
      try {
        setLoading(true);
        const response = await fetch(API_URL, { method: "POST" });
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        setLogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  if (loading) return <Centered><Spinner /></Centered>;
  if (error) return <Centered>Error: {error}</Centered>;
  if (logs.length === 0) return <Centered>No hay registros de auditoría.</Centered>;

  return (
    <Container>
      <Title>Auditoría del sistema</Title>
      <Subtitle>Historial de acciones realizadas por usuarios dentro del sistema</Subtitle>
      <Table>
        <thead>
          <tr>
            <Th>Acción</Th>
            <Th>Usuario</Th>
            <Th>Detalles</Th>
            <Th>Fecha y hora</Th>
          </tr>
        </thead>
        <tbody>
          {logs.map(({ id, usuario, accion, detalle, fecha }) => {
            const act = accionMap[accion] || { icon: mdiInformationOutline, label: "Acción desconocida", color: "#888" };
            return (
              <Tr key={id}>
                <Td action>
                  <Icon path={act.icon} size={1} color={act.color} />
                  <ActionLabel>{act.label}</ActionLabel>
                </Td>
                <Td>{usuario}</Td>
                <Td>{detalle}</Td>
                <Td>{formatFecha(fecha)}</Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Auditoria;

// --- Estilos ---

const Container = styled.div`
  background: #121212;
  color: #ddd;
  width: 100vw;
  padding: 30px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 90vh;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 8px;
  color: #f0f0f0;
`;

const Subtitle = styled.p`
  color: #999;
  margin-bottom: 24px;
  font-size: 14px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #1f1f1f;
  border-radius: 4px;
  overflow: hidden;

  thead {
    background: #292929;
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 20px;
  font-weight: 600;
  font-size: 13px;
  color: #aaa;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #333;

  &:hover {
    background: #2a2a2a;
  }
`;

const Td = styled.td`
  padding: 14px 20px;
  font-size: 14px;
  color: ${(props) => (props.action ? "#f0f0f0" : "#ccc")};
  display: ${(props) => (props.action ? "flex" : "table-cell")};
  align-items: center;
  gap: 8px;
`;

const ActionLabel = styled.span`
  font-weight: 600;
`;

const Centered = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bbb;
  font-size: 18px;
`;

// Simple spinner
const Spinner = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#57a6ff"
  >
    <g fill="none" fillRule="evenodd">
      <g transform="translate(1 1)" strokeWidth="2">
        <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite" />
        </path>
      </g>
    </g>
  </svg>
);
