import { useState, useEffect } from 'react';
import MainDashboard from '../../components/MainDashboard/MainDashboard';
import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard';
import { selectBoards, selectOneBoard } from '../../redux/boards/selectors.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.jsx';

import css from './ScreensPage.module.css';
import { useSelector } from 'react-redux';
import BlankBoard from '../../components/BlankBoard/BlankBoard';

export default function ScreensPage() {
  const [devise, setDevise] = useState('');
  const isRowMobile = useMediaQuery('(max-width: 768px)');
  const isRowTable = useMediaQuery('(max-width: 1440px)');
  const boards = useSelector(selectBoards);
  const board = useSelector(selectOneBoard);

  useEffect(() => {
    if (boards.length == 0) {
      setDevise('');
      return;
    }
    if (isRowMobile) {
      setDevise('Mobile');
    } else if (isRowTable) {
      setDevise('Tablet');
    } else {
      setDevise('Desktop');
    }
  }, [isRowMobile, isRowTable, boards]);

  const backgroundImg = {
    backgroundImage: `url('../../../img/${devise}-${board.background}.jpg')`,
  };

  return (
    <div className={css.screensPage} style={backgroundImg}>
      <HeaderDashboard />
      {boards.length != 0 ? <MainDashboard /> : <BlankBoard />}
    </div>
  );
}
