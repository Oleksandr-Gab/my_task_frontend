import { useParams, Link, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { Box, Tabs, Tab } from '@mui/material';
import css from './AuthPage.module.css';

const AuthPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    navigate(`/auth/${newValue}`);
  };

  return (
    <Box className={css.customContainer}>
      <Tabs
        classes={{
          indicator: css.customTabsIndicator,
        }}
        value={id}
        onChange={handleChange}
      >
        <Tab
          label="Registration"
          value="register"
          component={Link}
          to="/auth/register"
          classes={{
            root: css.customTab,
            selected: css.customSelectedTab,
          }}
        />
        <Tab
          label="Log In"
          value="login"
          component={Link}
          to="/auth/login"
          classes={{
            root: css.customTab,
            selected: css.customSelectedTab,
          }}
        />
      </Tabs>
      {id === 'login' && <LoginForm />}
      {id === 'register' && <RegisterForm />}
    </Box>
  );
};

export default AuthPage;
