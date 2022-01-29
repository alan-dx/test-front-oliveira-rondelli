import { ReactNode } from 'react';
import styles from './styles.module.scss';

import { motion, HTMLMotionProps } from 'framer-motion';

interface PageButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
}

export function PageButton({children = null, ...rest}: PageButtonProps) {
  return (
    <motion.button 
        className={styles.page_button__container}
      {...rest}
    >
      {children}
    </motion.button>
  )
}