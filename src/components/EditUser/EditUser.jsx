import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../redux/auth/operations';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import css from './EditUser.module.css';

const EditUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);

  const handleFileChange = e => {
    const file = e.target.files[0];
    setAvatarFile(file);
  };

  const handleSubmit = async e => {
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    if (password) formData.append('password', password);
    if (avatarFile) formData.append('avatar', avatarFile);

    await dispatch(editUser(formData));
    setIsModalOpen(false);
  };

  return (
    <div className={css.userInfoWrap}>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={css.editProfileButton}
      >
        <span className={css.userName}>{user.userName}</span>
        <img
          src={avatarFile ? URL.createObjectURL(avatarFile) : user.avatarURL}
          alt="user avatar"
          className={css.userAvatar}
        />
      </button>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        handleFileChange={handleFileChange}
        avatarFile={avatarFile}
        handleSubmit={handleSubmit}
        userName={userName}
        setUserName={setUserName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};

export default EditUser;
