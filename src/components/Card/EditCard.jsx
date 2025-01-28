import { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

import { Box, Typography } from '@mui/material';

import { editCard } from '../../redux/cards/operations';
// import { selectOneBoard } from '../../redux/boards/selectors';
// import { fetchColumns } from '../../redux/columns/operations';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'var(--modal-backgr)',
  border: 'none',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

export default function EditCard({ card, onClose, isEditing }) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [priority, setPriority] = useState(card.priority);
  const [deadline, setDeadline] = useState(card.deadline);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleEditCard = () => {
    if (!title.trim() && !description.trim() && !deadline.trim()) {
      setError('Please fill in all fields');
      return;
    }
    let cardId = card.id;

    let editCardData = {
      title: title,
      description: description,
      priority: priority,
      deadline: new Date(deadline),
    };

    dispatch(editCard({ cardId, editCardData }));
    onClose();
  };

  return (
    <div>
      <Modal
        isOpen={isEditing}
        onRequestClose={() => onClose(false)}
        contentLabel="Edit Card"
      >
        <Box sx={style}>
          <h2>Edit card</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleEditCard();
            }}
          >
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Card title"
              required
            />
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Card description"
              required
            />
            <label>
              Priority:
              <select
                value={priority}
                onChange={e => setPriority(e.target.value)}
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
            <label>
              Deadline:
              <input
                type="datetime-local"
                value={deadline.slice(0, 19)}
                onChange={e => setDeadline(e.target.value)}
                required
              />
            </label>
            <button type="submit">Edit</button>
          </form>
          <button onClick={() => onClose(false)}>Close</button>
        </Box>
        {error && (
          <Typography color="error" sx={{ marginTop: 0, color: 'red' }}>
            {error}
          </Typography>
        )}
      </Modal>
    </div>
  );
}
