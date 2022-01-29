import { PageButton } from "../PageButton";
import styles from './styles.module.scss';

interface PageListProps {
  numberOfPages: number;
  currentPage: number;
  changePagination: (page: number) => Promise<void>;
}

export function PagesList({ numberOfPages, currentPage, changePagination }: PageListProps) {

  const arrayOfPages = Object.keys(new Array(numberOfPages).fill(null))

  return (
    <div className={styles.pages_list__container} >
      {
        arrayOfPages.map(page => (
          <PageButton 
            key={page}
            onClick={() => changePagination(Number(page) + 1)}
            data-active={currentPage == Number(page) + 1 ? "true" : undefined } 
            whileTap={{
              scale: 0.9
            }}
          >
            {Number(page) + 1}
          </PageButton>
        ))
      }
    </div>
  )
}