import React from 'react';
import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { FiPlus } from 'react-icons/fi';

import styles from './home.module.scss';

import { api } from '../services/api';;
import { fetchIndexers, FetchIndexersParams } from '../utils/fetchIndexers';

import { IndexDTO } from '../dtos/IndexDTO';
import { CreateIndexData } from '../dtos/CreateIndexDTO';
import { FilterDataDTO } from '../dtos/FilterDataDTO';
import { EditIndexerDTO } from '../dtos/EditIndexerDTO';

import { IndexerItem } from '../components/IndexerItem';
import { CTAButton } from '../components/CTAButton';
import { AddIndexerModal } from '../components/Modals/AddIndexerModal';
import { Filter } from '../components/Filter';
import { EditIndexerModal } from '../components/Modals/EditIndexerModal';
import { PagesList } from '../components/PageSelector/PagesList';

import { AnimateSharedLayout } from 'framer-motion';
import { TailSpin } from 'react-loader-spinner';

interface HomeProps {
  indexers: {
    data: IndexDTO[]
  },
  numberOfPages: number
}

export default function Home({indexers, numberOfPages}: HomeProps) {

  const [isAddIndexerModalOpen, setIsAddIndexerModalOpen] = React.useState(false)
  const [isEditIndexerModalOpen, setIsEditIndexerModalOpen] = React.useState(false)
  const [indexersList, setIndexersList] = React.useState(indexers.data)
  const [isFetching, setIsFetching] = React.useState(false)


  const [layoutIdEditIndexerModal, setLayoutIdEditIndexerModal] = React.useState("")
  const [editIndexerModalInitialData, setEditIndexerModalInitialData] = React.useState<IndexDTO>({} as IndexDTO)

  const [filterData, setFilterData] = React.useState<FetchIndexersParams>(null)

  const [pagesNumber, setPagesNumber] = React.useState(numberOfPages)
  const [currentPage, setCurrentPage] = React.useState(1)


  function handleCloseAddIndexerModal() {
    setIsAddIndexerModalOpen(false)
  }

  async function createNewIndexer({ simbolo, nome }: CreateIndexData) {
    try {
      
      await api.post('/indexadores', {
        simbolo,
        nome
      })
      setIsAddIndexerModalOpen(false)
      await refetchIndexersList(filterData ? {...filterData, page: currentPage} : {page: currentPage})

    } catch (error) {
      console.log(error)
      alert("Não foi possível criar um novo indexador. Tente novamente!")

    }
  }

  function handleCloseEditIndexerModal() {
    setIsEditIndexerModalOpen(false)
  }

  async function fetchIndexersByFilter({
    simbolo, 
    nome, 
    orderByDescending
  }: FilterDataDTO) {

    try {
      orderByDescending = orderByDescending == "new" ? true : false
      1
      setFilterData({simbolo, nome, orderByDescending})
      setCurrentPage(1)
      
      await refetchIndexersList({
        nome,
        simbolo,
        orderByDescending,
      })

    } catch (error) {
      console.log(error)
      alert("Não foi possível realizar a busca, verifique os campos e tente novamente!")
    }


  }

  function deleteIndexer(id: number) {
    api.delete(`/indexadores/${id}`)
    .then(response => {
      const newIndexersList = indexersList.filter(indexer => id !== indexer.id)
      setIndexersList(newIndexersList)
      refetchIndexersList(filterData ? {...filterData, page: currentPage} : {page: currentPage})
    }).catch(err => {
      console.error(err)
      alert("Não foi possível deletar esse indexador. Tente novamente!")
    })

  }

  function handleOpenEditModal(id: number) {
    setEditIndexerModalInitialData(indexersList.find(indexer => indexer.id == id))
    setLayoutIdEditIndexerModal(`modal-edit-indexer${id}`)
    
    setIsEditIndexerModalOpen(true)
  }

  async function editIndexer({nome, simbolo, id}: EditIndexerDTO) {
    try {

      await api.patch(`/indexadores/${id}`, {
        simbolo,
        nome
      })

      setIsEditIndexerModalOpen(false)

      await refetchIndexersList(filterData ? {...filterData, page: currentPage} : {page: currentPage})
    } catch (error) {
      console.log(error)
      alert("Não foi possível editar o Indexador. Tente novamente!")
    }
  }

  async function clearFilter() {
    setFilterData(null)
    setCurrentPage(1)

    await refetchIndexersList({})
  }

  async function changePagination(page: number) {
    setCurrentPage(page)
    refetchIndexersList(filterData ? {...filterData, page} : {page})
  }

  async function refetchIndexersList(params: FetchIndexersParams) {
    //create as async to works better with react-final-form
    setIsFetching(true)
    await fetchIndexers(params)
    .then(response => {
      const indexers = response.data
      setIndexersList(indexers.data)
      const pages = Math.ceil(Number(response.headers['x-total-count'])/10)
      setPagesNumber(pages)
    })
    .finally(() => {
      setIsFetching(false)
    })
  }

  return (
    <AnimateSharedLayout>
      <Head>
        <title>Plano Gestor | Oliveira {"&"} Rondelli</title>
      </Head>
      <AddIndexerModal 
          closeModal={handleCloseAddIndexerModal} 
          isOpen={isAddIndexerModalOpen}
          layoutId='modal-add-indexer'
          createNewIndexer={createNewIndexer} 
        />
      <EditIndexerModal 
        closeModal={handleCloseEditIndexerModal}
        isOpen={isEditIndexerModalOpen}
        layoutId={layoutIdEditIndexerModal}
        editIndexer={editIndexer}
        initialData={editIndexerModalInitialData}       
      />
      <div className={styles.main__container}>
        <h1 className={styles.main__container__module_title}>
          PLANO GESTOR
          <small className={styles.main__container__module_title__company}>Oliveira {"&"} Rondelli</small>
        </h1>
        <div className={styles.main__container__indexers_box}>
          <div className={styles.main__container__indexers_box__header}>
            <h1 className={styles.main__container__indexers_box__header__title}>
              Indexadores
              {
                isFetching && (
                  <TailSpin color="#c70000" height={25} width={25} ariaLabel='Carregando' />
                )
              }
            </h1>
            <CTAButton 
              layout 
              layoutId='modal-add-indexer'
              text="Criar Novo" 
              icon={<FiPlus />}
              onClick={() => setIsAddIndexerModalOpen(true)}
            />
          </div>
          <Filter
            clearFilter={clearFilter} 
            fetchIndexersByFilter={fetchIndexersByFilter}
          />
          {
            indexersList[0] ? (
              <table className={styles.main__container__indexers_box__table}>
                <thead>
                  <tr>
                    <th>
                      NOME
                    </th>
                    <th>
                      SÍMBOLO
                    </th>
                    <th>
                      DATA DE CADASTRO
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    indexersList.map(indexer => {
                      return (
                        <IndexerItem
                          key={indexer.id}
                          indexer={indexer} 
                          deleteIndexer={deleteIndexer}
                          layoutId={`modal-edit-indexer${indexer.id}`}
                          openEditModal={handleOpenEditModal}
                        />
                      )
                    })
                  }
                </tbody>
              </table>
            ) : (
              <h1 className={styles.main__container__indexers_box__not_found} >Indexador não encontrado.</h1>
            )
          }
          {
            indexersList && (
              <PagesList
                numberOfPages={pagesNumber} 
                currentPage={currentPage}
                changePagination={changePagination}
              />
            )
          }
        </div>
      </div>
    </AnimateSharedLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

  const response = await api.get('/indexadores')

  const indexers = response.data
  const numberOfPages = Math.ceil(Number(response.headers['x-total-count'])/10)

  return {
    props: {
      indexers,
      numberOfPages
    }
  }
}
