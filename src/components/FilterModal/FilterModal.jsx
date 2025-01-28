import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// import css from './FilterModal.module.css';

import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';
import BackgroundSelector from '../BackgroundSelector/BackgroundSelector';
import { editBoard } from '../../redux/boards/operations';

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

export default function FilterModal({ isOpen, closeModal, board }) {
  const dispatch = useDispatch();

  const handleFilter = e => {
    dispatch(changeFilter(e.target.value));
  };

  const showAllCards = () => {
    dispatch(changeFilter(''));
  };

  const handleBackground = e => {
    const updatedBoardData = {
      background: e,
    };

    console.log(updatedBoardData);

    dispatch(editBoard({ boardId: board._id, editBoard: updatedBoardData }));
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="edit-board-modal-title"
      aria-describedby="edit-board-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={closeModal}
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
          Filters
        </Typography>
        <BackgroundSelector
          setSelectedBackground={handleBackground}
          sx={{ marginRight: '10px' }}
        />
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel
            component="h3"
            style={{
              marginBottom: '10px',
              color: 'var(--text-color)',
            }}
          >
            Label color
          </FormLabel>
          <Button onClick={showAllCards}>Show all</Button>
          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            name="radio-buttons-group"
            onClick={handleFilter}
          >
            <FormControlLabel
              value="Without"
              control={<Radio />}
              label="Without priority"
            />
            <FormControlLabel value="Low" control={<Radio />} label="Low" />
            <FormControlLabel
              value="Medium"
              control={<Radio />}
              label="Medium"
            />
            <FormControlLabel value="High" control={<Radio />} label="High" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Modal>
  );
}
