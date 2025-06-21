import React from 'react'
import PPTLogo from "../../../../application/Assets/img/PPTLogo.png"
function Organism_Home() {
  return (
    <div className="content__main">
    <div className="content__main-left">
       <h1> Innovando en el futuro de la tecnología </h1>
       <p> ¡El esequibo es nuestro! Abriendo nuevas promesas para el pueblo Venezolano.</p>
    </div>
    <div className="content__main-right">
        <p>© 2025 PPT.Sistema de Registro y Control. Todos los derechos reservados.</p>
        <img src={PPTLogo} alt="" srcset="" />
    </div>
    </div>
  )
}

export default Organism_Home