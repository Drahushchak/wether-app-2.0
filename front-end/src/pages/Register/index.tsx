import styles from "./styles.module.scss";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Separator from "@/components/Separator";
import { useNavigate } from "react-router-dom";
import FormCardPage from "@/components/FormCardPage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { register } from "@/store/slices/user";
import { useEffect } from "react";
import { handleClearValidity } from "@/components/FormCardPage/utils";

function Register() {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const loggedInUser = useAppSelector(state => state.user.loggedInUser);

  const navigateToRegister = () => {
    navigate("/login")
  }

  const navigateToHome = () => {
    if (loggedInUser) {
      navigate("/home")
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(navigateToHome, [loggedInUser])

  const passwordValidation = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
  }

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement);
    const firstName = (e.currentTarget.elements.namedItem("firstName") as HTMLInputElement);
    const lastName = (e.currentTarget.elements.namedItem("lastName") as HTMLInputElement);
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement);
    const confirmPassword = (e.currentTarget.elements.namedItem("confirmPassword") as HTMLInputElement);

    const passwordError = passwordValidation(password.value);
    if (passwordError) {
      password.setCustomValidity(passwordError);
      password.reportValidity();
      return;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords do not match");
      confirmPassword.reportValidity();
      return;
    }

    dispatch(register({
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value
    }))

  }

  return (
    <FormCardPage className={styles.login}>
        <h1>First time to see Weather</h1>
        <p>Enter your account details</p>
        <form onSubmit={handleRegistration}>
          <Input onChange={handleClearValidity} variant="outlined" id="email" type="email" placeholder="Email" required/>
          <Input onChange={handleClearValidity} variant="outlined" id="firstName" type="text" placeholder="First Name" required/>
          <Input onChange={handleClearValidity} variant="outlined" id="lastName" type="text" placeholder="Last Name" required/>
          <Input onChange={handleClearValidity} variant="outlined" id="password" type="password" placeholder="Password" required/>
          <Input onChange={handleClearValidity} variant="outlined" id="confirmPassword" type="password" placeholder="Confirm Password" required/>
          <Button variant="raised" type="submit">Register</Button>
        </form>
        <Separator color="secondary">or</Separator>
        <Button variant="outlined" color="secondary" onClick={navigateToRegister}>Login</Button>
    </FormCardPage>
  );
}

export default Register;
