import { useState } from 'react';
import Modal from 'react-modal';

export default function EditCard({ card, onSave, onClose, isEditing }) {
  const [newTitle, setNewTitle] = useState(card.title);
  const [newDescription, setNewDescription] = useState(card.description);
  const [newPriority, setNewPriority] = useState(card.priority);
  const [newDeadline, setNewDeadline] = useState(card.deadline);

  const handleEditCard = () => {
    if (newTitle.trim() && newDescription.trim() && newDeadline.trim()) {
      onSave({
        ...card,
        title: newTitle,
        description: newDescription,
        priority: newPriority,
        deadline: new Date(newDeadline).toISOString(),
      });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div>
      <Modal
        isOpen={isEditing}
        onRequestClose={() => onClose(false)}
        contentLabel="Edit Card"
      >
        <h2>Edit card</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleEditCard();
          }}
        >
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Card title"
            required
          />
          <textarea
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
            placeholder="Card description"
            required
          />
          <label>
            Priority:
            <select
              value={newPriority}
              onChange={e => setNewPriority(e.target.value)}
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
              value={newDeadline}
              onChange={e => setNewDeadline(e.target.value)}
              required
            />
          </label>
          <button type="submit">Edit</button>
        </form>
        <button onClick={() => onClose(false)}>Close</button>
      </Modal>
    </div>
  );
}
