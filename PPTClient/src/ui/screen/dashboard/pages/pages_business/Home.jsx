import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiClockOutline } from "@mdi/js";
import { GlobalAPIRouter } from "../../../../../infrastructure/router/ServicesRouter";
import icon_main from "../../../../../application/Assets/img/icon_main.png";

function Home() {
 
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let router = new GlobalAPIRouter();

  useEffect(() => {
    axios.post(`${router.auditoria.callPost}`)
      .then(res => setPublicaciones(res.data || []))
      .catch(err => setError("Error cargando publicaciones"))
      .finally(() => setLoading(false));
  }, []);

  const scrollToPublication = id => {
    document.getElementById(`pub-${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <Centered>🔄 Cargando publicaciones...</Centered>;
  if (error) return <Centered>❌ {error}</Centered>;
  if (!publicaciones.length) return <Centered>No hay publicaciones disponibles.</Centered>;

  return (
    <HomeLayout>
      <Sidebar>
        <h2>Últimas publicaciones</h2>
        <ul>
          {publicaciones.map((pub, i) => (
            <li key={i} onClick={() => scrollToPublication(i)}>
              <span>{pub.post_title}</span>
              <small>{new Date(pub.post_date).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      </Sidebar>

      <MainSection>
        <h1>Publicaciones de Administradores</h1>
        {publicaciones.map((pub, i) => (
          <Publicacion key={i} id={`pub-${i}`}>
            <div className="header">
              <div className="autor">
                <Icon path={mdiAccountCircle} size={1} color="#b0c4de" />
                <span>Administrador de Patria Para Todos ({pub.post_user})</span>
              </div>
              <div className="fecha">
                <Icon path={mdiClockOutline} size={0.8} color="#a0aec0" />
                <span>{new Date(pub.post_date).toLocaleDateString()}</span>
              </div>
            </div>
            <h2>{pub.post_title}</h2>
            <p>{pub.post_content}</p>
            {pub.post_urlimage && (
              <img
                src={
                  pub.post_urlimage
                    ? pub.post_urlimage.startsWith("http")
                      ? pub.post_urlimage
                      : `${router.auditoria.callImagePost}/${pub.post_urlimage}`
                    : {icon_main}
                }
                alt="publicación"
                onError={(e) => {
                  e.target.onerror = null; // evita loop infinito
                  e.target.src = {icon_main};
                }}
              />
            )}
          </Publicacion>
        ))}
      </MainSection>
    </HomeLayout>
  );
}

export default Home;

// ==================== ESTILOS ====================

const HomeLayout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #19222f;
  font-family: "Segoe UI", sans-serif;
`;

const Sidebar = styled.aside`
  width: 22%;
  background: #223349;
  color: #e0e6ed;
  padding: 30px 20px;
  border-right: 1px solid #2f4b65;
  overflow-y: auto;

  h2 {
    font-size: 16px;
    margin-bottom: 20px;
    border-bottom: 1px solid #34495e;
    padding-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
       
   
    li {
      cursor: pointer;
      margin-bottom: 22px;
      padding: 10px;
      border-radius: 6px;
  
      transition: background 0.3s;
      &:hover {
              cursor: pointer;

        background: #1d1e1f;
      }

      span {
           
   
        display: block;
        font-size: 14px;
        font-weight: bold;
        color: #d8e0ea;
      }

      small {
           
      
        font-size: 12px;
        color: #9baec8;
      }
    }
  }
`;
const MainSection = styled.main`
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  background: #1e1f26;

  h1 {
    font-size: 22px;
    color: #dbe3f1;
    margin-bottom: 30px;
  }
`;

const Publicacion = styled.div`
  background: #2a2c37;
  border-left: 4px solid #4e83c1;
  padding: 25px 30px;
  margin-bottom: 25px;
  transition: background 0.3s ease;
  border-radius: 6px;

  &:hover {
    background: #394156;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 13px;
    color: #b8beca;

    .autor,
    .fecha {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }

  h2 {
    color: #dbe3f1;
    font-size: 18px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #b8beca;
    line-height: 1.6;
  }

  img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    margin-top: 16px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
`;

const Centered = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1e1f26;
  color: #b8beca;
  font-size: 18px;
`;
