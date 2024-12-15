import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createColumn } from '../../redux/columns/slice';
import Modal from 'react-modal';
import css from './MainDashboard.module.css';
import {
  selectColumnsData,
  selectLoading,
  selectError,
} from '../../redux/columns/selectors';

import ColumnItem from '../ColumnItem/ColumnItem';
import { selectBoards, selectOneBoard } from '../../redux/boards/selectors';
import { fetchColumns } from '../../redux/columns/operations';
import { FiX } from 'react-icons/fi';

import BeatLoader from 'react-spinners/BeatLoader';

// import { getBoard } from '../../redux/boards/operations';

Modal.setAppElement('#root');

export default function MainDashboard() {
  const dispatch = useDispatch();
  // const [idBoard, setIdBoat] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const board = useSelector(selectOneBoard);
  const columns = useSelector(selectColumnsData);

  useEffect(() => {
    dispatch(fetchColumns(board._id));
  }, [dispatch, board._id]);

  const handleAddColumn = e => {
    e.preventDefault();

    let newObj = {
      boardId: board._id,
      title: newColumnTitle,
    };

    dispatch(createColumn(newObj));
    dispatch(fetchColumns(board._id));
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={css.box}>
        {loading ? (
          <div className={css.loading}>
            <BeatLoader color="#FFFFFF" />
          </div>
        ) : (
          <ul className={css.columnList}>
            {columns.map(item => {
              return (
                <li className={css.columnItem} key={item._id}>
                  <ColumnItem
                    id={item._id}
                    boardId={item.board}
                    owner={item.owner}
                    title={item.title}
                    idBoard={board._id}
                  />
                </li>
              );
            })}
          </ul>
        )}
        <button
          className={css.buttonAddColumn}
          onClick={() => setIsModalOpen(true)}
        >
          <div className={css.logoIcon}>+</div>
          Add another column
        </button>
      </div>
      <div>
        <div></div>
      </div>

      <div className={css.mainDashboardModal}>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Add Column"
          className={css.modal}
          overlayClassName={css.overlay}
        >
          <div className={css.modalContent}>
            <span
              className={css.spanClose}
              onClick={() => setIsModalOpen(false)}
            >
              <FiX className={css.closeIcon} />
            </span>
            <h2 className={css.modalTitle}>Add Column</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                // handleAddColumn();
                // form.reset();
              }}
              className={css.modalForm}
            >
              <input
                type="text"
                value={newColumnTitle}
                onChange={e => setNewColumnTitle(e.target.value)}
                placeholder="Column title"
                className={css.modalInput}
              />
              <button
                type="button"
                onClick={handleAddColumn}
                className={css.modalButton}
              >
                Add
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}
