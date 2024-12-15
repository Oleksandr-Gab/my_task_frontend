import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from 'react-modal';
import css from './HeaderDashboard.module.css';
import { LuFilter } from 'react-icons/lu';
import { selectBoards, selectOneBoard } from '../../redux/boards/selectors';

export default function HeaderDashboard() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const board = useSelector(selectOneBoard);
  const boards = useSelector(selectBoards);

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
      <button
        onClick={() => setIsFilterModalOpen(true)}
        className={css.filterButton}
      >
        <LuFilter />
        Filters
      </button>
    </header>
  );
}

// <Modal
// isOpen={isFilterModalOpen}
// onRequestClose={() => setIsFilterModalOpen(false)}
// contentLabel="Filters"
// className={css.modal}
// overlayClassName={css.overlay}
// >
// <div className={css.modalContent}>
//   <h2>Filters</h2>
//   <form>
//     {/* Форма для зміни фону та фільтрів */}
//     <input
//       type="color"
//       onChange={e => handleBackgroundChange(e.target.value)}
//     />
//     {/* Інші елементи форми */}
//     <button type="button" onClick={() => setIsFilterModalOpen(false)}>
//       Close
//     </button>
//   </form>
// </div>
// </Modal>
