import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { addBoard, fetchBoards } from '../../redux/boards/operations';
import BackgroundSelector from '../BackgroundSelector/BackgroundSelector'; // Импорт компонента BackgroundSelector
import Icon from '../Icon/Icon.jsx';
import CreateButton from '../CreateButton/CreateButton';

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

const hel = () => {
  console.log('hello');
};

const CreateNewBoardModal = ({ show, onClose, title }) => {
  const dispatch = useDispatch();
  const [boardTitle, setBoardTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('project');
  const [selectedBackground, setSelectedBackground] = useState('1');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!boardTitle.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await dispatch(
        addBoard({
          title: boardTitle,
          icon: selectedIcon,
          background: selectedBackground,
        })
      ).unwrap();
      onClose(); // Закрываем модальное окно после успешного создания
      dispatch(fetchBoards()); // Обновляем список досок после создания
    } catch (error) {
      console.error('Failed to create new board:', error);
      setError('Failed to create new board');
    } finally {
      setBoardTitle('');
    }
  };

  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="create-board-modal-title"
      aria-describedby="create-board-modal-description"
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
          id="create-board-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: 'var(--text-color)' }}
        >
          New board
        </Typography>
        <Typography
          id="create-board-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: 'var(--text-color)' }}
        >
          {title}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Title"
            value={boardTitle}
            onChange={e => setBoardTitle(e.target.value)}
            margin="normal"
            sx={{
              color: 'var(--text-color)',
              backgroundColor: 'white',
              borderRadius: '8px',
            }} // Установка цвета текста для TextField
          />
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend" sx={{ color: 'var(--text-color)' }}>
              Choose an Icon
            </FormLabel>
            <RadioGroup
              row
              value={selectedIcon}
              onChange={e => setSelectedIcon(e.target.value)}
              sx={{
                height: '18px',
                marginLeft: '10px',
                marginTop: '10px',
              }}
            >
              {[
                'project',
                'star-04',
                'loading-03',
                'puzzle-piece-02',
                'container',
                'lightning-02',
                'colors',
                'hexagon-01',
              ].map(iconId => (
                <FormControlLabel
                  key={iconId}
                  value={iconId}
                  control={<Radio style={{ display: 'none' }} />}
                  label={
                    <div
                      style={{
                        color:
                          selectedIcon === iconId
                            ? 'var(--color-icons-active)'
                            : 'var(--color-icons-no-active)',
                        width: '18px',
                        height: '18px',
                      }}
                    >
                      <Icon id={iconId} />
                    </div>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>

          <BackgroundSelector
            setSelectedBackground={setSelectedBackground}
            sx={{ marginRight: '10px' }}
          />

          {error && (
            <Typography
              color="error"
              sx={{ marginTop: 2, color: 'var(--text-color)' }}
            >
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
            Create
          </Button>
          {/* <CreateButton onSubmit={handleSubmit}>Create</CreateButton> */}
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateNewBoardModal;
