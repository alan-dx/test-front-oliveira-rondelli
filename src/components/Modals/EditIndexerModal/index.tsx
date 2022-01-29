import React from 'react';
import styles from './styles.module.scss';

import { CreateIndexData } from '../../../dtos/CreateIndexDTO';
import { IndexDTO } from '../../../dtos/IndexDTO';
import { CTAButton } from '../../CTAButton';

import { Form, Field } from 'react-final-form';
import { AnimatePresence, motion } from 'framer-motion';
import { FiEdit } from 'react-icons/fi';

import { api } from '../../../services/api';
import { EditIndexerDTO } from '../../../dtos/EditIndexerDTO';

interface EditIndexerModalProps {
  isOpen: boolean;
  layoutId: string;
  closeModal: () => void;
  editIndexer: ({simbolo, nome}: EditIndexerDTO) => Promise<void>;
  initialData: IndexDTO;
}

type FormData = CreateIndexData

export function EditIndexerModal({isOpen, layoutId, closeModal, editIndexer, initialData}: EditIndexerModalProps) {

  const [intialIndexerData, setInitialIndexerData] = React.useState(null)

  const firstRender = React.useRef(true)

  React.useEffect(() => {
    if (firstRender.current) {//componentDidUpdate

      firstRender.current = false
      return
      
    } else if (isOpen) {

      api.get(`/indexadores/${initialData.id}`).then(response => {
        const { data: indexers } = response.data
        setInitialIndexerData(indexers)
      })

    }

    return () => {//clean garbage at initialIndexerData, removing old state
      setInitialIndexerData(null)
    }

  }, [isOpen])

  const formValidate = (values: any) => {
    const errors: FormData = {} as FormData

    if (!values.nome) {
      errors.nome = "Nome é obrigatório"
    }

    if (!values.simbolo) {
      errors.simbolo = "Símbolo é obrigatório"
    }

    return errors

  }

  async function handleEditIndexer(values: FormData) {
    const { nome, simbolo } = values
    await editIndexer({nome, simbolo, id: intialIndexerData.id})
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
                  EDITAR INDEXADOR
                </h1>
                <i className={styles.modal_content_container__content__header__icon} >
                  <FiEdit />
                </i>
              </div>
              <Form 
                onSubmit={handleEditIndexer}
                validate={formValidate}
                initialValues={intialIndexerData ? {
                  nome: intialIndexerData.nome,
                  simbolo: intialIndexerData.simbolo
                } : {
                  nome: initialData.nome,
                  simbolo: initialData.simbolo
                }}
                render={({ handleSubmit, submitting }) => (
                  <form 
                    className={styles.modal_content_container__content__main} 
                    onSubmit={handleSubmit}
                  >
                    <div className={styles.modal_content_container__content__main__inputs}>
                      <Field name="simbolo" >
                        {({ input, meta }) => (
                          <div className={styles.modal_content_container__content__main__inputs__input_box}>
                            <motion.input
                              {...input}
                              className={styles.modal_content_container__content__main__inputs__input_box__input}
                              data-error={(meta.error && meta.touched) && 'error'}
                              type="text"
                              id="simbolo"
                              animate={
                                (meta.error && meta.touched) && {
                                  x: [0, 5, 0, 5, 0]
                                }
                              }
                              transition={{ type: "spring", duration: 0.3 }}
                            />
                            <label 
                              htmlFor="simbolo"
                              className={styles.modal_content_container__content__main__inputs__input_box__label}
                            >
                              SÍMBOLO
                            </label>
                          </div>
                        )}
                      </Field>
                      <Field name="nome">
                        {({ input, meta }) => (
                          <div className={styles.modal_content_container__content__main__inputs__input_box}>
                            <motion.input
                              {...input}
                              className={styles.modal_content_container__content__main__inputs__input_box__input}
                              data-error={(meta.error && meta.touched) && 'error'}
                              type="text" 
                              id="nome"
                              animate={
                                (meta.error && meta.touched) && {
                                  x: [0, 5, 0, 5, 0]
                                }
                              }
                              transition={{ type: "spring", duration: 0.3 }}
                            />
                            <label 
                              htmlFor="nome"
                              className={styles.modal_content_container__content__main__inputs__input_box__label}
                            >
                              NOME
                            </label>
                          </div>
                        )}
                      </Field>
                    </div> 

                    <div className={styles.modal_content_container__content__main__footer} >
                      <CTAButton type='button' disabled={submitting} onClick={() => closeModal()} redColor text="Cancelar" />
                      <CTAButton type='submit' disabled={submitting} text="Salvar" />
                    </div>
                  </form>
                )}
              />
            </motion.div>
          </div>
        </>
        )
      }
    </AnimatePresence>
  )
}