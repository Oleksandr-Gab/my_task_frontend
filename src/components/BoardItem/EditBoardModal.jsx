import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { editBoard, fetchBoards } from '../../redux/boards/operations';
import BackgroundSelector from '../BackgroundSelector/BackgroundSelector';
import IconSelector from '../IconSelector/IconSelector';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditBoardModal = ({ show, onClose, board }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (board) {
      setTitle(board.title);
      setSelectedIcon(board.icon);
      setSelectedBackground(board.background);
    }
  }, [board]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    const updatedBoardData = {
      title,
      icon: selectedIcon,
      background: selectedBackground,
    };

    dispatch(editBoard({ boardId: board._id, editBoard: updatedBoardData }));
    dispatch(fetchBoards());
    onClose();
  };

  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="edit-board-modal-title"
      aria-describedby="edit-board-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="edit-board-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: 'var(--text-color)' }}
        >
          Edit Board
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            margin="normal"
            sx={{
              color: 'var(--text-color)',
              backgroundColor: 'white',
              borderRadius: '8px',
            }}
          />
          <IconSelector
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          />
          <BackgroundSelector
            setSelectedBackground={setSelectedBackground}
            sx={{ marginRight: '10px' }}
          />

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: '40px',
              width: '100%',
              height: 49,
              backgroundColor: 'var(--btn-color)',
              color: 'var(--text-color-btn)',
              '&:hover': {
                backgroundColor: 'var( --btn-color-hover)',
              },
            }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditBoardModal;
