import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { PrivateRoute } from "./common/PrivateRoute";
import AddNewPost from "pages/AddNewPost";
import EditPost from "pages/EditPost";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <AddNewPost />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <PrivateRoute>
            <EditPost />
          </PrivateRoute>
        }
      />
      {/* public routes */}
      <Route path="/sign-in" element={<Login />} />
    </Routes>
  );
}

export default App;
