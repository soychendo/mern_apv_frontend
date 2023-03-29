import { createContext, useState , useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

export const PacientesProvider = ({children}) => {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [mounted, setMounted] = useState(false);

  const { auth } = useAuth();

  useEffect(() => {
    if(!mounted) {
      setMounted(true);
      return;
    }

    const obtenerPacientes = async () => {

      try {
        const token = localStorage.getItem('token')
        if(!token) return;

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = await clienteAxios('/pacientes', config)
        setPacientes(data)

      } catch (error) {
        console.log(error)
      }
    }
    obtenerPacientes()
  }, [auth, mounted])

  const guardarPacientes = async (paciente) => {

    const token = localStorage.getItem('token');
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    if(paciente.id) {
      try {
        const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
        
        const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)

        setPacientes(pacienteActualizado)
      } catch (error) {
        console.log(error)
      }

    } else {

      try {
        const { data } = await clienteAxios.post('/pacientes', paciente, config);
        const { createdAt, updatedAt, __v, ...pacientesAlmacenados } = data;
        setPacientes([pacientesAlmacenados, ...pacientes])
  
      } catch (error) {
        console.log(error.response.data.msg)
      }
    }

  }

  const setEdicion = (paciente) => {
    setPaciente(paciente)
  }

  const eliminarPaciente = async (id) => {
    const confirmar = confirm('Confirmas que deseas eliminar?');
    if(confirmar) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        await clienteAxios.delete(`/pacientes/${id}`, config)
        const pacientesActualizado = pacientes.filter(pacienteStates => pacienteStates._id !== id);
        setPacientes(pacientesActualizado)
      } catch (error) {
        console.log(error)
      }
    }

  }

  const value = {
    pacientes, 
    guardarPacientes, 
    setEdicion, 
    paciente,
    eliminarPaciente
  }

  return(
    <PacientesContext.Provider value={value}>
      {children}
    </PacientesContext.Provider>
  )
}

export default PacientesContext;