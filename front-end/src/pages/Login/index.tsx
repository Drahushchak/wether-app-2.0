import styles from "./styles.module.scss";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Separator from "@/components/Separator";
import { useNavigate } from "react-router-dom";
import FormCardPage from "@/components/FormCardPage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearLoginError, login } from "@/store/slices/user";
import { useRef, useEffect } from "react";
import { handleClearValidity } from "@/components/FormCardPage/utils";

function Login() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLFormElement>(null);
  const loginError = useAppSelector(state => state.user.loginError);
  const loggedInUser = useAppSelector(state => state.user.loggedInUser);

  const navigateToRegister = () => {
    navigate("/register")
  }

  const handleClearLoginError = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (loginError) {
      dispatch(clearLoginError());
    }
    handleClearValidity(e);
  }

  const displayError = () => {
    if (loginError) {
      const password = (ref.current!.elements.namedItem("password") as HTMLInputElement);
      password.setCustomValidity(loginError);
      password.reportValidity();
    }
  }

  const navigateToHome = () => {
    if (loggedInUser) {
      navigate("/home")
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(navigateToHome, [loggedInUser])

  useEffect(displayError, [loginError])


  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement);
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement);
    dispatch(login({
      email: email.value,
      password: password.value
    }));
  }

  return (
    <FormCardPage className={styles.login}>
        <h1>Back to see Weather</h1>
        <p>Enter your credentials to continue</p>
        <form ref={ref} onSubmit={handleLogin}>
          <Input onChange={handleClearLoginError} variant="filled" id="email" type="email" placeholder="Email" />
          <Input onChange={handleClearLoginError} variant="outlined" id="password" type="password" placeholder="Password" />
          <Button variant="raised" type="submit">Login</Button>
        </form>
        <Separator color="secondary">or</Separator>
        <Button variant="outlined" onClick={navigateToRegister}>Register</Button>
    </FormCardPage>
  );
}

export default Login;
