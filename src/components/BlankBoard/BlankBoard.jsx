import CreateNewBoardModal from '../CreateNewBoard/CreateNewBoardModal'; // Импорт модального окна

import css from './BlankBoard.module.css';
import { useState } from 'react';

export default function BlankBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия/закрытия модального окна

  // Функция для открытия модального окна
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.wrapper}>
      <p className={css.text}>
        Before starting your project, it is essential
        <button type="button" onClick={openModal} className={css.btn}>
          to create a board
        </button>
        to create a board to visualize and track all the necessary tasks and
        milestones. This board serves as a powerful tool to organize the
        workflow and ensure effective collaboration among team members.
      </p>
      <CreateNewBoardModal show={isModalOpen} onClose={closeModal} />
    </div>
  );
}
