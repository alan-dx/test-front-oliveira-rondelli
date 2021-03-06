import React, { FormEvent } from 'react';
import styles from './styles.module.scss';

import { CreateIndexData } from '../../../dtos/CreateIndexDTO';
import { CTAButton } from '../../CTAButton';

import { Form, Field } from 'react-final-form';
import { AnimatePresence, motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

interface AddIndexerModal {
  isOpen: boolean;
  layoutId: string;
  closeModal: () => void;
  createNewIndexer: ({simbolo, nome}: CreateIndexData) => Promise<void>;
}

type FormData = CreateIndexData

export function AddIndexerModal({isOpen, layoutId, closeModal, createNewIndexer}: AddIndexerModal) {

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

  async function handleCreateNewIndexer(values: FormData) {
    const { nome, simbolo } = values

    await createNewIndexer({nome, simbolo})

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
              <Form 
                onSubmit={handleCreateNewIndexer}
                validate={formValidate}
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
                              // value={simbolo}
                              // onChange={e => setSimbolo(e.target.value)}
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
                              // value={nome} 
                              // onChange={e => setNome(e.target.value)}
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
                      <CTAButton type='submit' disabled={submitting} text="Criar" />
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