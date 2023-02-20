import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRouteElement } from './components/protected-route';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, OrdersPage, NotFound404, IngredientPage } from './pages';
import FeedPage from './pages/feed';
import { getIngredients } from './services/reducers/ingredients-slice';
import DetailsModal from './components/details-modal';
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectIngredients } from './services/reducers/selectors';
import AppHeader from './components/app-header/app-header';

const Preloader = () => (
  <div className="message">
    <p className="text text_type_main-medium"><InfoIcon type="primary" /> Пожалуйста, подождите...</p>
  </div>
)
const Error = () => (
  <div className="message">
    <p className="text text-error text_type_main-medium"><InfoIcon type="error" /> Что-то пошло не так, пожалуйста, проверьте подключение к интернет и попробуйте еще раз</p>
  </div>
)

export default function App() {
  const dispatch = useDispatch();
  const { ingredientsRequest, ingredientsFailed } = useSelector(selectIngredients);

  useEffect(
    () => {
      dispatch(getIngredients());
    }, [dispatch]
  );
  console.log(ingredientsRequest);
  if (ingredientsRequest) { return <Preloader />; }
  if (ingredientsFailed) { return <Error />; }

  return (
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  );
}

function RoutesList() {
  const location = useLocation();
  // let state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <AppHeader />
      <Routes location={location.state?.backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<ProtectedRouteElement element={<LoginPage />} forAuthenticated={true} />} />
        <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage />} forAuthenticated={true} />} />
        <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} forAuthenticated={true} />} />
        <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} forAuthenticated={true} />} />
        <Route path="/feed" element={<ProtectedRouteElement element={<FeedPage />} />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersPage />} />} />
        <Route path="/ingredients/:id" element={location.state?.keepDetailsModal ? <HomePage /> : <IngredientPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {location.state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<DetailsModal />} />
        </Routes>
      )}
    </>
  )
}

