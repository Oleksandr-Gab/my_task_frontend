import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Icon from '../Icon/Icon';

function IconSelector({ selectedIcon, setSelectedIcon }) {
  return (
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
                  width: '16px',
                  height: '16px',
                }}
              >
                <Icon id={iconId} />
              </div>
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default IconSelector;
