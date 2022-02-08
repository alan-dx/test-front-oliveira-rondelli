import React from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import { TailSpin } from 'react-loader-spinner';

import styles from './styles.module.scss';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { api } from '../../services/api';
import Head from 'next/head';

import { AccountPlanDTO } from '../../dtos/AccountPLanDTO';
import { FilterAccountPlansDataDTO } from '../../dtos/FilterAccountPlansDataDTO';

import { Accordion } from '../../components/Accordion';
import { PagesList } from '../../components/PageSelector/PagesList';
import { FilterAccountPlans } from '../../components/FilterAccountPlans';

import { fetchPlans, FetchPlansParams } from '../../utils/fetchPlans';
import { findChildrenOfPlans } from '../../utils/findChildrensOfPlans';

type PlansData = {
  data: AccountPlanDTO[]
}

interface PlanoContasProps {
  plans: PlansData,
  numberOfPages: number
}

export default function PlanoContas({ plans, numberOfPages }: PlanoContasProps) {
  
  const [listOfFatherPlans, setListOfFatherPlans] = React.useState<AccountPlanDTO[]>(plans.data.filter(plan => plan.parentPlanoConta === null))

  const [pagesNumber, setPagesNumber] = React.useState(numberOfPages)
  const [currentPage, setCurrentPage] = React.useState(1)

  const [isFetching, setIsFetching] = React.useState(false)

  const [filterData, setFilterData] = React.useState<FetchPlansParams>(null)

  async function changePagination(page: number) {
    try {

      setIsFetching(true)
      setCurrentPage(page)

      const response = await fetchPlans(filterData ? {...filterData, page} : {page})
      const newPlans: PlansData = response.data

      setPagesNumber(Math.ceil(Number(response.headers['x-total-count'])/10))

      if (filterData) {
        if (!filterData.identificacao) {
          setListOfFatherPlans(
            newPlans.data.filter(plan => plan.parentPlanoConta === null)
          )
        } else {
          setListOfFatherPlans(newPlans.data)
        } 
      } else {
        setListOfFatherPlans(
          newPlans.data.filter(plan => plan.parentPlanoConta === null)
        )
      }

      // setListOfFatherPlans(newPlans.data.filter(plan => plan.parentPlanoConta === null))

      setIsFetching(false)
    } catch (error) {
      console.log(error)
      alert("Não foi possível realizar a paginação, tente novamente!")
    }

  }

  async function clearFilter() {
    try {

      setIsFetching(true)
      setFilterData(null)
      setCurrentPage(1)
  
      const response = await fetchPlans({})
      
      setPagesNumber(Math.ceil(Number(response.headers['x-total-count'])/10))
      setListOfFatherPlans(response.data.data.filter(plan => plan.parentPlanoConta === null))
      setIsFetching(false)
    } catch (error) {
      console.log(error)
      alert("Não foi possível limpar o filtro, tente novamente.")
    }

  }

  async function fetchPlansByFilter({
    identificacao,
    tipo,
    orderByDescending
  }: FilterAccountPlansDataDTO) {
    try {

      orderByDescending = orderByDescending == "new" ? true : false
      setIsFetching(true)
      setFilterData({identificacao, tipo, orderByDescending})
      setCurrentPage(1)

      fetchPlans({
        identificacao,
        tipo,
        orderByDescending
      }).then((response) => {
        setPagesNumber(Math.ceil(Number(response.headers['x-total-count'])/10))
        
        if (!identificacao) {
          setListOfFatherPlans(
            response.data.data.filter(plan => plan.parentPlanoConta === null)
          )
        } else {
          setListOfFatherPlans(response.data.data)
        } 
        //aplicar lógica de listagem aqui
        // componentes pais são os que possuem o id com menor length
      }).finally(() => {
        setIsFetching(false)
      })

    } catch (error) {
      console.log(error)
      alert("Não foi possível realizar a busca, verifique os campos e tente novamente!")
    }
  }

  return (
    <AnimateSharedLayout>
      <Head>
        <title>Plano Gestor | Oliveira {"&"} Rondelli</title>
      </Head>
      <div className={styles.account_plans__container}>
        <h1 className={styles.account_plans__container__module_title}>
          PLANO GESTOR
          <small className={styles.account_plans__container__module_title__company}>Oliveira {"&"} Rondelli</small>
        </h1>
        <div className={styles.account_plans__container__main}>
          <h1 className={styles.account_plans__container__main__title}>
            Plano Contas
            {
                isFetching && (
                  <TailSpin color="#c70000" height={25} width={25} ariaLabel='Carregando' />
                )
              }
          </h1>
          <FilterAccountPlans 
            clearFilter={clearFilter} 
            fetchPlansByFilter={fetchPlansByFilter} 
          />
          <div className={styles.account_plans__container__main__accordions_box} >
            {listOfFatherPlans[0] ? 
              listOfFatherPlans.map(plan => (
                <Accordion 
                  key={plan.id}
                  plan={plan}
                />
              )) : (
                <h1 
                  className={styles.account_plans__container__main__accordions_box__not_found}
                >
                  PLANO CONTA NÃO ENCONTRADO.
                </h1>
              )
            }
            {}
          </div>

          <PagesList
            changePagination={changePagination}
            numberOfPages={pagesNumber}
            currentPage={currentPage} 
          />
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