import styles from './styles.module.scss';

import { motion } from 'framer-motion';
import { FiTrash, FiEdit } from 'react-icons/fi';

import { IndexDTO } from '../../dtos/IndexDTO';

import { format } from 'date-fns';
import { DoubleButton } from '../DoubleButton';

interface IndexerItemProps {
  indexer: IndexDTO;
  deleteIndexer: (id: number) => void;
  layoutId: string;
  openEditModal: (id: number) => void;
}

export function IndexerItem({ indexer, deleteIndexer, layoutId, openEditModal }: IndexerItemProps) {

  function handleDeleteIndexer(id: number) {
    deleteIndexer(id)
  }

  return (
    <motion.tr layout className={styles.indexer__container} >
      <td>{indexer.simbolo}</td>
      <td>{indexer.nome}</td>
      <td>
        {
          format(new Date(indexer.dataCadastro), 'dd/MM/yyyy')
        }
      </td>
      <td>
        <div>
          <motion.button               
            layout 
            layoutId={layoutId}
            onClick={() => openEditModal(indexer.id)}
          >
            <FiEdit size={15} />
          </motion.button>
          <DoubleButton onClickConfirmMode={() => handleDeleteIndexer(indexer.id)}>
            <FiTrash size={15} />
          </DoubleButton>
        </div>
      </td>
    </motion.tr>
  )
}