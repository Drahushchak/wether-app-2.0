import useClasses from "@/hooks/useClasses";
import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import Logo from "@/components/Logo";
import SearchInput from "@/components/SearchInput";
import NavMenu from "@/components/navMenu";
import AnimatedMenuIcon from "@/components/AnimatedMenuIcon";

export interface HeaderProps extends ComponentProps<'header'> {

}

const Header: FC<HeaderProps> = ({className, ...props}) => {

  const headerClassName = useClasses({classNames: [styles.header, ...(className ? [className] : [])]})

  return (
    <header {...props} className={headerClassName}>
      <div className="container">
        <div className="leftContent">
          <Logo />
          <SearchInput className="responsiveSearch"/>
        </div>
      <div className="rightContent">
        <AnimatedMenuIcon height={32} width={32} className="hidable" />
        <NavMenu className="headerNavMenu"/>
      </div>
      </div>
    </header>
  );
}

export default Header;
