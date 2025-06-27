import Icon from "@mdi/react";
import {
  mdiHomeOutline,
  mdiAccountCogOutline,
  mdiNewspaperVariantMultiple,
  mdiAccountPlusOutline,
  mdiAccountBadge,
  mdiAccountOff,
  mdiShieldCrown,
  mdiAccountRemove,
  mdiAccountBoxOutline,
  mdiLogout,
  mdiAccountBoxMultipleOutline,
  mdiAccountCardOutline,
  mdiAccountMultiplePlusOutline,
  mdiStorefront,
  mdiClipboardListOutline,
  mdiChartBarStacked
} from "@mdi/js";
import image_icon from "../../../application/Assets/img/PPTLogo.png";
import publish from "../../../application/Assets/img/banner4.jpg";
import publish2 from "../../../application/Assets/img/banner5.jpg";




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



export const InterfaceMessageChat = [];
