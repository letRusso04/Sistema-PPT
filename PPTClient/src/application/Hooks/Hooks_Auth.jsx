import react, { useState, useEffect } from "react";
export const HooksStatesUse = () => {
  //Iniciador de estados de todos los componentes de Autenticación.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [passwordconfirm, setPasswordConfirm] = useState("");
  const [seudonimo, setSeudonimo] = useState("");
  const [date, setDate] = useState("");
  const [number, setNumber] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [timeDesing, setTimeDesign] = useState(false);
  const [controlToken, setControlToken] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessRif, setBusinessRif] = useState("");
  const [controllerMenu, setControllerMenu] = useState(false);
  const [globalUser, setGlobalUser] = useState("");

  // Funciones para obtener los datos.
  const onInputEmailChange = (isEmail) => setEmail(isEmail);
  const onInputPasswordChange = (isPassword) => setPassword(isPassword);
  const onInputNameChange = (isName) => setName(isName);
  const onInputGlobalUser = (isGlobal) => setGlobalUser(isGlobal);
  const onInputPasswordConfirmChange = (isPasswordConfirm) => setPasswordConfirm(isPasswordConfirm);
  const onInputSeudonimoChange = (isSeudonimo) => setSeudonimo(isSeudonimo);
  const onInputDateChange = (isDate) => setDate(isDate);
  const onInputNumberChange = (isNumber) => setNumber(isNumber);
  const onInputSelectedChange = (isSelected) => setSelectedOption(isSelected);
  const onInputTimeDesing = (isTime) => setTimeDesign(isTime);
  const onInputControlToken = (isToken) => setControlToken(isToken);
  const onInputBusinessName = (isBusiness) => setBusinessName(isBusiness);
  const onInputBusinessRif = (isRif) => setBusinessRif(isRif);
  const onControllerMenu = (isController) => setControllerMenu(isController); 
  // Funciones de retorno de los datos.
  const onLoginData = () => {
    return { email, password };
  };
  const onRegisterData = () => {
    return { email, name, password, passwordconfirm, businessName, businessRif };
  };
  const onResformData = () => {
    return { seudonimo, date, number, selectedOption };
  };
  const onTimeData = ()=>{
    return {timeDesing}
  }
  const onTokenData = ()=>{
    return {controlToken}
  }
  const onControllers = () =>{
    return {controllerMenu}
  }
  const onRegisterUser = () =>{
    return {name,  number, password,  globalUser, selectedOption, timeDesing}
  }

  // Creacion de un objeto que almacene todos los métodos, para aligerar las importaciones.
  const onInputController = {
    onInputEmailChange,
    onInputPasswordChange,
    onInputNameChange,
    onInputPasswordConfirmChange,
    onInputSeudonimoChange,
    onInputDateChange,
    onInputNumberChange,
    onInputSelectedChange,
    onInputTimeDesing,
    onInputControlToken,
    onInputBusinessName,
    onInputBusinessRif,
    onControllerMenu,
    onInputGlobalUser
  };
  // Creacion de un objeto que almacene todos los metodos de traer datos.
  const onResponseData ={
    onLoginData,
    onRegisterData,
    onResformData,
    onTimeData,
    onTokenData,
    onControllers,
    onRegisterUser
  }
  // Retorno.
  return {
    onInputController,
    onResponseData
  };
};
