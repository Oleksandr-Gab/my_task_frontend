import Modal from 'react-modal';
import sprite from '../../assets/sprite.svg';
import css from './EditProfileModal.module.css';

Modal.setAppElement('#root');

const EditProfileModal = ({
  isOpen,
  onClose,
  user,
  handleFileChange,
  avatarFile,
  handleSubmit,
  userName,
  setUserName,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <Modal
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Profile"
    >
      <div className={css.modalContent}>
        <span className={css.spanClose} onClick={onClose}>
          <svg className={css.closeSvg} width="24px" height="24px">
            <use href={sprite + '#icon-x-close'}></use>
          </svg>
        </span>
        <h2 className={css.titleModal}>Edit Profile</h2>
        <div className={css.containerImg}>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
            id="avatarInput"
          />
          {avatarFile ? (
            <img
              className={css.userIcon}
              width="68px"
              height="79px"
              src={URL.createObjectURL(avatarFile)}
              alt="user"
            />
          ) : (
            <img
              className={css.avatar}
              width="68px"
              height="79px"
              src={user.avatarURL}
              alt="user"
            />
          )}
          <button
            type="button"
            onClick={() => document.getElementById('avatarInput').click()}
            className={css.plusBtn}
          >
            <svg className={css.plusSvg} width="10px" height="10px">
              <use href={sprite + '#icon-plus'}></use>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className={css.formUser}>
          <div>
            <input
              className={css.name}
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div>
            <input
              className={css.email}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              className={css.password}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button className={css.btnSend} type="submit">
            Send
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
