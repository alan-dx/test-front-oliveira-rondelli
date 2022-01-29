import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';

interface SquareButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  layoutId?: string;
  redColor?: boolean
}

export function SquareButton({children = null, redColor = false, ...rest}: SquareButton) {
  return (
    <button 
      className={styles.button__container}
      data-redcolor={redColor ? "true" : "false"}
      {...rest}
    >
      {children}
    </button>
  )
}