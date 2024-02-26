import { ComponentProps, FC, useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import useClasses from "@/hooks/useClasses";
import { Hours, calculateSunPositionForRadialGradient, calculateTheColorOfTheSkyForRadialGradient } from "./utils";

export interface BackgroundProps extends ComponentProps<"div"> {
  image?: 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'sunny' | 'windy';
  timeout?: number;
  hour?: number;
}

const Background: FC<BackgroundProps> = ({
  className,
  children,
  image='cloudy',
  timeout=1000,
  hour=6,
  ...props
}) => {

  const [prevImage, setPrevImage] = useState(image);
  const ref = useRef<HTMLDivElement>(null);
  const backgroundClassName = useClasses({
    classNames: [styles.background, className],
  });

  const handleAnimationClasses = () => {
    ref.current?.classList.add("fadeIn");
    setTimeout(() => {
      ref.current?.classList.remove("fadeIn");
      setPrevImage(image);
    }, timeout);
  }

  const handleAnimationDuration = useCallback((el: HTMLImageElement | null) => {
    if (!el) return;
    el.style.animationDuration = `${timeout+100}ms`;
  }, [timeout]);





  const handleGradientFilter = () => {
    if (!ref.current) return;
    const positionOfSunInRadialGradient = calculateSunPositionForRadialGradient(hour);
    const colorOfTheSkyForRadialGradient = calculateTheColorOfTheSkyForRadialGradient(hour as Hours);
    ref.current.style.setProperty('--sun-position', `radial-gradient(circle at ${positionOfSunInRadialGradient}, ${colorOfTheSkyForRadialGradient})`);
  };

  useEffect(handleGradientFilter, [hour]);

  useEffect(handleAnimationClasses, [image, timeout]);

  return (
    <div {...props} className={backgroundClassName} ref={ref}>
      <img className="prevImage" src={`/backgrounds/${prevImage}.webp`} alt={image} ref={handleAnimationDuration}/>
      <img className="image" src={`/backgrounds/${image}.webp`} alt={image} />
      <div className="overlay">
        {children}
      </div>
    </div>
  );
};

export default Background;
