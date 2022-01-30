import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';
import { HTMLMotionProps, motion } from 'framer-motion';

interface SquareButton extends HTMLMotionProps<"button"> {
  children: ReactNode;
  layoutId?: string;
  redColor?: boolean
}

export function SquareButton({children = null, redColor = false, ...rest}: SquareButton) {
  return (
    <motion.button 
      className={styles.button__container}
      data-redcolor={redColor ? "true" : "false"}
      {...rest}
    >
      {children}
    </motion.button>
  )
}