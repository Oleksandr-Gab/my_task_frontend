import { useDispatch } from 'react-redux';
import { useState } from 'react';

import Modal from 'react-modal';
import toast from 'react-hot-toast';

import { addCard } from '../../redux/cards/operations.js';

import css from './AddCard.module.css';
import sprite from '../../assets/sprite.svg';

export default function AddCard({
  columnId,
  boardId,
  isModalOpen,
  setIsModalOpen,
}) {
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [cardPriority, setCardPriority] = useState('Low');
  const [cardDeadline, setCardDeadline] = useState('');
  const dispatch = useDispatch();

  const handleAddCard = () => {
    if (cardTitle.trim() && cardDescription.trim() && cardDeadline.trim()) {
      const selectedDeadline = new Date(cardDeadline);
      const now = new Date();

      if (selectedDeadline < now) {
        return toast('Deadline must be in the future');
      }
      dispatch(
        addCard({
          columnId,
          title: cardTitle,
          description: cardDescription,
          priority: cardPriority,
          deadline: new Date(cardDeadline),
          board: boardId,
        })
      );
      setCardTitle('');
      setCardDescription('');
      setCardPriority('Low');
      setCardDeadline('');
      setIsModalOpen(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentLabel="Add Card"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <h2>Add Card</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleAddCard();
        }}
      >
        <input
          type="text"
          value={cardTitle}
          onChange={e => setCardTitle(e.target.value)}
          placeholder="Card title"
          required
          className={css.input}
        />
        <textarea
          value={cardDescription}
          onChange={e => setCardDescription(e.target.value)}
          placeholder="Card description"
          required
          className={css.textarea}
        />
        <label>
          Label color:
          <div>
            <label>
              <input
                type="radio"
                value="Low"
                checked={cardPriority === 'Low'}
                onChange={e => setCardPriority(e.target.value)}
              />
              <span className={css.radioLabel} style={{ color: '#8FA1D0' }}>
                Low
              </span>
            </label>
            <label>
              <input
                type="radio"
                value="Medium"
                checked={cardPriority === 'Medium'}
                onChange={e => setCardPriority(e.target.value)}
              />
              <span className={css.radioLabel} style={{ color: '#E09CB5' }}>
                Medium
              </span>
            </label>
            <label>
              <input
                type="radio"
                value="High"
                checked={cardPriority === 'High'}
                onChange={e => setCardPriority(e.target.value)}
              />
              <span className={css.radioLabel} style={{ color: '#BEDBB0' }}>
                High
              </span>
            </label>
            <label>
              <input
                type="radio"
                value="Without"
                checked={cardPriority === 'Without'}
                onChange={e => setCardPriority(e.target.value)}
              />
              <span className={css.radioLabel} style={{ color: '#1616164D' }}>
                Without
              </span>
            </label>
          </div>
        </label>
        <label>
          Deadline:
          <input
            type="datetime-local"
            value={cardDeadline}
            onChange={e => setCardDeadline(e.target.value)}
            required
            className={css.input}
          />
        </label>
        <button type="submit" className={css.submitButton}>
          Add
        </button>
      </form>
      <span className={css.spanClose} onClick={() => setIsModalOpen(false)}>
        <button className={css.btnCard}>
          <svg className={css.closeSvg} width="18px" height="18px">
            <use href={sprite + '#icon-x-close'}></use>
          </svg>
        </button>
      </span>
    </Modal>
  );
}
