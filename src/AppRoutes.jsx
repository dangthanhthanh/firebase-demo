import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { UpdateProfile } from "./pages/updateProfile/UpdateProfile";
import MainLayout from "./layout/MainLayout";
const RequiredAuth=({children})=>{
  const {currentUser}=useContext(AuthContext)
  const location=useLocation()
  if(!currentUser)return <Navigate to="/login"/>;
  console.log(currentUser)
  if(location.pathname !== '/update-profile' 
  && !currentUser.displayName 
  && !currentUser.photoURL){
    return<Navigate to='/update-profile'/>
  }
  return children;
}
const NoRequiredAuth=({children})=>{
  const {currentUser}=useContext(AuthContext);
  if(currentUser)
  return <Navigate to="/"/>;
  return children;
}
const AppRoutes = () => {
const {currentUser} = useContext(AuthContext)
console.log(currentUser)
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route
            path="/"
            element={
              <RequiredAuth>
                <HomePage/>
              </RequiredAuth>
            }
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={
            <NoRequiredAuth>
              <LoginPage/>
            </NoRequiredAuth>
          } />
          <Route path="/register" element={
            <NoRequiredAuth>
              <RegisterPage/>
            </NoRequiredAuth>
          } />
        </Route>
          <Route path="update-profile" element={
           <RequiredAuth>
            <UpdateProfile/>
          </RequiredAuth>
      } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
