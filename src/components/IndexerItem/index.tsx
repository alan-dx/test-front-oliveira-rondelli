import styles from './styles.module.scss';

import { IndexDTO } from '../../dtos/IndexDTO';
import { FiTrash, FiEdit } from 'react-icons/fi';

import { format } from 'date-fns';
import { DoubleButton } from '../DoubleButton';

interface IndexerItemProps {
  indexer: IndexDTO;
  deleteIndexer: (id: number) => void;
}

export function IndexerItem({indexer, deleteIndexer}: IndexerItemProps) {

  function handleDeleteIndexer(id: number) {
    deleteIndexer(id)
  }

  return (
    <tr className={styles.indexer__container} >
      <td>{indexer.simbolo}</td>
      <td>{indexer.nome}</td>
      <td>
        {
          format(new Date(indexer.dataCadastro), 'dd/MM/yyyy')
        }
      </td>
      <td>
        <button>
          <FiEdit size={15} />
        </button>
        <DoubleButton onClickConfirmMode={() => handleDeleteIndexer(indexer.id)}>
          <FiTrash size={15} />
        </DoubleButton>
      </td>
    </tr>
  )
}