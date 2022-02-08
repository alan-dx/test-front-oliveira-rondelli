import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FiChevronDown, FiChevronUp, FiCornerDownRight, FiCornerDownLeft } from 'react-icons/fi';
import styles from './styles.module.scss';
import { TailSpin } from 'react-loader-spinner';
import { format } from 'date-fns';

import { findChildrenOfPlans } from '../../utils/findChildrensOfPlans';
import { AccountPlanDTO } from '../../dtos/AccountPLanDTO';

interface AccordionProps {
  children?: ReactNode;
  plan: AccountPlanDTO;
  findYourSon?: () => any;
}

export function Accordion({ plan, findYourSon }: AccordionProps) {

  const [isOpen, setIsOpen] = React.useState(false)
  const [hisSon, setHisSon] = React.useState(null)

  const [isFetching, setIsFetching] = React.useState(false)

  React.useEffect(() => {
    
    async function findSons() {

      setIsFetching(true)

      await findChildrenOfPlans(plan.id)
      .then((sons) => {
        const newSons = sons.map((son) => (
          <Accordion 
            key={son.id}
            plan={son}
            findYourSon={() => findChildrenOfPlans(son.id)} 
          />
        ))

        setHisSon(newSons)
      }).finally(() => {
        setIsOpen(true)
        setIsFetching(false)
      })
    }

    findSons()
  }, [])

  function toogleAccordion() {

    setIsOpen(prev => !prev)

    // if (!isOpen) {
    //   setIsFetching(true)
  
    //   findYourSon().then(sons => {
    //     const newSons = sons.map((son) => (
    //       <Accordion 
    //         key={son.id}
    //         plan={son}
    //         findYourSon={() => findChildrenOfPlans(son.id)} 
    //       />
    //     ))
  
    //     setHisSon(newSons)
    //   }).finally(() => setIsFetching(false))
    // }

    // if (son) {
    //   setHisSon(son)
    // }
  }

  return (
    <div className={styles.accordion_container}>
    <div className={styles.accordion_container__box}>
      <div className={styles.accordion_container__box__info_box}>
        <div>
          <span>
            {plan.id.toString().split("").join(".")}
            <label>CÓDIGO</label>
          </span>
          <span>
            {plan.identificacao}
            <label>IDENTIFICACÃO</label>
          </span>
          
          <span>{plan.tipo}<label>TIPO</label></span>
          <span>{format(new Date(plan.dataCadastro), 'dd/MM/yyyy')}<label>DATA DE CADASTRO</label></span>
          <span>{plan.holding.nome}<label>HOLDING</label></span>
        </div>
        <div className={styles.accordion_container__box__info_box__button_box} >
          {isFetching && (<TailSpin color="#c70000" height={20} width={20} ariaLabel='Carregando' />) } 
          {/* <button 
            onClick={toogleAccordion} 
            data-open={isOpen && "true"}
            disabled={isFetching}
          >
            {
              isOpen 
              ? <FiChevronUp size={15} />
              : <FiChevronDown size={15} />
            }
          </button> */}
        </div>
      </div>
      {
        <AnimatePresence>
        {
          isOpen && (
              <motion.div 
                animate={{
                  x: [-20, 0],
                  opacity: [0, 1]
                }}
                exit={{
                  x: [0, -20],
                  opacity: [1, 0]
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