import { ComponentProps, FC, useMemo } from "react";
import styles from "./styles.module.scss";

interface SeparatorProps extends ComponentProps<"div"> {
}

const Separator: FC<SeparatorProps> = ({children, className, ...props}) => {


  const separatorClassName = useMemo(() => {
    return [styles.separator, className].filter(Boolean).join(" ");
  }, [className]);

  return <div {...props} className={separatorClassName}>
    {children && <div className="content">{children}</div>}
  </div>;
}

export default Separator;
