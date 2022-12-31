import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
const RequiredAuth=({children, currentUser})=>{
  console.log(currentUser)
  if(!currentUser){return <Navigate to="/login"/>;}
  return children;
}
const NoRequiredAuth=({children, currentUser})=>{
  console.log(currentUser)
  if(currentUser){return <Navigate to="/"/>;}
  return children;
}
const AppRoutes = ({currentUser}) => {
  console.log(currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequiredAuth currentUser={currentUser}>
              <HomePage/>
            </RequiredAuth>
          }
        />
        {/* <Route element={<MainLayout />}>
          <Route index path="/" element={<HomePage />} />
        </Route> */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={
            <NoRequiredAuth currentUser={currentUser}>
              <LoginPage/>
            </NoRequiredAuth>
          } />
          <Route path="register" element={
            <NoRequiredAuth currentUser={currentUser}>
              <RegisterPage/>
            </NoRequiredAuth>
          } />

          {/* <Route path="register" element={<Register />} /> */}
          {/* <Route path="handler/:mode" element={<EmailActionHandler />} /> */}
        </Route>
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
