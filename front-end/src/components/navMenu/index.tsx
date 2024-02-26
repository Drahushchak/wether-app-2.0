import useClasses from "@/hooks/useClasses";
import { ComponentProps, FC } from "react";
import styles from './styles.module.scss';
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/user";

export interface NavMenuProps extends ComponentProps<'nav'>{

}

const NavMenu: FC<NavMenuProps> = ({className, ...props}) => {

  const dispatch = useAppDispatch();
  const searchInputClassName = useClasses({classNames: [styles.navMenu, className]});

  return (
    <nav {...props} className={searchInputClassName}>
      <ul>
        <li><Link to="/login" onClick={()=>dispatch(logout())}>Logout</Link></li>
      </ul>
    </nav>
  );
}

export default NavMenu;
