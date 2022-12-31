import AppRoutes from "./AppRoutes";
import AuthProvider from "./contexts/AuthContext";
function App() {
  return<AuthProvider>
    <AppRoutes />
  </AuthProvider>
}
export default App;
