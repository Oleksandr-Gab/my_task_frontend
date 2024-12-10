import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createColumn, deleteColumn } from '../../redux/columns/slice';
import Modal from 'react-modal';
import css from './MainDashboard.module.css';
import {
  selectColumnsData,
  selectLoading,
  selectError,
} from '../../redux/columns/selectors';
import toast, { Toaster } from 'react-hot-toast';
import sprite from '../../assets/sprite.svg';
import ColumnItem from '../ColumnItem/ColumnItem';
import { selectBoards, selectOneBoard } from '../../redux/boards/selectors';
import { fetchColumns } from '../../redux/columns/operations';
import { FiX } from 'react-icons/fi';

import BeatLoader from 'react-spinners/BeatLoader';

import { getBoard } from '../../redux/boards/operations';

Modal.setAppElement('#root');

export default function MainDashboard() {
  const dispatch = useDispatch();
  const [idBoard, setIdBoat] = useState('');

  const board = useSelector(selectOneBoard);
  const boards = useSelector(selectBoards);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const columns = useSelector(selectColumnsData);

  useEffect(() => {
    Object.keys(board).length == 0
      ? setIdBoat(boards[0]._id)
      : setIdBoat(board._id);
  }, [boards, board]);

  if (idBoard === '') {
    setIdBoat(boards[0]._id);
  }

  useEffect(() => {
    dispatch(fetchColumns(idBoard));
  }, [dispatch, idBoard]);

  const handleAddColumn = e => {
    e.preventDefault();

    let newObj = {
      boardId: idBoard,
      title: newColumnTitle,
    };

    dispatch(createColumn(newObj));
    dispatch(fetchColumns(idBoard));
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
                    idBoard={idBoard}
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
          <svg className={css.logoIcon} viewBox="0 0 32 32">
            <rect
              className={css.iconBackground}
              width="28"
              height="28"
              rx="6"
              ry="6"
            />
            <use
              href={sprite + '#icon-plus'}
              x="7"
              y="7"
              width="14"
              height="14"
            />
          </svg>
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
