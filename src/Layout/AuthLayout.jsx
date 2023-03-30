import { Outlet } from "react-router-dom"
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';

export const AuthLayout = () => {

  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Divide by 1000 to convert to seconds
    if (decodedToken.exp < currentTime) {
      // Token has expired, clear localStorage and redirect to login
      localStorage.removeItem('token');
      return <Navigate to="/" />;
    } else {
      // Token is still valid, redirect to admin area
      return <Navigate to="/admin" />;
    }
  }

  return (
    <>
      <main 
        className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center"
      >
        <Outlet />
      </main>
    </>
  )
}
