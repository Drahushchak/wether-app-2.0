import useClasses from "@/hooks/useClasses";
import { ComponentProps, FC } from "react";
import styles from './styles.module.scss';
import LogoIcon from "@/assets/logo.svg";
import { Link } from "react-router-dom";

export interface LogoProps extends Omit<ComponentProps<typeof Link>, "to"> {

}

const Logo: FC<LogoProps> = ({className, ...props}) => {

  const logoClassName = useClasses({classNames: [styles.logo, className]});

  return (
    <Link {...props} className={logoClassName} to="/home">
      <h1>Weatherly</h1>
      <img src={LogoIcon} alt="Logo" />
    </Link>
  );
}

export default Logo;
