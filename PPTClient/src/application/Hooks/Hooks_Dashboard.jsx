import React, {useState} from "react"



export const Hooks_Dashboard = ()=>{
    // Creacion de estados iniciales de la aplicación
    const [navbar, setNavbar] = useState(false);
    const [rightNavbar, setRightNavbar] = useState(false);
    // Creacion de manejador de estado
    const onHandleSetNavbar = (isOpenNavbar)=>{
        navbar != true ? setNavbar(isOpenNavbar) : setNavbar(false);
    }
    const onHandleSetRightNavbar = (isOpenRightNavbar)=>{
        rightNavbar != true ? setRightNavbar(isOpenRightNavbar) : setRightNavbar(false);
    }
    // Creacion de respondida del estado, retorno de valor
    const onResponseNavbar = ()=> {return navbar;}
    const onResponseRightNavbar = ()=> {return rightNavbar;}
    //Cambiadores de estados disponibles.
    const hooksAvailable = {
        onHandleSetNavbar,
        onHandleSetRightNavbar
    }
    //Obtiene los valores almacenados en el estado a tiempo real.
    const hooksOnResponse ={
        onResponseNavbar,
        onResponseRightNavbar
    }
    return {
        hooksAvailable,
        hooksOnResponse
    }
}