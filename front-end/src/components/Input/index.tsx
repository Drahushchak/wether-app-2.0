import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import useClasses from "@/hooks/useClasses";

export interface InputProps extends ComponentProps<"input"> {
  variant?: "standard" | "filled" | "outlined";
}

const Input: FC<InputProps> = ({className, variant="standard", ...props}) => {

  const inputClassName = useClasses({classNames: [styles.input, className], moduleClasses: {styles, classNames: [variant]}})

  return <input {...props} className={inputClassName}/>;
}

export default Input;
