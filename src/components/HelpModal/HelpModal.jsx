import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post(
        'https://project-back-codewave1-rqmw.onrender.com/api/help',
        { name, email }
      );
      console.log('Help request sent:', response.data);
      onClose(); // Закрываем модальное окно после успешной отправки запроса
    } catch (error) {
      console.error('Failed to send help request:', error);
      setError('Failed to send help request');
    }
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
            label="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Your Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            margin="normal"
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

// import React, { useState } from 'react';
// import axios from 'axios';
// import styles from './HelpModal.module.css';

// const HelpModal = ({ show, onClose }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name.trim() || !email.trim()) {
//       setError('All fields are required');
//       return;
//     }

//     try {
//       const response = await axios.post('https://project-back-codewave1-rqmw.onrender.com/api/help', { name, email });
//       console.log('Help request sent:', response.data);
//       onClose(); // Закрываем модальное окно после успешной отправки запроса
//     } catch (error) {
//       console.error('Failed to send help request:', error);
//       setError('Failed to send help request');
//     }
//   };

//   return (
//     <div className={`${styles.modalOverlay} ${show ? styles.show : ''}`}>
//       <div className={styles.modalContent}>
//         <button className={styles.modalCloseButton} onClick={onClose}>
//           &times;
//         </button>
//         <h2 className={styles.modalTitle}>Need Help?</h2>
//         <form className={styles.modalForm} onSubmit={handleSubmit}>
//           <input
//             type="text"
//             className={styles.modalFormInput}
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="email"
//             className={styles.modalFormInput}
//             placeholder="Your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {error && <p className={styles.modalError}>{error}</p>}
//           <button type="submit" className={styles.modalFormButton}>
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default HelpModal;
