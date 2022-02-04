import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FiChevronDown, FiChevronUp, FiCornerDownRight, FiCornerDownLeft } from 'react-icons/fi';
import styles from './styles.module.scss';
import { findChildrenOfPlans } from '../../pages/planocontas';
import { TailSpin } from 'react-loader-spinner';

interface AccordionProps {
  children?: ReactNode;
  title?: string;
  findYourSon?: () => any;
}

export function Accordion({ title = "Test", findYourSon }: AccordionProps) {

  const [isOpen, setIsOpen] = React.useState(false)
  const [hisSon, setHisSon] = React.useState(null)

  const [isFetching, setIsFetching] = React.useState(false)

  function toogleAccordion() {
    
    setIsOpen(prev => !prev)

    if (!isOpen) {
      setIsFetching(true)
  
      findYourSon().then(sons => {
        const newSons = sons.map((son) => (
          <Accordion 
            key={son.id}
            title={`${son.id.toString().split("").join(".")} (${son.identificacao})`} 
            findYourSon={() => findChildrenOfPlans(son.id)} 
          />
        ))
  
        setHisSon(newSons)
      }).finally(() => setIsFetching(false))
    }

    // if (son) {
    //   setHisSon(son)
    // }
  }

  return (
    <div className={styles.accordion_container}>
    <div className={styles.accordion_container__box}>
      <div className={styles.accordion_container__box__title_box}>
        <h1>
          {title} 
          {isFetching && (<TailSpin color="#c70000" height={25} width={25} ariaLabel='Carregando' />) } 
        </h1>
        <button 
          onClick={toogleAccordion} 
          data-open={isOpen && "true"}
          disabled={isFetching}
        >
          {
            isOpen 
            ? <FiChevronUp size={15} />
            : <FiChevronDown size={15} />
          }
        </button>
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