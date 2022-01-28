import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { FiPlus } from 'react-icons/fi';

import styles from './home.module.scss';

import { api } from '../services/api';;

import { IndexDTO } from '../dtos/IndexDTO';
import { CreateIndexData } from '../dtos/CreateIndexDTO';

import { IndexerItem } from '../components/IndexerItem';
import { CTAButton } from '../components/CTAButton';
import { AddIndexerModal } from '../components/Modals/AddIndexerModal';
import { fetchIndexers } from '../utils/fetchIndexers';
import { Filter } from '../components/Filter';
import { FilterDataDTO } from '../dtos/FilterDataDTO';

interface HomeProps {
  indexers: {
    data: IndexDTO[]
  }
}

export default function Home({indexers}: HomeProps) {

  const [isAddIndexerModalOpen, setIsAddIndexerModalOpen] = React.useState(false)
  const [indexersList, setIndexersList] = React.useState(indexers.data)

  // const [simbolo, setSimbolo] = React.useState('')
  // const [nome, setNome] = React.useState('')
  // const [orderByDescending, setOrderByDescending] = React.useState(false)
  // const [isFiltered, setIsFiltered] = React.useState(false)

  function handleCloseAddIndexerModal() {
    setIsAddIndexerModalOpen(false)
  }

  function createNewIndexer({ simbolo, nome }: CreateIndexData) {
    setIsAddIndexerModalOpen(false)
    
    api.post('/indexadores', {
      simbolo,
      nome
    }).then((response) => {
      return fetchIndexers({})
    })
    .then(response => {
      const indexers = response.data
      setIndexersList(indexers.data)
    })
    .catch(err => {
      console.log(err)
      alert("Não foi possível criar um novo indexador. Tente novamente!")
    })
  }

  function fetchIndexersByFilter({
    simbolo, 
    nome, 
    orderByDescending
  }: FilterDataDTO) {
    console.log('asdas')

    fetchIndexers({
      nome,
      simbolo,
      orderByDescending
    })
    .then(response => {
      const indexers = response.data

      setIndexersList(indexers.data)
    })
  }

  function deleteIndexer(id: number) {
    api.delete(`/indexadores/${id}`)
    .then(response => {
      const newIndexersList = indexersList.filter(indexer => id !== indexer.id)
      setIndexersList(newIndexersList)
      refetchIndexersList()
    }).catch(err => {
      console.error(err)
      alert("Não foi possível deletar esse indexador. Tente novamente!")
    })

  }

  // function handleClearFilter() {
  //   setSimbolo('')
  //   setNome('')
  //   setOrderByDescending(false)

  //   fetchIndexers({})
  //   .then(response => {
  //     const indexers = response.data
  //     setIndexersList(indexers.data)
  //     setIsFiltered(false)
  //   })
  // }

  function refetchIndexersList() {
    fetchIndexers({})
    .then(response => {
      const indexers = response.data
      setIndexersList(indexers.data)
    })
  }
  
  return (
    <>
      <AddIndexerModal 
        closeModal={handleCloseAddIndexerModal} 
        isOpen={isAddIndexerModalOpen} 
        layoutId='modal-add-indexer'
        createNewIndexer={createNewIndexer} 
      />
      <div className={styles.main__container}>
        <h1 className={styles.main__container__module_title}>
          PLANO GESTOR
        </h1>
        <div className={styles.main__container__indexers_box}>
          <div className={styles.main__container__indexers_box__header}>
            <h1 className={styles.main__container__indexers_box__header__title}>
              Indexadores
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
            clearFilter={refetchIndexersList} 
            fetchIndexersByFilter={fetchIndexersByFilter}
          />
          <table className={styles.main__container__indexers_box__table}>
            <thead>
              <tr>
                <th>
                  SÍMBOLO
                </th>
                <th>
                  NOME
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
                    />
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

  const {data: indexers} = await api.get('/indexadores')

  return {
    props: {
      indexers
    }
  }
}
