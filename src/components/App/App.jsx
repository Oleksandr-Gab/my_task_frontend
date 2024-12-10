import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
// -------------------------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from '../../redux/auth/operations';
import { selectIsRefreshing } from '../../redux/auth/selectors';
// --------------------------------------------------------------

import PrivateRoute from '../PrivateRoute.jsx';
import RestrictedRoute from '../RestrictedRoute.jsx';

import Layout from '../Layout/Layout.jsx';
import LoginForm from '../LoginForm/LoginForm.jsx';
import RegisterForm from '../RegisterForm/RegisterForm.jsx';
import { IsRefreshingComponent } from '../../components/IsRefreshingComponent/IsRefreshingComponent';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const AuthPage = lazy(() => import('../../pages/AuthPage/AuthPage.jsx'));
const WelcomePage = lazy(() =>
  import('../../pages/WelcomePage/WelcomePage.jsx')
);
const ScreensPage = lazy(() =>
  import('../../pages/ScreensPage/ScreensPage.jsx')
);
const NotFoundPage = lazy(() => import('../../pages/NotFound/NotFound.jsx'));

export default function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<IsRefreshingComponent />}>
        <Routes>
          <Route
            path="/"
            element={<RestrictedRoute component={<WelcomePage />} />}
          />
          <Route
            path="/auth/:id"
            element={<RestrictedRoute component={<AuthPage />} />}
          >
            <Route
              path="login"
              element={<RestrictedRoute component={<LoginForm />} />}
            />
            <Route
              path="register"
              element={<RestrictedRoute component={<RegisterForm />} />}
            />
          </Route>
          <Route
            path="/home"
            element={<PrivateRoute component={<HomePage />} redirectTo="/" />}
          />
          <Route
            path="/home/:boardId"
            element={<PrivateRoute component={<HomePage />} redirectTo="/" />}
          >
            <Route path="boardId" element={<ScreensPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
