import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useMemo, useRef } from 'react';
import { selectCards } from '../../redux/cards/selectors';
import { fetchCards } from '../../redux/cards/operations';
import {
  createColumn,
  deleteColumn,
  editColumn,
  fetchColumns,
} from '../../redux/columns/slice';
import { addCard } from '../../redux/cards/operations.js';
import css from './ColumnItem.module.css';
import sprite from '../../assets/sprite.svg';
import {
  selectColumnsData,
  selectLoading,
  selectError,
} from '../../redux/columns/selectors';
import Modal from 'react-modal';
import Card from '../Card/Card.jsx';
import AddCard from '../Card/AddCard.jsx';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';
import Icon from '../Icon/Icon';

export default function ColumnItem({ id, boardId, title, owner, idBoard }) {
  const dispatch = useDispatch();
  const [idColumn, setIdColumn] = useState(id);
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [isModalAddCardOpen, setIsModalAddCardOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  let [oneBoardId, setoneBoardId] = useState(boardId);
  const areyRef = useRef(false);

  // useEffect(() => {
  //   if (areyRef.current) return;
  //   areyRef.current = true;
  //   dispatch(fetchCards(id));
  // }, [dispatch, id]);

  const cards = useSelector(selectCards);

  const columnCards = useMemo(() => {
    const filteredCards = cards.filter(card => card.column === idColumn);
    return filteredCards;
  }, [cards, idColumn]);

  const handleDeleteColumn = () => {
    dispatch(deleteColumn(idColumn));
    dispatch(fetchColumns(idBoard));
  };

  const handleEditColumn = e => {
    e.preventDefault();

    let newObj = {
      columnId: idColumn,
      editColumn: {
        title: newColumnTitle,
      },
    };

    dispatch(editColumn(newObj));
    dispatch(fetchColumns(idBoard));
    setIsModalOpen(false);
  };

  const handleCreateCard = newCard => {
    dispatch(addCard(newCard));
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
        {columnCards.map(item => {
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
          onAddCard={handleCreateCard}
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
                value={newColumnTitle}
                onChange={e => setNewColumnTitle(e.target.value)}
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
