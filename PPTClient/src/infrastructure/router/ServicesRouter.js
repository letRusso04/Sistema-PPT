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
            getMessage: `${API}/mensajes/buscar`, 
        }
        this.routerUser = {
            callMember: `${API}/miembros/llamar`,
            changePassword: `${API}/cambiarcontra`,
            callImage:  `${API}/avatars/`,
            ChangeImage:  `${API}/avatar/change`,
            changeMember: `${API}/miembros/actualizar`,
            deleteMember: `${API}/miembros/eliminar`,
            acceptMember: `${API}/miembros/aprobar`,

        }
        this.auditoria = {
            callAudit: `${API}/auditoria/llamar`,
            callPost: `${API}/publicaciones/llamar`,
            callImagePost: `${API}/publicaciones/imagen/`,
            savePost: `${API}/publicaciones/guardar`
        }
    }
}
