import EditUser from '../EditUser/EditUser';
import { useState } from 'react';
import css from './Header.module.css';
import { Navigation } from '../Navigation/Navigation';
import ChangeTheme from '../ChangeTheme/ChangeTheme';
import Icon from '../Icon/Icon';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleEditClick = () => {
  //     setIsModalOpen(true);
  //    };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [isOpen, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };

  return (
    <header className={css.header}>
      <div
        className={css.menuBurger}
        type="button"
        onClick={() => setOpen(!isOpen)}
        aria-label="navigation"
      >
        <Icon id={'menu-01'} />
      </div>
      {isOpen && <Navigation close={close} />}
      <div className={css.userWrapper}>
        <ChangeTheme />
        <EditUser isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </header>
  );
};

export default Header;
