import { ComponentProps, FC, forwardRef } from "react";
import styles from "./styles.module.scss";
import useClasses from "@/hooks/useClasses";

export interface CardProps extends ComponentProps<"div"> {
}

const Card = forwardRef<HTMLDivElement, CardProps>(({className,...props}, ref) => {

  const cardClassName = useClasses({classNames: [styles.card, ...(className ? [className] : [])]})

  return <div {...props} className={cardClassName} ref={ref}>{props.children}</div>;
});

export default Card;
