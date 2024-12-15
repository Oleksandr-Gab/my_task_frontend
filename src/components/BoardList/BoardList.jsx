import { selectBoards } from '../../redux/boards/selectors';
import { useSelector } from 'react-redux';

import BeatLoader from 'react-spinners/BeatLoader';
import AddNewBoard from '../AddNewBoard/AddNewBoard';
import BoardItem from '../BoardItem/BoardItem';

import css from './BoardList.module.css';
import { useEffect, useState } from 'react';

const BoardList = () => {
  const isLoading = useSelector(state => state.boards.loading);
  const error = useSelector(state => state.boards.error);
  const boards = useSelector(selectBoards);

  // useEffect(() => {
  //   if (boards.length == 0) return;
  //   setArrBoards
  // }, [boards]);

  console.log(boards[0]._id);

  if (!Array.isArray(boards)) {
    return <BeatLoader color="#FFFFFF" />;
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>My boards</h2>
      <AddNewBoard />
      {boards.length !== 0 && (
        <ul className={css.list}>
          {boards.length != 0 &&
            boards.map(board => {
              return (
                <li key={board._id}>
                  <BoardItem board={board} />
                </li>
              );
            })}
        </ul>
      )}

      {/* {isLoading ? (
        <div className={css.loader}>
          <BeatLoader color="rgba(255, 255, 255, 0.23)" width="50px" />
        </div>
      ) : error ? (
        <p>Error fetching boards</p>
      ) : (
        <ul className={css.list}>
          {boards.length != 0 &&
            boards.map(board => {
              return (
                <li key={board._id}>
                  <BoardItem board={board} />
                </li>
              );
            })}
        </ul>
      )} */}
    </div>
  );
};

export default BoardList;
