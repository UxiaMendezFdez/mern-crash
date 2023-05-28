import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { clearUser } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //check if we are already logged in
  const { user } = useSelector((state) => state.auth);

  const [logout, { isLoading, error }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearUser());
      navigate("/");
      toast.info("You are now logged out", { hideProgressBar: true });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Posts App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Collapse>
            <Nav className="ms-auto">
              {user ? (
                <NavDropdown
                  title={
                    <>
                      <FaUser className="nav-user-icon" />
                      {user?.name}
                    </>
                  }
                  id="basic-nav-dropdown"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>Log In</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
