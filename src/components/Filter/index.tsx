import React, { FormEvent } from 'react';
import styles from './styles.module.scss';

import { Form, Field } from 'react-final-form';
import { RiFilterOffLine } from 'react-icons/ri';

import { CTAButton } from '../CTAButton';
import { SquareButton } from '../SquareButton';

import { FilterDataDTO } from '../../dtos/FilterDataDTO';
import { FormApi } from 'final-form';

interface FilterProps {
  clearFilter: () => Promise<void>;
  fetchIndexersByFilter: (filterData: FilterDataDTO) => Promise<void>;
}

export function Filter({ clearFilter, fetchIndexersByFilter }: FilterProps) {

  const [isFiltered, setIsFiltered] = React.useState(false)

  async function handleFetchIndexersByFilter(values: any) {
    setIsFiltered(true)
    await fetchIndexersByFilter(values)
  }

  function handleClearFilter(form: FormApi) {
    setIsFiltered(false)
    form.reset()

    clearFilter()
  }

  // const intialValues = (currentFilterData.nome != "" || currentFilterData.simbolo != "" ) 

  return (
    <Form 
      onSubmit={handleFetchIndexersByFilter}
      initialValues={{
        simbolo: "",
        nome: "",
        orderByDescending: "old"
      }}
      
      render={({handleSubmit, submitting, pristine, values, form}) => (
        <form onSubmit={handleSubmit} className={styles.filter__container} >
          <Field name="simbolo">
            {({ input, meta }) => (
              <div className={styles.filter__container__input_box} >
                <input
                  {...input}
                  className={styles.filter__container__input_box__input}
                  type="text" 
                  id='simbolo'
                  // value={simbolo}
                  // onChange={e => setSimbolo(e.target.value)}
                />
                <label
                  className={styles.filter__container__input_box__label}
                  htmlFor="simbolo"
                >
                  SÍMBOLO
                </label>
              </div>
            )}
          </Field>
          <Field name="nome">
            {({ input, meta }) => (
              <div className={styles.filter__container__input_box} >
                <input
                  {...input}
                  className={styles.filter__container__input_box__input}
                  type="text" 
                  id='nome'
                  // value={nome}
                  // onChange={e => setNome(e.target.value)}
                />
                <label
                  className={styles.filter__container__input_box__label}
                  htmlFor="nome"
                >
                  NOME
                </label>
              </div>
            )}
          </Field>
          <div className={styles.filter__container__checkboxs_box} >
            <div className={styles.filter__container__checkboxs_box__checkbox} >
              <Field 
                name="orderByDescending"
                component="input"
                type="radio"
                value="old"
                id="antigos"
              />
              <label htmlFor="antigos">MAIS ANTIGOS</label>
            </div>
            <div className={styles.filter__container__checkboxs_box__checkbox} >
              <Field 
                name="orderByDescending"
                component="input"
                type="radio"
                value="new"
                id="recentes"
              />
              <label htmlFor="recentes">MAIS RECENTES</label>
            </div>
          </div>
          <CTAButton 
            type="submit"
            text="Buscar"
            disabled={submitting}
          />
          <SquareButton
            redColor
            type="button"
            disabled={pristine || !isFiltered}
            onClick={() => handleClearFilter(form)}
          >
            <RiFilterOffLine size={18} />
          </SquareButton>
        </form>
      )}
    />
  )
}