import styles from './styles.module.scss';

import { motion } from 'framer-motion';
import { FiTrash, FiEdit } from 'react-icons/fi';

import { IndexDTO } from '../../dtos/IndexDTO';

import { format } from 'date-fns';
import { DoubleButton } from '../DoubleButton';
import { SquareButton } from '../SquareButton';

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
      <td>
        {indexer.nome.slice(0, 20)}
        {indexer.nome.length > 20 ? "..." : ""}
      </td>
      <td>
        {indexer.simbolo.slice(0, 10)}
        {indexer.simbolo.length > 10 ? "..." : ""}
      </td>
      <td>
        {
          format(new Date(indexer.dataCadastro), 'dd/MM/yyyy')
        }
      </td>
      <td>
        <div>
          <SquareButton
            layout 
            layoutId={layoutId}
            onClick={() => openEditModal(indexer.id)}
          >
            <FiEdit size={15} />
          </SquareButton>
          <DoubleButton onClickConfirmMode={() => handleDeleteIndexer(indexer.id)}>
            <FiTrash size={15} />
          </DoubleButton>
        </div>
      </td>
    </motion.tr>
  )
}