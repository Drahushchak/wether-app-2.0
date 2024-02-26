import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import useClasses from "@/hooks/useClasses";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: "raised" | "outlined" | "gradient";
}

const Button: FC<ButtonProps> = ({variant, className, children,...props}) => {

  const buttonClassName = useClasses({classNames: [styles.button, className], moduleClasses: {styles, classNames: [variant]}})

  return <button {...props} className={buttonClassName}>{children}</button>;
}

export default Button;
