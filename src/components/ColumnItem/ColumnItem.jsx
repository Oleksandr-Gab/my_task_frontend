import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useMemo, useRef } from 'react';
import { selectCards } from '../../redux/cards/selectors';
import { fetchCards } from '../../redux/cards/operations';
import {
  deleteColumn,
  editColumn,
  fetchColumns,
} from '../../redux/columns/slice';

import css from './ColumnItem.module.css';
import Modal from 'react-modal';
import Card from '../Card/Card.jsx';
import AddCard from '../Card/AddCard.jsx';
import { FiX } from 'react-icons/fi';
import Icon from '../Icon/Icon';

export default function ColumnItem({ id, boardId, title, idBoard }) {
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [isModalAddCardOpen, setIsModalAddCardOpen] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);
  const arrayRef = useRef(false);
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  // const isLoading = useSelector(state => state.boards.loading);
  // const error = useSelector(state => state.boards.error);

  useEffect(() => {
    if (arrayRef.current) return;
    arrayRef.current = true;
    dispatch(fetchCards(id));
  }, [dispatch, id]);

  const columnCards = useMemo(() => {
    const filteredCards = cards.filter(card => card.column === id);
    return filteredCards;
  }, [cards, id]);

  const handleDeleteColumn = async () => {
    await dispatch(deleteColumn(id));
    dispatch(fetchColumns(idBoard));
  };

  const handleEditColumn = e => {
    e.preventDefault();

    let newObj = {
      columnId: id,
      editColumn: {
        title: columnTitle,
      },
    };

    dispatch(editColumn(newObj));
    dispatch(fetchColumns(idBoard));
    setIsModalOpen(false);
  };

  const handleAddCard = () => {
    setIsModalAddCardOpen(true);
  };
  return (
    <div className={css.columnItem}>
      <div className={css.columnList}>
        <div className={css.columnHeader}>
          <h3 className={css.title}>{`${title}`}</h3>
        </div>
        <ul className={css.buttonList}>
          <li>
            <div className={css.btnColumn} onClick={() => setIsModalOpen(true)}>
              <Icon id={'pencel'} />
            </div>
          </li>
          <li>
            <div className={css.btnColumn} onClick={handleDeleteColumn}>
              <Icon id={'trash-04'} />
            </div>
          </li>
        </ul>
      </div>
      <ul className={css.cardsList}>
        {arrayRef &&
          columnCards.map(item => {
            return (
              <li className={css.cardItem} key={item._id}>
                <Card
                  id={item._id}
                  boardId={item.board}
                  columnId={item.column}
                  title={item.title}
                  description={item.description}
                  priority={item.priority}
                  deadline={item.deadline}
                />
              </li>
            );
          })}
      </ul>
      <div>
        <button className={css.buttonAddCard} onClick={handleAddCard}>
          <span className={css.buttonTitle}>+ Add another card</span>
        </button>

        {/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
        <AddCard
          columnId={id}
          boardId={boardId}
          isModalOpen={isModalAddCardOpen}
          setIsModalOpen={setIsModalAddCardOpen}
        />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Edit Column"
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
            <h2 className={css.modalTitle}>Edit Column</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                // handleAddColumn();
              }}
              className={css.modalForm}
            >
              <input
                type="text"
                value={columnTitle}
                onChange={e => setColumnTitle(e.target.value)}
                placeholder="Column title"
                className={css.modalInput}
              />
              <button
                type="button"
                onClick={handleEditColumn}
                className={css.modalButton}
              >
                Edit column
              </button>
            </form>
          </div>
        </Modal>

        {/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
      </div>
    </div>
  );
}
