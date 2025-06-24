const API = process.env.REACT_APP_API;
//enviroment
export class GlobalAPIRouter {
    constructor(){
        this.routerAuth = {
            inicio: `${API}/inicio`,
            registro: `${API}/registro`,
            registroCuenta:  `${API}/cuenta/registro`,
            llamarCuenta:  `${API}/cuenta/llamar`,
        };
        this.routerMessage = {
            sendMessage: `${API}/mensajes/enviar`,
            getMessage: `${API}/mensajes/buscar/miembro`, 
        }
    }
}
