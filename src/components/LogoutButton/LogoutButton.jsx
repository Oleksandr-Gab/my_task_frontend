// import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { TbLogin2 } from 'react-icons/tb';
import css from './LogoutButton.module.css';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    window.location.href = '/';
  };

  return (
    <button className={css.btn} onClick={handleLogout}>
      <TbLogin2 className={css.icon} />
      Logout
    </button>
  );
};

export default LogoutButton;
