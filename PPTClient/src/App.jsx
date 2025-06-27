import React from "react";
import "./ui/toolkits/fonts/fonts.css";
import "./ui/toolkits/styles/App.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Links de autentacion de usuario.
import Homepage from "./ui/screen/auth/pages/Homepage";
import Login from "./ui/screen/auth/pages/Login";
import Register from "./ui/screen/auth/pages/Register";

//Links generales por parte del usuario.

import Navigation from "./ui/screen/dashboard/pages/Navigation";
import Home from "./ui/screen/dashboard/pages/pages_business/Home";
import UserList from "./ui/screen/dashboard/pages/pages_business/UsersList";
import News from "./ui/screen/dashboard/pages/pages_business/News";
import Chat from "./ui/screen/dashboard/pages/pages_user/Chat";
import Audit from "./ui/screen/dashboard/pages/pages_business/Audit";

// Configuracion interna del usuario
import Account from "./ui/screen/dashboard/pages/pages_user/Account";
import Logout from "./ui/screen/dashboard/pages/pages_user/Logout";

import { Organism_preview } from "./ui/screen/dashboard/organisms/organism_registro/organism_preview";
import { Organism_verif } from "./ui/screen/dashboard/organisms/organism_registro/organism_verif";
import { PublicacionScreen } from "./ui/screen/dashboard/pages/pages_business/CPost";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/inicio",
      element: <Login />,
    },
    {
      path: "/registro",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <Navigation />,
      children: [
        { 
          path: "home",
          element: <Home />,
          children: [
            { 
              path: ":idUser",
            },
          ],
        },
        {
          path: "auditoria",
          element: <Audit />,
        },
        {
          path: "crearpublicacion",
          element: <PublicacionScreen/>
        },
        {
          path: "registro",
          element: <UserList />,
          children: [
            {
              path: "miembros",
              element: <Organism_preview/>,
            },
                      {
              path: "verificacion",
              element: <Organism_verif/>
            },
            {
              path: "cliente",
              children: [
                {
                  path: "nuevo",
                  children:[
                    {
                      path: ":newClient"
                    }
                  ]
                },
                {
                  path: ":isList",
                  children:[
                    {
                      path: ":showClient"
                    }
                  ]
                },
                {
                  path: "eliminar",
                  children:[
                    {
                      path: ":deleteClient"
                    }
                  ]
                },
                {
                  path: "editar",
                  children:[
                    {
                      path: ":editClient"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          path: "novedades",
          element: <News />,
        },
        {
          path: "micuenta",
          element: <Account />,
        },
       {
          path: "mensajes",
          element: <Chat />,    
          children: [
            {
              path: ":isUserMessage",
            }
          ]
        },
 
        {
          path: "salir",
          element: <Logout />,
        },

      ],
    },
    {
      path: "*",
      element: <Homepage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
