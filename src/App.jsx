import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import AppRoutes from "./AppRoutes";
import { auth } from "./libs/firebase";
import { Spinner } from "reactstrap";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("user: " + user);
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });
  }, []);

  return isLoading ? <Spinner /> : <AppRoutes currentUser={currentUser}/>;
}

export default App;
