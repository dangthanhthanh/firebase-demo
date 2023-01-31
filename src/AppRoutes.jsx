import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { UpdateProfile } from "./pages/updateProfile/UpdateProfile";
import MainLayout from "./layout/MainLayout";
import ShareMoviePage from "./pages/ShareMoviePage";
import YoutubeProvider from "./contexts/YoutubeContext";
import HomePage from "./pages/HomePage";
const RequiredAuth=({children})=>{
  const {currentUser}=useContext(AuthContext)
  const location=useLocation()
  if(!currentUser)return <Navigate to="/login"/>;
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
  return (
    <BrowserRouter>
      <Routes>
        <Route element={
        <YoutubeProvider>
          <MainLayout/>
          </YoutubeProvider>
          }>
          <Route
            path="/"
            element={
              <RequiredAuth>
                <HomePage/>
              </RequiredAuth>
            }
          />
          <Route path="/sharemovie" element={
            <RequiredAuth>
              <ShareMoviePage/>
            </RequiredAuth>
          } />
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
