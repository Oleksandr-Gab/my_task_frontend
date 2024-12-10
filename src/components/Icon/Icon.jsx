import css from './Icon.module.css';
import sprite from '../../assets/sprite.svg';

export default function Icon({ id }) {
  return (
    <svg className={css.icon}>
      <use href={sprite + '#' + id}></use>
    </svg>
  );
}
