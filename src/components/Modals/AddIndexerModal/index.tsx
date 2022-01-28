import React, { FormEvent } from 'react';
import styles from './styles.module.scss';

import { CreateIndexData } from '../../../dtos/CreateIndexDTO';

import { AnimatePresence, motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi';
import { CTAButton } from '../../CTAButton';

interface AddIndexerModal {
  isOpen: boolean;
  layoutId: string;
  closeModal: () => void;
  createNewIndexer: ({simbolo, nome}: CreateIndexData) => void;
}

export function AddIndexerModal({isOpen, layoutId, closeModal, createNewIndexer}: AddIndexerModal) {

  const [simbolo, setSimbolo] = React.useState('')
  const [nome, setNome] = React.useState('')

  function handleCreateNewIndexer(event: FormEvent) {
    event.preventDefault()
    if (!nome || !simbolo) {
      alert("Preencha todos os campos!")
      return
    }

    createNewIndexer({nome, simbolo})

  }

  return (
    <AnimatePresence>
      {
        isOpen && (
        <>
          <motion.div 
            className={styles.overlay}
            onClick={closeModal}
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3
              }
            }}
            exit={{
              opacity: 0
            }}
          />
          <div className={styles.modal_content_container}>
            <motion.div 
              layout 
              layoutId={layoutId} 
              className={styles.modal_content_container__content}
            >
              <div 
                className={styles.modal_content_container__content__header} 

              >
                <h1 
                  className={styles.modal_content_container__content__header__title}
                >
                  CRIAR NOVO INDEXADOR
                </h1>
                <i className={styles.modal_content_container__content__header__icon} >
                  <FiPlus />
                </i>
              </div>
              <form 
                className={styles.modal_content_container__content__main} 
                onSubmit={handleCreateNewIndexer}
              >
              <div className={styles.modal_content_container__content__main__inputs}>
                <div className={styles.modal_content_container__content__main__inputs__input_box}>
                  <input
                    className={styles.modal_content_container__content__main__inputs__input_box__input}
                    type="text"
                    value={simbolo}
                    onChange={e => setSimbolo(e.target.value)}
                    id="simbolo"
                  />
                  <label 
                    htmlFor="simbolo"
                    className={styles.modal_content_container__content__main__inputs__input_box__label}
                  >
                    SÍMBOLO
                  </label>
                </div>
                <div className={styles.modal_content_container__content__main__inputs__input_box}>
                  <input
                    className={styles.modal_content_container__content__main__inputs__input_box__input}
                    type="text" 
                    value={nome} 
                    onChange={e => setNome(e.target.value)}
                    id="nome"
                  />
                  <label 
                    htmlFor="nome"
                    className={styles.modal_content_container__content__main__inputs__input_box__label}
                  >
                    NOME
                  </label>
                </div>
              </div> 

                <div className={styles.modal_content_container__content__main__footer} >
                  <CTAButton type='button' onClick={() => closeModal()} redColor text="Cancelar" />
                  <CTAButton type='submit' text="Criar" />
                </div>
              </form>
            </motion.div>
          </div>
        </>
        )
      }
    </AnimatePresence>
  )
}