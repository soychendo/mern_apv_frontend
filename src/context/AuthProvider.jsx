import { createContext, useState , useEffect } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if(!mounted) {
      setMounted(true);
      return;
    }
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');
      if(!token) {
        setLoading(false)
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const { data } = await clienteAxios('/veterinarios/perfil', config);
        setAuth(data)
      } catch (error) {
        console.log("auth", error.response.data.msg)
        setAuth({})
      }
      setLoading(false)
    }
    autenticarUsuario()
  }, [mounted])

  const logOut = () => {
    localStorage.removeItem('token');
    setAuth({})
  }
  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem('token');
      if(!token) {
        setLoading(false)
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const url = `/veterinarios/perfil/${datos._id}`;
        await clienteAxios.put(url, datos, config);
        
        return {
          msg: 'Almacenado Correctamente'
        }
      } catch (error) {
        return {
          msg: error.response.data.msg,
          error: true
        }
      }
  }

  const guardarPassword = async datos => {
    const token = localStorage.getItem('token');
    if(!token) {
      setLoading(false)
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const url = '/veterinarios/actualizar-password';
      const { data } = await clienteAxios.put(url, datos, config)
      return {
        msg: data.msg
      }
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      }
    }
  }

  const value = {
    auth, 
    setAuth, 
    loading, 
    logOut, 
    actualizarPerfil,
    guardarPassword
  }

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider };

export default AuthContext;