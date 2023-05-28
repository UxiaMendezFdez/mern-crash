import React, { useEffect } from "react";
import UserForm from "../components/userForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setUser } from "../slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();

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
      const res = await login(form).unwrap();
      console.log(res);
      dispatch(setUser({ ...res }));
      navigate("/");
      toast.success(`Welcome back ${res.name}!`, { hideProgressBar: true });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return <UserForm type="login" handleSubmit={handleSubmit}></UserForm>;
};

export default Login;
