import { ComponentProps, FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import useClasses from "@/hooks/useClasses";
import Card from "@/components/Card";

export interface LocaleCardProps extends Omit<ComponentProps<typeof Card>, 'children'> {
  country: string;
  timezone: string;
}

const LocaleCard: FC<LocaleCardProps> = ({className, country, timezone, ...props}) => {

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const localeCardClassName = useClasses({classNames: [styles.localeCard, className]})

  return <Card {...props} className={localeCardClassName}>
      <h2>{country}</h2>
      <p>{date.toLocaleString('en-EN', {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      })}</p>
      <span>
        {date.toLocaleString('en-EN', {
          timeZone: timezone,
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </span>
    </Card>;
}

export default LocaleCard;
