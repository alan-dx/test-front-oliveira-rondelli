import React from 'react';
import { AnimateSharedLayout } from 'framer-motion';

import styles from './styles.module.scss';
import { Accordion } from '../../components/Accordion';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { api } from '../../services/api';

import { AccountPlanDTO } from '../../dtos/AccountPLanDTO';

interface PlanoContasProps {
  plans: {
    data: AccountPlanDTO[]
  } 
}

export default function PlanoContas({ plans }: PlanoContasProps) {
  
  const [listOfFatherPlans, setListOfFatherPlans] = React.useState<AccountPlanDTO[]>(plans.data.filter(plan => plan.parentPlanoConta === null))

  function findChildrenOfPlans(id: number) {
    // const son = plans.data.find(plan => plan.parentPlanoConta?.id === id)
    // // console.log(son)
    // getPlans()
    const son2 = plans.data.filter(plan => plan.parentPlanoConta?.id === id)

    // return api.get(`/planocontas?nivelSuperior=${id}`).then((response) => {
    //   const plans = response.data.data.filter(plan => plan.parentPlanoConta?.id === id)
    //   return plans
    // })



    if (son2) {
      return son2.map((son) => (
        <Accordion 
          key={son.id}
          title={`${son.id.toString().split("").join(".")} (${son.identificacao})`} 
          findYourSon={() => findChildrenOfPlans(son.id)} 
        />
      )) 
    }

    return null
  }

  async function getPlans() {
    const response = await api.get('/planocontas')
    console.log(response.data)
  }

  return (
    <AnimateSharedLayout>
      <div className={styles.challenge2__container}>
        <div className={styles.challenge2__container__main}>
          {/* <Accordion>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </Accordion> */}
          {listOfFatherPlans.map(plan => (
            <Accordion 
              key={plan.id} 
              title={`${plan.id.toString().split("").join(".")} (${plan.identificacao})`}
              findYourSon={() => findChildrenOfPlans(plan.id)}
            />
          ))}
        </div>
      </div>
    </AnimateSharedLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

  const response = await api.get('/planocontas')

  const plans = response.data
  const numberOfPages = Math.ceil(Number(response.headers['x-total-count'])/10)

  return {
    props: {
      plans,
      numberOfPages
    }
  }
}