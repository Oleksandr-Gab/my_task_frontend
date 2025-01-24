import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Header from '../../components/Header/Header.jsx';
import ScreensPage from '../../pages/ScreensPage/ScreensPage.jsx';

import { ToastContainer } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchBoards, getBoard } from '../../redux/boards/operations';
import css from './HomePage.module.css';
import { selectBoards, selectOneBoard } from '../../redux/boards/selectors.js';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(selectBoards);
  const board = useSelector(selectOneBoard);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  useEffect(() => {
    if (boards.length == 0) return;
    dispatch(getBoard(boards[0]._id));
  }, [boards, dispatch]);

  useEffect(() => {
    navigate(`/home/${board.title}`);
  }, [navigate, board]);

  return (
    <div className={css.div}>
      <div className={css.sidebar}>
        <Sidebar />
      </div>

      <div>
        <Header className={css.header} />
        <ScreensPage className={css.screensPage} />
      </div>
      <ToastContainer />
    </div>
  );
}
