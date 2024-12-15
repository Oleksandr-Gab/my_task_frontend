import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  ButtonBase,
} from '@mui/material';

import noBackground from '../../assets/icons/backgroundicon/no_background.jpg';
import background1 from '../../assets/icons/backgroundicon/background1.jpg';
import background2 from '../../assets/icons/backgroundicon/background2.jpg';
import background3 from '../../assets/icons/backgroundicon/background3.jpg';
import background4 from '../../assets/icons/backgroundicon/background4.jpg';
import background5 from '../../assets/icons/backgroundicon/background5.jpg';
import background6 from '../../assets/icons/backgroundicon/background6.jpg';
import background7 from '../../assets/icons/backgroundicon/background7.jpg';
import background8 from '../../assets/icons/backgroundicon/background8.jpg';
import background9 from '../../assets/icons/backgroundicon/background9.jpg';
import background10 from '../../assets/icons/backgroundicon/background10.jpg';
import background11 from '../../assets/icons/backgroundicon/background11.jpg';
import background12 from '../../assets/icons/backgroundicon/background12.jpg';
import background13 from '../../assets/icons/backgroundicon/background13.jpg';
import background14 from '../../assets/icons/backgroundicon/background14.jpg';
import background15 from '../../assets/icons/backgroundicon/background15.jpg';

const backgrounds = [
  { id: '0', path: noBackground, alt: 'No Background' },
  { id: '1', path: background1, alt: 'Background 1' },
  { id: '2', path: background2, alt: 'Background 2' },
  { id: '3', path: background3, alt: 'Background 3' },
  { id: '4', path: background4, alt: 'Background 4' },
  { id: '5', path: background5, alt: 'Background 5' },
  { id: '6', path: background6, alt: 'Background 6' },
  { id: '7', path: background7, alt: 'Background 7' },
  { id: '8', path: background8, alt: 'Background 8' },
  { id: '9', path: background9, alt: 'Background 9' },
  { id: '10', path: background10, alt: 'Background 10' },
  { id: '11', path: background11, alt: 'Background 11' },
  { id: '12', path: background12, alt: 'Background 12' },
  { id: '13', path: background13, alt: 'Background 13' },
  { id: '14', path: background14, alt: 'Background 14' },
  { id: '15', path: background15, alt: 'Background 15' },
];

const BackgroundSelector = ({ setSelectedBackground }) => {
  const [selectedBackgroundLocal, setSelectedBackgroundLocal] = useState('');

  const handleChange = id => {
    setSelectedBackground(id);
    setSelectedBackgroundLocal(id);
  };

  return (
    <FormControl component="fieldset" sx={{ mt: 2 }}>
      <FormLabel
        component="legend"
        style={{
          marginBottom: '10px',
          color: 'var(--text-color)',
        }}
      >
        Choose a Background
      </FormLabel>
      <RadioGroup
        row
        value={selectedBackgroundLocal}
        onChange={e => handleChange(e.target.value)}
        style={{
          marginLeft: '10px',
        }}
      >
        {backgrounds.map(background => (
          <FormControlLabel
            key={background.id}
            value={background.id}
            control={<Radio style={{ display: 'none' }} />}
            label={
              <ButtonBase
                onClick={() => handleChange(background.id)}
                className={
                  selectedBackgroundLocal === background.id
                    ? 'selected-background'
                    : ''
                }
              >
                <img
                  src={background.path}
                  alt={background.alt}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    padding: '1px',
                    border:
                      selectedBackgroundLocal === background.id
                        ? '2px solid var(--btn-color)'
                        : 'none',
                  }}
                />
              </ButtonBase>
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default BackgroundSelector;
