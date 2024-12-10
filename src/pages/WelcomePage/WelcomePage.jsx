import { Link } from 'react-router-dom';
import img from '../../assets/manOnNotebook.png';
import sprite from '../../assets/sprite.svg';
import css from './WelcomePage.module.css';

export default function WelcomePage() {
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <img className={css.img} src={img} alt="t" />
        <div className={css.logo}>
          <svg className={css.logoIcon}>
            <use href={sprite + '#logo'}></use>
          </svg>
          <h2 className={css.title}>Task Pro</h2>
        </div>
      </div>
      <p className={css.text}>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don't wait, start achieving your goals now!
      </p>

      <div className={css.wrapperBtn}>
        <Link to="/auth/register">
          <button className={css.btnRegister} type="button" id="register">
            Registration
          </button>
        </Link>
        <button className={css.btnLogin} type="button" id="login">
          <Link to="/auth/login">Log in</Link>
        </button>
      </div>
    </div>
  );
}
