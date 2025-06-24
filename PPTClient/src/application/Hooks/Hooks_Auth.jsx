import react, { useState, useEffect } from "react";
export const HooksStatesUse = () => {
  //Iniciador de estados de todos los componentes de Autenticación.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [passwordconfirm, setPasswordConfirm] = useState("");
  const [date, setDate] = useState("");
  const [numberdata, setNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeDesing, setTimeDesign] = useState(false);
  const [controlUbicacion, setControlUbicacion] = useState("");
  const [controllerMenu, setControllerMenu] = useState(false);
  const [tlfchange, setChangeTlf] = useState(0);
  const [category, setCategory] = useState("");
  // Funciones para obtener los datos.
  const onInputEmailChange = (isEmail) => setEmail(isEmail);
  const onInputPasswordChange = (isThePass) => setPassword(isThePass);
  const onInputNameChange = (isName) => setName(isName);
  const onInputPasswordConfirmChange = (isPasswordConfirm) => setPasswordConfirm(isPasswordConfirm);
  const onInputDateChange = (isDate) => setDate(isDate);
  const onInputNumberChange = (isNumber) => setNumber(isNumber);
  const onInputSelectedChange = (isSelected) => setSelectedOption(isSelected);
  const onInputTimeDesing = (isTime) => setTimeDesign(isTime);
  const onInputControlUbicacion = (isUbi) => setControlUbicacion(isUbi);
  const onInputCategory = (isCate) => setCategory(isCate);
  const onControllerMenu = (isController) => setControllerMenu(isController); 
  const onControllerTlf = (isTlf) => setChangeTlf(isTlf); 

  // Funciones de retorno de los datos.
  const onLoginData = () => {
    return { email, password };
  };
  const onRegisterData = () => {
    return { email, name, password, passwordconfirm, tlfchange, name, numberdata, controlUbicacion, category };
  };

  const onTimeData = ()=>{
    return {timeDesing}
  }

  const onControllers = () =>{
    return {controllerMenu}
  }


  // Creacion de un objeto que almacene todos los métodos, para aligerar las importaciones.
  const onInputController = {
    onInputEmailChange,
    onInputPasswordChange,
    onInputNameChange,
    onInputPasswordConfirmChange,
    onInputDateChange,
    onInputNumberChange,
    onInputSelectedChange,
    onInputTimeDesing,
    onInputControlUbicacion,
    onInputCategory,
    onControllerMenu,
    onControllerTlf,

  };
  // Creacion de un objeto que almacene todos los metodos de traer datos.
  const onResponseData ={
    onLoginData,
    onRegisterData,
    onTimeData,
    onControllers,
  }
  // Retorno.
  return {
    onInputController,
    onResponseData
  };
};
