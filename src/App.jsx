import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';

import { AuthLayout } from './Layout/AuthLayout';
import RutaProtegida from './Layout/RutaProtegida';

import Login from './pages/Login';
import Registrar from './pages/Registrar';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import AdministrarPacientes from './pages/AdministrarPacientes';
import EditarPerfil from './pages/EditarPerfil';
import CambiarPassword from './pages/CambiarPassword';


function App() {

  return (
   <HashRouter>
   <AuthProvider>
    <PacientesProvider>
      <Routes>
        <Route path='/#/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='registrar' element={<Registrar />} />
          <Route path='olvide-password' element={<OlvidePassword />} />
          <Route path='olvide-password/:token' element={<NuevoPassword />} />
          <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
        </Route>
        <Route path='/#/admin' element={<RutaProtegida />}>
          <Route index element={<AdministrarPacientes />} />
          <Route path='perfil' element={<EditarPerfil />} />
          <Route path='cambiar-password' element={<CambiarPassword />} />
        </Route>
      </Routes>
    </PacientesProvider>
   </AuthProvider>
   </HashRouter>
  )
}

export default App
