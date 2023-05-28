import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { Container } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer autoClose={2000} theme="dark" />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
