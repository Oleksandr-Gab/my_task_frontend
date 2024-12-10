import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import css from './HeaderDashboard.module.css';
import { LuFilter } from 'react-icons/lu';

export default function HeaderDashboard({ boardName }) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <header className={css.headerDashboard}>
      <h1>{boardName}</h1>
      <button
        onClick={() => setIsFilterModalOpen(true)}
        className={css.filterButton}
      >
        <LuFilter />
        Filters
      </button>

      <Modal
        isOpen={isFilterModalOpen}
        onRequestClose={() => setIsFilterModalOpen(false)}
        contentLabel="Filters"
        className={css.modal}
        overlayClassName={css.overlay}
      >
        <div className={css.modalContent}>
          <h2>Filters</h2>
          <form>
            {/* Форма для зміни фону та фільтрів */}
            <input
              type="color"
              onChange={e => handleBackgroundChange(e.target.value)}
            />
            {/* Інші елементи форми */}
            <button type="button" onClick={() => setIsFilterModalOpen(false)}>
              Close
            </button>
          </form>
        </div>
      </Modal>
    </header>
  );
}
