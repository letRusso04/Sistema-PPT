const API = process.env.REACT_APP_API;
//enviroment
export class GlobalAPIRouter {
    constructor(){
        this.routerAuth = {
            inicio: `${API}/inicio`,
            registro: `${API}/registro`,
            registroCuenta:  `${API}/cuenta/registro`,
            llamarCuenta:  `${API}/cuenta/llamar`,
            /*generarToken: `${API}/inicio/registro/generarToken`,
            confirmarToken: `${API}/inicio/registro/confirmarToken`,
            segundoRegistro: `${API}/inicio/registro/segundoRegistro`*/
        };
        this.routerMessage = {
            callBot: `${API}/message/APIllamar/bot`,
            getMessageBot: `${API}/mensajes/buscar/bot`, 
            sendMessage: `${API}/mensajes/enviar`,
            getMessage: `${API}/mensajes/buscar/miembro`, 
        }
        this.routerBusiness = {
            createBusiness: `${API}/negocio/crear`,
            callBusiness: `${API}/negocio/llamar`,
        }
        this.routerProduct = {
            createProduct: `${API}/producto/crear`,
            callProduct: `${API}/producto/llamar`,
            callProductID: `${API}/producto/buscar/unico`,
            changeProduct:  `${API}/producto/cambiar`,
            deleteProduct:  `${API}/producto/borrar`,
        }
        this.routerClient = {
            createClient: `${API}/cliente/crear`,
            callClient: `${API}/cliente/llamar`,
            callClientID: `${API}/cliente/llamar/unico`,
            changeClient:  `${API}/cliente/cambiar`,
            deleteClient:  `${API}/cliente/borrar`,
        }
    }
}
