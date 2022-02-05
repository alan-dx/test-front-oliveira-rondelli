import React, { FormEvent } from 'react';
import styles from './styles.module.scss';

import { Form, Field } from 'react-final-form';
import { RiFilterOffLine } from 'react-icons/ri';

import { CTAButton } from '../CTAButton';
import { SquareButton } from '../SquareButton';

import { FilterAccountPlansDataDTO } from '../../dtos/FilterAccountPlansDataDTO';
import { FormApi } from 'final-form';

interface FilterProps {
  clearFilter: () => Promise<void>;
  fetchPlansByFilter: (filterData: FilterAccountPlansDataDTO) => Promise<void>;
}

export function FilterAccountPlans({ clearFilter, fetchPlansByFilter }: FilterProps) {

  const [isFiltered, setIsFiltered] = React.useState(false)

  async function handleFetchPlansByFilter(values: any) {
    setIsFiltered(true)
    await fetchPlansByFilter(values)
  }

  function handleClearFilter(form: FormApi) {
    setIsFiltered(false)
    form.reset()

    clearFilter()
  }

  return (
    <Form 
      onSubmit={handleFetchPlansByFilter}
      initialValues={{
        tipo: "",
        identificacao: "",
        orderByDescending: "old"
      }}
      
      render={({handleSubmit, submitting, pristine, values, form}) => (
        <form onSubmit={handleSubmit} className={styles.filter__container} >
          <Field name="identificacao">
            {({ input, meta }) => (
              <div className={styles.filter__container__input_box} >
                <input
                  {...input}
                  className={styles.filter__container__input_box__input}
                  type="text" 
                  id='identificacao'
                  // value={identificacao}
                  // onChange={e => setidentificacao(e.target.value)}
                />
                <label
                  className={styles.filter__container__input_box__label}
                  htmlFor="identificacao"
                >
                  IDENTIFICAÇÃO
                </label>
              </div>
            )}
          </Field>
          <Field name="tipo">
            {({ input, meta }) => (
              <div className={styles.filter__container__input_box} >
                <input
                  {...input}
                  className={styles.filter__container__input_box__input}
                  type="text" 
                  id='tipo'
                  // value={simbolo}
                  // onChange={e => setSimbolo(e.target.value)}
                />
                <label
                  className={styles.filter__container__input_box__label}
                  htmlFor="tipo"
                >
                  TIPO
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
              <label htmlFor="antigos">CRESCENTE</label>
            </div>
            <div className={styles.filter__container__checkboxs_box__checkbox} >
              <Field 
                name="orderByDescending"
                component="input"
                type="radio"
                value="new"
                id="recentes"
              />
              <label htmlFor="recentes">DECRESCENTE</label>
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