import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { FiPlus } from 'react-icons/fi';

import styles from './home.module.scss';

import { api } from '../services/api';;
import { fetchIndexers } from '../utils/fetchIndexers';

import { IndexDTO } from '../dtos/IndexDTO';
import { CreateIndexData } from '../dtos/CreateIndexDTO';
import { FilterDataDTO } from '../dtos/FilterDataDTO';
import { EditIndexerDTO } from '../dtos/EditIndexerDTO';

import { IndexerItem } from '../components/IndexerItem';
import { CTAButton } from '../components/CTAButton';
import { AddIndexerModal } from '../components/Modals/AddIndexerModal';
import { Filter } from '../components/Filter';
import { EditIndexerModal } from '../components/Modals/EditIndexerModal';

import { AnimateSharedLayout } from 'framer-motion';


interface HomeProps {
  indexers: {
    data: IndexDTO[]
  }
}

export default function Home({indexers}: HomeProps) {

  const [isAddIndexerModalOpen, setIsAddIndexerModalOpen] = React.useState(false)
  const [isEditIndexerModalOpen, setIsEditIndexerModalOpen] = React.useState(false)
  const [indexersList, setIndexersList] = React.useState(indexers.data)

  const [layoutIdEditIndexerModal, setLayoutIdEditIndexerModal] = React.useState("")
  const [editIndexerModalInitialData, setEditIndexerModalInitialData] = React.useState<IndexDTO>({} as IndexDTO)

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
      await refetchIndexersList()

    } catch (error) {
      console.log(error)
      alert("Não foi possível criar um novo indexador. Tente novamente!")

    }
  }

  function handleCloseEditIndexerModal() {
    setIsEditIndexerModalOpen(false)
  }

  function fetchIndexersByFilter({
    simbolo, 
    nome, 
    orderByDescending
  }: FilterDataDTO) {

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

  async function refetchIndexersList() {
    //create as async to works better with react-final-form
    await fetchIndexers({})
      .then(response => {
        const indexers = response.data
        setIndexersList(indexers.data)
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

      await refetchIndexersList()
    } catch (error) {
      console.log(error)
      alert("Não foi possível editar o Indexador. Tente novamente!")
    }
  }
  
  return (
    <AnimateSharedLayout>
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
                      layoutId={`modal-edit-indexer${indexer.id}`}
                      openEditModal={handleOpenEditModal}
                    />
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </AnimateSharedLayout>
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
