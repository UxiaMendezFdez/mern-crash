import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Profile from "../pages/profile";
import App from "../App";
import PrivateRoute from "./privateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />}></Route>
      </Route>
    </Route>
  )
);

export default router;
