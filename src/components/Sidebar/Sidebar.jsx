import BoardList from '../BoardList/BoardList';
import HelpBox from '../HelpBox/HelpBox';
import LogoutButton from '../LogoutButton/LogoutButton';
import css from './Sidebar.module.css';
import Logo from '../Logo/Logo.jsx';

function Sidebar() {
  return (
    <div className={css.sidebar}>
      <div className={css.wrapper}>
        <Logo />
        <BoardList />
      </div>
      <div className={css.wrapper}>
        <HelpBox />
        <LogoutButton />
      </div>
    </div>
  );
}

export default Sidebar;
