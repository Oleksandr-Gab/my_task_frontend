import { useState } from 'react';
import css from './AddNewBoard.module.css';

import CreateNewBoardModal from '../CreateNewBoard/CreateNewBoardModal';

const AddNewBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.create}>
      <div className={css.text}>
        <p>Create a new board</p>
      </div>
      <div className={css.btnPlus} onClick={openModal}>
        +
      </div>
      <CreateNewBoardModal show={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AddNewBoard;
