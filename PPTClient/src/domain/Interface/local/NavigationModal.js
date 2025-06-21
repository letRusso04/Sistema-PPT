import Icon from "@mdi/react";
import {
  mdiHomeOutline,
  mdiAccountCogOutline,
  mdiAccountCard,
  mdiAccessPointCheck,
  mdiMessageOutline,
  mdiRobotHappyOutline,
  mdiBellCircleOutline,
  mdiCogs,
  mdiWrenchCogOutline,
  mdiTrendingUp,
  mdiProgressClose,
  mdiNewspaperVariantMultiple,
  mdiFaceAgent,
  mdiAccountPlusOutline,
  mdiAccountBadge,
  mdiAccountOff,
  mdiShieldCrown,
  mdiAccountRemove,
  mdiStore,
  mdiStorefrontOutline,
  mdiStorefrontPlusOutline,
  mdiAccountBoxOutline,
  mdiLogout,
  mdiAccountBoxMultipleOutline,
  mdiAccountCardOutline,
  mdiAccountMultiplePlusOutline,
  mdiStorefront,
  mdiCardAccountDetailsOutline,
  mdiClipboardListOutline,
  mdiChartBarStacked
} from "@mdi/js";
import { useParams } from "react-router-dom";
import image_icon from "../../../application/Assets/img/PPTLogo.png";
import image_publish from "../../../application/Assets/img/muestra.png";
import publish from "../../../application/Assets/img/banner4.jpg";
import publish2 from "../../../application/Assets/img/banner5.jpg";

export const NavigationHome = [
  {
    icon: <Icon path={mdiHomeOutline} size={1.2} className="icon_style"></Icon>,
    labelName: "Principal",
    router: "/dashboard/home",
    active: true,
  },
    {
  icon: <Icon path={mdiNewspaperVariantMultiple} size={1.2} className="icon_style"></Icon>,
    labelName: "Novedades",
    router: "/dashboard/novedades",
    active: true,
  },
];


export const NavigationLeftRouter = [
  {
    labelName: "Principal",
    icon: <Icon path={mdiHomeOutline} size={1}></Icon>,
    router: "/dashboard/home",
    category: {
      labelVisible: false,
      labelName: "General",
      permissions: false,
    },
  },


  {
    labelName: "Registro",
    icon: <Icon path={mdiStorefront} size={1}></Icon>,
    router: "/dashboard/registro/miembros",
    separator: false,
    category: {
      labelVisible: false,
      labelName: "Ventas General",
      permissions: false,
    },
  },
 /* {
    labelName: "Grupos",
    icon: <Icon path={mdiCardAccountDetailsOutline} size={1}></Icon>,
    router: "/dashboard/grupos",
    separator: false,
    category: {
      labelVisible: false,
      labelName: "Ventas General",
      permissions: false,
    },
  },*/
    {
    labelName: "Auditoria",
    icon: <Icon path={mdiClipboardListOutline} size={1}></Icon>,
    router: "/dashboard/auditoria",
    separator: true,
    category: {
      labelVisible: false,
      labelName: "Administrativo",
      permissions: true,
    },
    permissions: true,
  },
    {
    labelName: "Eventos",
    icon: <Icon path={mdiChartBarStacked} size={1}></Icon>,
    router: "/dashboard/reportes",
    separator: false,
    category: {
      labelVisible: false,
      labelName: "Ventas General",
      permissions: false,
    },
  },
]; /*
  {
    labelName: "Proveedores",
    icon: <Icon path={mdiTruckCargoContainer} size={1}></Icon>,
    router: "/dashboard/proveedores",
    separator: false,
    category: {
      labelVisible: false,
      labelName: "Administrativo",
      permissions: true,
    },
    permissions: true,
  },

  {
    labelName: "Panel de Ventas",
    icon: <Icon path={mdiShopping} size={1}></Icon>,
    router: "/dashboard/panelventas",
    separator: false,
    category: {
      labelVisible: true,
      labelName: "Ventas General",
      permissions: false,
    },
  } /*
*/
/*

];*/

export const navigationRightRouter = [
    {
    category: "AJUSTES DE USUARIO",
    icon: 
      <Icon
        path={mdiAccountBoxOutline}
        size={1.2}
        className="icon_style"
      ></Icon>
    ,
    labelName: "Mi cuenta",
    router: "/dashboard/micuenta",
    active: true,
  },
    {
    labelName: "Mensajeria",
    icon: <Icon path={mdiMessageOutline} size={1}></Icon>,
    router: "/dashboard/mensajes",
    separator: 0,
    category: {
      labelVisible: false,
      labelName: "Desconecion",
      permissions: false,
    },
  },
  {
    labelName: "Desconectar",
    icon: <Icon path={mdiProgressClose} size={1}></Icon>,
    router: "/dashboard/salir",
    separator: 0,
    category: {
      labelVisible: false,
      labelName: "Desconecion",
      permissions: false,
    },
  },
];

export let InterfacePublishList = [
  {
    labelUrl: image_icon,
    labelName: "DESARROLLADOR DEL SISTEMA PPT",
    labelType: "BETA APP",
    labelContent:
      "El Consejo Nacional Electoral (CNE) proclamó oficialmente a los nuevos diputados de la Asamblea Nacional la victoria del partido oficialista, el Gran Polo Patriótico Simón Bolívar (GPPSB) con 253 escaños y 23 gobernaciones. La jornada electoral, con una participación del 43,18%, fue calificada por el CNE como una muestra de civismo y madurez democrática del pueblo venezolano.​",
    labelImage: publish,
  },
  {
    labelUrl: image_icon,
    labelName: "DESARROLLADOR DEL SISTEMA PPT",
    labelType: "BETA APP",
    labelContent:
      "El Partido Patria para Todos (PPT) presentará este lunes en rueda de prensa ocho precandidatos para las venideras elecciones de gobernadores del 25 de mayo, propuesta que será analizada y debatida en la reunión general que sostendrán con el Gran Polo Patriótico (GPP), instancia donde convergen todas las organizaciones políticas revolucionarias, anunció la secretaria general de la tolda azul, Ilenia Medina. Durante una entrevista concedida en el programa «Al Aire», que transmite Venezolana de Televisión, la diputada Medina afirmó que «desde el seno del PPT consideran que se requieren figuras que hayan estado toda su vida en el proceso revolucionario, con visiones muy contundentes para asumir cargos en el caso de los gobernadores, y de estos que serán presentados hay una mujer, el resto de las compañeras con mucha fuerza optaron para desarrollar los trabajos en los respectivos estados”. ",
    labelImage: publish2,
  },
];
export let InterfaceActivityList = [
  {
    ActivityUrl: image_icon,
    ActivityName: "Patria Para Todos",
    ActivityRouter: "#",
    ActivityStatus: false,
    activityStatusLabel: "DESCONECTADO",
  },
  {
    ActivityUrl: image_icon,
    ActivityName: "Yeicker Colmenares",
    ActivityRouter: "#",
    ActivityStatus: false,
    activityStatusLabel: "DESCONECTADO",
  },
  {
    ActivityUrl: image_icon,
    ActivityName: "Natasha Medina",
    ActivityRouter: "#",
    ActivityStatus: false,
    activityStatusLabel: "DESCONECTADO",
  },
  {
    ActivityUrl: image_icon,
    ActivityName: "Albert Chavez",
    ActivityRouter: "#",
    ActivityStatus: false,
    activityStatusLabel: "DESCONECTADO",
  },
  {
    ActivityUrl: image_icon,
    ActivityName: "Yoneiber Zambrano",
    ActivityRouter: "#",
    ActivityStatus: false,
    activityStatusLabel: "DESCONECTADO",
  },
];

export const actionsLogs = [
  {
    icon: (
      <Icon
        className="AtomsEmp_icon"
        path={mdiAccountPlusOutline}
        size={1}
      ></Icon>
    ),
    name: "Patria Para Todos",
    date: "13 de Mayo del 2025",
    format: "Se creó el usuario ",
  },
  {
    icon: (
      <Icon className="AtomsEmp_icon" path={mdiAccountBadge} size={1}></Icon>
    ),
    name: "Patria Para Todos",
    date: "13 de Mayo del 2025",
    format: "Se conectó el usuario ",
  },
  {
    icon: <Icon className="AtomsEmp_icon" path={mdiAccountOff} size={1}></Icon>,
    name: "Patria Para Todos",
    date: "13 de Mayo del 2025",
    format: "Se desconectó el usuario ",
  },
  {
    icon: (
      <Icon className="AtomsEmp_icon" path={mdiShieldCrown} size={1}></Icon>
    ),
    name: "Patria Para Todos",
    date: "13 de Mayo del 2025",
    format: "Se le dió permisos administrador a ",
  },
  {
    icon: (
      <Icon className="AtomsEmp_icon" path={mdiAccountRemove} size={1}></Icon>
    ),
    name: "Patria Para Todos",
    date: "13 de Mayo del 2025",
    format: "Se eliminó el usuario ",
  },
];

export let InterfaceBotIA = [
  {
    botID: "001",
    nameBot: "Patria Para Todos",
    imageUrl: { image_icon },
    router: "/dashboard/chatbot/001",
    status: "Disponible",
  },
  {
    botID: "002",
    nameBot: "Analista de Datos",
    imageUrl: { image_icon },
    router: "/dashboard/chatbot/002",
    status: "Mantenimiento",
  },
  {
    botID: "003",
    nameBot: "Consultor",
    imageUrl: { image_icon },
    router: "/dashboard/chatbot/003",
    status: "Mantenimiento",
  },
  {
    botID: "004",
    nameBot: "Administrador",
    imageUrl: { image_icon },
    router: "/dashboard/chatbot/004",
    status: "Mantenimiento",
  }
];

export const InterfaceAccountList = [
  {
    category: "AJUSTES DE USUARIO",
    icon: 
      <Icon
        path={mdiAccountBoxOutline}
        size={1.2}
        className="icon_style"
      ></Icon>
    ,
    labelName: "Mi cuenta",
    router: "/dashboard/micuenta",
    active: true,
  },
  {
    category: false,
    icon: <Icon path={mdiLogout} size={1.2} className="icon_style"></Icon>,
    labelName: "Desconectar",
    router: "/dashboard/salir",
    active: true,
  },
];

export const MenuList = [
  {
    categoryName: "Fundador",
    permissionsLevel: 4,
    categoryLabel: "Desarrollador de la Aplicación",
  }
];

export const InterfaceNewPapersGeneral = [

  {
    title: "Actualización de servidor General.",
    date: "10 DE MAYO del 2025",
    content: [
      "Se implementa los primeros paneles de inicio de sesión.",
      "Se agrega seguridad doble factor en la seguridad de registro.",
    ],
    type: "clasic",
  },
  {
    title: "Cambios agregados a Github",
    date: "10 DE MAYO del 2025",
    content: [
      "El código está en continua actualización en github.",
      "Agregadas librerias de electron para el funcionamiento de aplicación de escritorio.",
    ],
    type: "upgrade",
  },
];
export const InterfaceNewPapers = [
  {
    title: "Desarrollo de prototipo.",
    date: "10 DE MAYO del 2025",
    content: [
      "Fecha de presentación de prototipo establecida para Junio del año 2025, mostrando características que sastifagas con las necesidades básicas de los objetivos planteados en el proyecto de investigación.",
    ],
  },
  {
    title: "Levantamiento del servidor.",
    date: "10 DE MAYO del 2025",
    content: [
      "La fecha estipulada para levantar el servidor se declaró para inicio de Junio, para empezar con el proceso de QA de la aplicación.",
    ],
  },
];

export const InterfaceInventoryList = [
/*  {
    icon: <Icon path={mdiStore} size={1.2} className="icon_style"></Icon>,
    labelName: "Tienda principal",
    router: "/dashboard/inventario/almacen/001",
    active: true,
  },*/
  {
    id: 0,
    icon: (
      <Icon
        path={mdiStorefrontPlusOutline}
        size={1.2}
        className="icon_style"
      ></Icon>
    ),
    labelName: "AÑADIR TIENDA",
    router: "/dashboard/inventario/almacen/add",
    active: true,
  },
];


export const SettingsInventoryList = [
  {
    icon: (
      <Icon
        path={mdiAccountCogOutline}
        size={1.2}
        className="icon_style"
      ></Icon>
    ),
    labelName: "CONFIGURAR",
    router: "/dashboard/",
    active: true,
  }
];


export const InterfaceClientList = [
  {
    router: "client",
    labelID: "434242345",
    labelName: "Carlos Zambrano",
    category: "prueba",
    subLabel: "Tienda Principal",
    type: "",
  },
  {
    router: "client",
    labelID: "434242345",
    labelName: "Carlos Zambrano",
    category: "prueba",
    subLabel: "Tienda Principal",
    type: "",
  },
  {
    router: "client",
    labelID: "434242345",
    labelName: "Carlos Zambrano",
    category: "prueba",
    subLabel: "Tienda Principal",
    type: "",
  },
  {
    router: "client",
    labelID: "434242345",
    labelName: "Carlos Zambrano",
    category: "prueba",
    subLabel: "Tienda Principal",
    type: "",
  },
  {
    router: "client",
    labelID: "434242345",
    labelName: "Carlos Zambrano",
    category: "prueba",
    subLabel: "Tienda Principal",
    type: "",
  },
];

export const SettingsCustomerList = [
  {
    icon: (
      <Icon
        path={mdiAccountBoxOutline}
        size={1.2}
        className="icon_style"
      ></Icon>
    ),
    labelName: "MIEMBROS",
    router: "/dashboard/registro/miembros",
    active: true,
  },
  {
    icon: (
      <Icon
        path={mdiAccountCardOutline}
        size={1.2}
        className="icon_style"
      ></Icon>
    ),
    labelName: "VERIFICACION",
    router: "/dashboard/registro/verificacion",
    active: true,
  },
];
export const InterfaceCustomerList = [
  {
    icon: (
      <Icon
        path={mdiAccountBoxMultipleOutline}
        size={1.2}
        className="icon_style"
      ></Icon>
    ),
    labelName: "Clientes General",
    router: "/router",
    active: true,
  },
  {
    icon: (
      <Icon
        path={mdiAccountCardOutline}
        size={1.2}
        className="icon_style"
      ></Icon>
    ),
    labelName: "Grupo N1",
    router: "/router",
    active: true,
  },
  {
    icon: (
      <Icon
        path={mdiAccountCardOutline}
        size={1.2}
        className="icon_style"
      ></Icon>
    ),
    labelName: "Grupo N2",
    router: "/router",
    active: true,
  },
  {
    icon: (
      <Icon
        path={mdiAccountMultiplePlusOutline}
        size={1.2}
        className="icon_style"
      ></Icon>
    ),
    labelName: "Añadir Grupo",
    router: "/router",
    active: true,
  },
];
export const InterfaceUserList = [
  {
    name: "Yeicker Colmenares",
    date: "10 DE MAYO de 2025",
    lastConnection: "10 DE MAYO del 2025",
    country: "Venezuela",
    description: "Desarrollador de la aplicación",
    userId: "4210125125",
    category: {
      permissionsLabel: "Administrativo",
      permissionsLevel: 4,
    },
    images: {
      imageUrl: "image.url",
      imageFondUrl: "imageFond.url",
    },
  },
  {
    name: "Yoneiber Zambrano",
    date: "10 DE MAYO de 2025",
    lastConnection: "10 DE MAYO del 2025",
    country: "Venezuela",
    description: "Desarrollador de la aplicación",
    userId: "45464654654",
    category: {
      permissionsLabel: "Administrativo",
      permissionsLevel: 4,
    },
    images: {
      imageUrl: "image.url",
      imageFondUrl: "imageFond.url",
    },
  },
  {
    name: "Albert Chavez",
    date: "10 DE MAYO de 2025",
    lastConnection: "10 DE MAYO del 2025",
    country: "Venezuela",
    description: "Desarrollador de la aplicación",
    userId: "45464654654",
    category: {
      permissionsLabel: "Administrativo",
      permissionsLevel: 4,
    },
    images: {
      imageUrl: "image.url",
      imageFondUrl: "imageFond.url",
    },
  },
  {
    name: "Natasha Medina",
    date: "10 DE MAYO de 2025",
    lastConnection: "10 DE MAYO del 2025",
    country: "Venezuela",
    description: "Desarrollador de la aplicación",
    userId: "45464654654",
    category: {
      permissionsLabel: "Administrativo",
      permissionsLevel: 4,
    },
    images: {
      imageUrl: "image.url",
      imageFondUrl: "imageFond.url",
    },
  },
];

export const InterfaceMessageChat = [];
