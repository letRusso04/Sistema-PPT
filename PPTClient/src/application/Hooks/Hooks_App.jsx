import {useState} from "react"

export const Hooks_Message = ()=>{
    // Creacion de estados iniciales de la aplicación
    const [message, setMessage] = useState("");
    const [chatbot, setChatbot] = useState("");
    const [userid, setUserId] = useState("");
    const [content, setContent] = useState("");
    const [friend, setFriend] = useState("");
    // Creacion de manejador de estado
    const onHandleMessageSubmit = (isMessage)=> setMessage(isMessage);
    const onHandleChatbot= (isBot)=> setChatbot(isBot);
    const onHandleFriend= (isFriend)=> setFriend(isFriend);
    const onHandleUserId = (isUser)=> setUserId(isUser);
    const onHandleContent = (isContent)=> setContent(isContent);
    // Creacion de respondida del estado, retorno de valor
    const onResponseMessage = ()=> {
        console.log(chatbot);
        console.log(friend);
        if(!chatbot){
     
            return { 
                message, friend, userid
            }
        }
        if(!friend){
            return { 
                message, chatbot, userid
            }
        }
       }
    const onResponseMessageList = ()=> {return { content};}
    //Cambiadores de estados disponibles.
    const hooksAvailable = {
        onHandleMessageSubmit,
        onHandleChatbot,
        onHandleUserId,
        onHandleContent,
        onHandleFriend
    }
    //Obtiene los valores almacenados en el estado a tiempo real.
    const hooksOnResponse ={
        onResponseMessage,
        onResponseMessageList
    }
    return {
        hooksAvailable,
        hooksOnResponse
    }
}

export const Hooks_Inventory = ()=>{
  // Creacion de estados iniciales de la aplicación
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rif, setRif] = useState("");
  const [number, setNumber] = useState("");
  //
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState();
  const [idBusiness, setIdBusiness] = useState();
  const [idAccount, setIdAccount] = useState();
  // Creacion de manejador de estado
  const onHandleName = (isName)=> setName(isName);
  const onHandleLocation = (isLocation)=> setLocation(isLocation);
  const onHandleRif = (isRif)=> setRif(isRif);
  const onHandleNumber = (isNumber)=> setNumber(isNumber);
  const onHandleCategory = (isCategory)=> setCategory(isCategory);
  const onHandlePrice = (isPrice)=> setPrice(isPrice);
  const onHandleCost = (isCost)=> setCost(isCost);
  const onHandleIdBusiness = (isIdBusiness)=> setIdBusiness(isIdBusiness);
  const onHandleIdAccount = (isIdAccount)=> setIdAccount(isIdAccount);
  // Creacion de respondida del estado, retorno de valor
  const onResponseCreateShop = ()=> {return { name,location, rif, number };}
  const onResponseCreateProduct = ()=> {return {name,category, price, cost, idBusiness, idAccount};}
  //Cambiadores de estados disponibles.
  const hooksAvailable = {
    onHandleName,
    onHandleLocation,
    onHandleRif,
    onHandleNumber,
    onHandleCategory,
    onHandlePrice,
    onHandleCost,
    onHandleIdBusiness,
    onHandleIdAccount
  }
  //Obtiene los valores almacenados en el estado a tiempo real.
  const hooksOnResponse ={
    onResponseCreateShop,
    onResponseCreateProduct
  }
  return {
      hooksAvailable,
      hooksOnResponse
  }
}

export const Hooks_Client = ()=>{
    // Creacion de estados iniciales de la aplicación
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [cid, setCid] = useState("");
    const [phone, setPhone] = useState("");
    const [idBusiness, setIdBusiness] = useState();
    const [idAccount, setIdAccount] = useState();
    // Creacion de manejador de estado
    const onHandleName = (isName)=> setName(isName);
    const onHandleAddress = (isAddress)=> setAddress(isAddress);
    const onHandleCid = (isCid)=> setCid(isCid);
    const onHandlePhone = (isPhone)=> setPhone(isPhone);
    const onHandleIdBusiness = (isIdBusiness)=> setIdBusiness(isIdBusiness);
    const onHandleIdAccount = (isIdAccount)=> setIdAccount(isIdAccount);
    // Creacion de respondida del estado, retorno de valor
    const onResponseCreateClient = ()=> {return {name,address, cid, phone, idBusiness, idAccount};}
    //Cambiadores de estados disponibles.
    const hooksAvailable = {
      onHandleName,
      onHandleAddress,
      onHandleCid,
      onHandlePhone,
      onHandleIdBusiness,
      onHandleIdAccount
    }
    //Obtiene los valores almacenados en el estado a tiempo real.
    const hooksOnResponse ={
        onResponseCreateClient
    }
    return {
        hooksAvailable,
        hooksOnResponse
    }
  }


