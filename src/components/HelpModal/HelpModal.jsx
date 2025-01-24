import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { help } from '../../redux/auth/operations';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'var(--modal-backgr)',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const HelpModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!comment.trim() || !email.trim()) {
      setError('All fields are required');
      return;
    }

    if (!pattern.test(email)) {
      setError('Please give us a valid email.');
      return;
    }
    let context = {
      email: email.trim(),
      comment: comment.trim(),
    };
    dispatch(help(context));
    onClose();
  };

  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="help-modal-title"
      aria-describedby="help-modal-description"
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
        <Typography id="help-modal-title" variant="h6" component="h2">
          Need Help?
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email address"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            margin="normal"
            required
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
              mt: 2,
              width: '100%',
              color: 'var(--text-color-btn)',
              backgroundColor: 'var(--btn-color)',
              '&:hover': {
                backgroundColor: 'var(--btn-color-hover)', // Например, изменяем цвет иконки на красный при ховере
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default HelpModal;
