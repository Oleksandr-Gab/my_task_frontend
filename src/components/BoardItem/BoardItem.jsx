import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteBoard,
  fetchBoards,
  getBoard,
} from '../../redux/boards/operations';
import EditBoardModal from './EditBoardModal';
import css from './BoardItem.module.css';
import Icon from '../Icon/Icon';

const BoardItem = ({ board }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleBoardId = idBoard => {
    dispatch(getBoard(idBoard));
  };

  const handleDelete = _id => {
    dispatch(deleteBoard(_id));
    dispatch(fetchBoards());
  };

  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  return (
    <div className={css.wrapper}>
      <div onClick={() => handleBoardId(board._id)} className={css.cont_wrap}>
        <div className={css.icon}>
          <Icon id={board.icon} />
        </div>
        <h2 className={css.title}>{board.title}</h2>
      </div>
      <div className={css.icon_wrap}>
        <div onClick={handleEditModalOpen} className={css.icon}>
          <Icon id={'pencel'} />
        </div>
        <div onClick={() => handleDelete(board._id)} className={css.icon}>
          <Icon id={'trash-04'} />
        </div>
      </div>
      <EditBoardModal
        show={editModalOpen}
        onClose={handleEditModalClose}
        board={board}
      />
    </div>
  );
};

export default BoardItem;
