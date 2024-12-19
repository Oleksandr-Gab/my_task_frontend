import {
  selectBoards,
  selectError,
  selectLoading,
} from '../../redux/boards/selectors';
import { useSelector } from 'react-redux';

import BeatLoader from 'react-spinners/BeatLoader';

import AddNewBoard from '../AddNewBoard/AddNewBoard';
import BoardItem from '../BoardItem/BoardItem';

import css from './BoardList.module.css';

const BoardList = () => {
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const boards = useSelector(selectBoards);

  if (!Array.isArray(boards)) {
    return <BeatLoader color="#FFFFFF" />;
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>My boards</h2>
      <AddNewBoard />
      {isLoading ? (
        <div className={css.loader}>
          <BeatLoader color="rgba(255, 255, 255, 0.23)" width="50px" />
        </div>
      ) : error ? (
        <p>Error fetching boards</p>
      ) : (
        <ul className={css.list}>
          {boards.map(board => {
            return (
              <li key={board._id}>
                <BoardItem board={board} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BoardList;
