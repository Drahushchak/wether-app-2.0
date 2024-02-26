import Card from "@/components/Card";
import styles from "./styles.module.scss";
import { ComponentProps, FC } from "react";
import useClasses from "@/hooks/useClasses";

export interface FromCardPageProps extends ComponentProps<'div'> {

}

const Login: FC<FromCardPageProps> = ({className, children, ...props}) => {

  const formCardPageClassName = useClasses({classNames: [styles.formCardPage, ...(className ? [className] : [])]})

  return (
    <div {...props} className={formCardPageClassName}>
      <Card className="formCard">
        {children}
      </Card>
    </div>
  );
}

export default Login;
