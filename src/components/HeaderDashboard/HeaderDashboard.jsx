import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import css from './HeaderDashboard.module.css';
import { LuFilter } from 'react-icons/lu';
import { selectBoards, selectOneBoard } from '../../redux/boards/selectors';
import FilterModal from '../FilterModal/FilterModal';

export default function HeaderDashboard() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const board = useSelector(selectOneBoard);
  const boards = useSelector(selectBoards);

  const openModal = () => setIsFilterModalOpen(true);
  const closeModal = () => setIsFilterModalOpen(false);

  useEffect(() => {
    if (boards.length == 0) {
      setTitle('');
      return;
    }
    setTitle(board.title);
  }, [boards, board]);

  return (
    <header className={css.headerDashboard}>
      <h1>{title}</h1>
      <button onClick={openModal} className={css.filterButton}>
        <LuFilter />
        Filters
      </button>
      <FilterModal
        isOpen={isFilterModalOpen}
        closeModal={closeModal}
        board={board}
      />
    </header>
  );
}
