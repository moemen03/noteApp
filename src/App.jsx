import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import NoteContextProvider from "./Context/NoteContext.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

function App() {
  const theme = "dark";
  // prop drilling
  const routes = createBrowserRouter([
    {
      path: "",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },

    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Register /> },
    { path: "*", element: <NotFound/> },
  ]);
  return (
    <>
      <UserContextProvider>
        <NoteContextProvider>
          <RouterProvider router={routes}></RouterProvider>
        </NoteContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
