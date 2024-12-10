// Общие стили для стандартного состояния
const commonStyles = {
  borderColor: 'var(--btn-color)',
  opacity: 0.4,
};

// Общие стили для состояния фокуса
const focusedStyles = {
  borderColor: 'var(--btn-color)',
  opacity: 1,
};

// Общие стили для метки (label)
const labelStyles = {
  color: 'var(--text-color-start-white)',
  opacity: 0.3,
};

// Общие стили для ввода (input)
const inputBaseStyles = {
  color: 'var(--text-color-start-white)',
};

const inputFormTheme = {
  '& .MuiOutlinedInput-notchedOutline': {
    ...commonStyles,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    ...focusedStyles,
  },
  '& .MuiInputLabel-outlined.Mui-focused': {
    ...focusedStyles,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'var(--btn-color)',
  },
  '& .MuiInputLabel-root': {
    ...labelStyles,
  },
  '& .MuiInputBase-input': {
    ...inputBaseStyles,
    padding: '14px 18px',
  },
};

export default inputFormTheme;
