// import "./App.css";
// import AppRoutes from "./routes/AppRoutes";

// function App() {
//   return <AppRoutes />;
// }

// export default App;

import { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";

import socket from "./socket/socket";

import { useAuthStore } from "./store/auth.store";

function App() {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("Connected :", socket.id);

      socket.emit("join", user.id);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return <AppRoutes />;
}

export default App;
