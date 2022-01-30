import React, { ReactNode } from 'react';

import { HTMLMotionProps, motion } from 'framer-motion';
import styles from './styles.module.scss';
import { FiCheckCircle } from 'react-icons/fi';

interface SquareButton extends HTMLMotionProps<"button"> {
  children: ReactNode;
  layoutId?: string;
  onClickConfirmMode: () => void;
}

export function DoubleButton({children = null, onClickConfirmMode, ...rest}: SquareButton) {

  const [isConfirmMode, setIsConfirmMode] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {

    return () => {//cleanup
      setIsConfirmMode(false)
    }
  }, [])

  function handleChangeMode() {
    
    if (isConfirmMode) {
      onClickConfirmMode()
      setIsDeleting(true)
      return
    }

    setIsConfirmMode(true)

    setTimeout(() => {
      setIsConfirmMode(false)
    }, 2000)
  }

  return (
    <motion.button 
      layout
      className={styles.button__container}
      onClick={() => handleChangeMode()}
      data-mode={isConfirmMode && 'confirm'}
      whileTap={{
        scale: 0.9
      }}
      disabled={isDeleting}
      {...rest}
    >
      {
        isConfirmMode 
        ? (
          <FiCheckCircle size={15} />
        ) 
        : children
      }
    </motion.button>
  )
}