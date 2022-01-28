import { HTMLMotionProps, motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface CTAButton extends HTMLMotionProps<"button"> {
  text: string;
  icon?: ReactNode;
  layoutId?: string;
  redColor?: boolean
}

export function CTAButton({text, icon = null, redColor = false, ...rest}: CTAButton) {
  return (
    <motion.button 
      className={styles.button__container}
      data-redcolor={redColor ? "true" : "false"}
      {...rest}
    >
      {icon}
      {text}
    </motion.button>
  )
}