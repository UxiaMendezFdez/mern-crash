import React, { useEffect } from "react";
import UserForm from "../components/userForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setUser } from "../slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading, error }] = useRegisterMutation();

  //check if we are already logged in
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      //we are logged in, so redirect to home
      navigate("/");
    }
  }, [navigate, user]);

  const handleSubmit = async (form) => {
    try {
      const res = await register(form).unwrap();
      dispatch(setUser({ ...res }));
      navigate("/");
      toast.success(`Welcome ${res.name}!`, { hideProgressBar: true });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <UserForm
      type="register"
      handleSubmit={handleSubmit}
      loading={isLoading}
    ></UserForm>
  );
};

export default Register;
