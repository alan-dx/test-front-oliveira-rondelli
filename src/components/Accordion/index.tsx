import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FiChevronDown, FiChevronUp, FiCornerDownRight, FiCornerDownLeft } from 'react-icons/fi';
import styles from './styles.module.scss';

interface AccordionProps {
  children?: ReactNode;
  title?: string;
  findYourSon?: () => any;
}

export function Accordion({ title = "Test", findYourSon }: AccordionProps) {

  const [isOpen, setIsOpen] = React.useState(false)
  const [hisSon, setHisSon] = React.useState(null)

  function toogleAccordion() {
    setIsOpen(prev => !prev)
    const son = findYourSon()

    if (son) {
      setHisSon(son)
    }
  }

  return (
    <div className={styles.accordion_container}>
    <div className={styles.accordion_container__box}>
      <div className={styles.accordion_container__box__title_box}>
        <h1>{title}</h1>
        {
        <span onClick={toogleAccordion} data-open={isOpen && "true"}>
          {
            isOpen 
            ? <FiChevronUp size={15} />
            : <FiChevronDown size={15} />
          }
          
        </span>
        }
      </div>
      {
        <AnimatePresence>
        {
          isOpen && (
              <motion.div 
                animate={{
                  y: [-3, 0]
                }}
                exit={{
                  y: -3,
                }}
                className={styles.accordion_container__box__dropdown} >
                {hisSon}
              </motion.div>
          )
        }
          </AnimatePresence>
      }
    </div>
  </div>
  )
}