import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Logo from "./Logo";

const Header = () => {

  const { logOut } = useAuth();
  const setColor = {
    color: '#fff',
    width: 118.511,
    height: 50,
    viewBox: "190.744 50 118.511 50"
  }

  return (
    <header className="py-10 lg:py-6 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col items-center">
          <Logo setColor={setColor} />
          <h1 className="font-bold text-1xl text-indigo-200 text-center">
            Administrador de Pacientes de 
            <span className="text-white"> Veterinaria</span>
          </h1>
        </div>
        <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
          <Link 
            to='/admin' 
            className="text-white text-sm uppercase font-bold"
          > Pacientes
          </Link>
          <Link 
            to='/admin/perfil' 
            className="text-white text-sm uppercase font-bold"
          > Perfil
          </Link>
          <button 
            className="text-white text-sm uppercase font-bold" 
            type="button"
            onClick={logOut}
          > Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header