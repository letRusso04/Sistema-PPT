import React from "react";
import { ToastContainer, toast } from "react-toastify";
class GetCatchError extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tieneError: false, mensajeError: "" };
  }
 // Desarrollo, no se está usando.
  static getDerivedStateFromError(error) {
    // Método 1
    return { tieneError: true, mensajeError: error.message };
  }

  componentDidCatch(error) {
    // Método 2
    // Ambos sirven por igual
    console.log("Componente cacheado:", error.message);
  }

  render() {
    if (this.state.tieneError) {
        toast.error('Ha ocurrido un error en la conexión, espera a más tarde o notifica un administrador.', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
      // "UI de emergencia"
      return (
        <ToastContainer></ToastContainer>
      )
    }

    return this.props.children;
  }
}

export default GetCatchError;