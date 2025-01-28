import EditCard from './EditCard.jsx';
import { useState } from 'react';
import { editCard, deleteCard } from '../../redux/cards/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import css from './Card.module.css';
import { selectColumnsData } from '../../redux/columns/selectors.js';
import Icon from '../Icon/Icon.jsx';
// import { selectOneBoard } from '../../redux/boards/selectors.js';
// import { fetchColumns } from '../../redux/columns/operations.js';
// import { selectCards } from '../../redux/cards/selectors.js';

const formatDate = dateString => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};
export default function Card({
  id,
  columnId,
  title,
  description,
  priority,
  deadline,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const columns = useSelector(selectColumnsData);
  const dispatch = useDispatch();

  const checkDeadline = deadline => {
    const today = new Date();
    const deadlineDay = new Date(deadline);
    return today.toDateString() === deadlineDay.toDateString();
  };
  const isDeadlineDay = checkDeadline(deadline);

  const handleMoveCard = columnId => {
    let cardId = id;
    let editCardData = {
      column: columnId,
    };

    dispatch(editCard({ cardId, editCardData }));
  };

  const handleDeleteCard = () => {
    dispatch(deleteCard(id));
  };
  const handleMouseEnter = () => {
    setIsPopupOpen(true);
  };

  const handleMouseLeave = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={`${css.card} ${css[`card-${priority.toLowerCase()}`]}`}>
      <div>
        <h4 className={css.title}>{title}</h4>
        <p className={css.description}>{description}</p>
      </div>
      <div className={css.cardDivider}></div>
      <div className={css.cardFooter}>
        <div className={css.priority}>
          <span className={css.priorityTitle}>Priority</span>
          <div className={css.priorityType}>
            <span
              className={`${css.dot} ${css[`dot-${priority.toLowerCase()}`]}`}
            ></span>
            <span className={css.priorityValue}>{priority}</span>
          </div>
        </div>
        <div className={css.deadline}>
          <span className={css.deadlineTitle}>Deadline</span>
          <span className={css.deadlineValue}>{formatDate(deadline)}</span>
        </div>

        <div className={css.icons} onMouseLeave={handleMouseLeave}>
          {isDeadlineDay && (
            <button className={css.btnCard}>
              <Icon id={'bell'} />
            </button>
          )}

          <button className={css.btnCard} onMouseDown={handleMouseEnter}>
            <Icon id={'arrow-circle-broken-right'} />
          </button>
          {isPopupOpen && (
            <div className={css.popup} onMouseLeave={handleMouseLeave}>
              {columns
                .filter(column => column._id !== columnId)
                .map(column => (
                  <div key={column._id}>
                    <button
                      type="button"
                      className={css.popBox}
                      onClick={() => handleMoveCard(column._id)}
                    >
                      <span className={css.popTitle}>{column.title}</span>
                      <Icon id={'arrow-circle-broken-right'} />
                    </button>
                  </div>
                ))}
            </div>
          )}
          <button className={css.btnCard} onClick={() => setIsEditing(true)}>
            <Icon id={'pencel'} />
          </button>
          <button className={css.btnCard} onClick={handleDeleteCard}>
            <Icon id={'trash-04'} />
          </button>
        </div>
      </div>
      {isEditing && (
        <EditCard
          card={{ id, columnId, title, description, priority, deadline }}
          isEditing={isEditing}
          onClose={setIsEditing}
        />
      )}
    </div>
  );
}
