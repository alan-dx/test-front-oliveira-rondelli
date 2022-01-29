import React from 'react';
import styles from './styles.module.scss';

import { RiFilterOffLine } from 'react-icons/ri';

import { CTAButton } from '../CTAButton';
import { SquareButton } from '../SquareButton';

import { FilterDataDTO } from '../../dtos/FilterDataDTO';

interface FilterProps {
  clearFilter: () => Promise<void>;
  fetchIndexersByFilter: (filterData: FilterDataDTO) => void;
}

export function Filter({ clearFilter, fetchIndexersByFilter }: FilterProps) {

  const [simbolo, setSimbolo] = React.useState('')
  const [nome, setNome] = React.useState('')
  const [orderByDescending, setOrderByDescending] = React.useState(false)
  const [isFiltered, setIsFiltered] = React.useState(false)

  function handleFetchIndexersByFilter() {
    setIsFiltered(true)
    fetchIndexersByFilter({simbolo, nome, orderByDescending})
  }

  function handleClearFilter() {
    setSimbolo('')
    setNome('')
    setOrderByDescending(false)
    setIsFiltered(false)

    clearFilter()
  }

  return (
    <div className={styles.filter__container} >
      <div className={styles.filter__container__input_box} >
        <input
          className={styles.filter__container__input_box__input}
          type="text" 
          id='simbolo'
          value={simbolo}
          onChange={e => setSimbolo(e.target.value)}
        />
        <label
          className={styles.filter__container__input_box__label}
          htmlFor="simbolo"
        >
          SÍMBOLO
        </label>
      </div>
      <div className={styles.filter__container__input_box} >
        <input
          className={styles.filter__container__input_box__input}
          type="text" 
          id='nome'
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <label
          className={styles.filter__container__input_box__label}
          htmlFor="nome"
        >
          NOME
        </label>
      </div>
      <div className={styles.filter__container__checkboxs_box} >
        <div className={styles.filter__container__checkboxs_box__checkbox} >
          <input
            type="radio" 
            id="antigos"
            name="order"
            onClick={e => setOrderByDescending(false)}
            onChange={() => {}}//avoid input radio warning 
            checked={!orderByDescending}
          />
          <label htmlFor="antigos">MAIS ANTIGOS</label>
        </div>
        <div className={styles.filter__container__checkboxs_box__checkbox} >
          <input
            type="radio" 
            id="recentes"
            name="order"
            onChange={() => {}}//avoid input radio warning 
            onClick={e => setOrderByDescending(true)}
          />
          <label htmlFor="recentes">MAIS RECENTES</label>
        </div>
      </div>
      <CTAButton 
        onClick={handleFetchIndexersByFilter} 
        text="Buscar" 
      />
      <SquareButton
        redColor
        disabled={!isFiltered}
      >
        <RiFilterOffLine onClick={() => handleClearFilter()} size={18} />
      </SquareButton>
    </div>
  )
}