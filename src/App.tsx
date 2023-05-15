import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRouteElement } from './components/protected-route';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, OrdersPage, NotFound404, IngredientPage, OrderPage } from './pages';
import FeedPage from './pages/feed';
import { getIngredients } from './services/reducers/ingredients-slice';
import DetailsModal from './components/modal/details-modal';
import { selectIngredients } from './services/reducers/selectors';
import AppHeader from './components/app-header/app-header';
import { Error, Preloader } from './utils';
import { useAppDispatch, useAppSelector } from './hooks/store';
import OrderModal from './components/modal/order-modal';

type TModalState = {
  background: Location;
}

export default function App() {
  const dispatch = useAppDispatch();
  const { ingredientsRequest, ingredientsFailed } = useAppSelector(selectIngredients);

  useEffect(
    () => {
      dispatch(getIngredients());
    }, [dispatch]
    );
  if (ingredientsRequest) { return <Preloader />; }
  if (ingredientsFailed) { return <Error />; }

  return (
      <RoutesList />
  );
}

function RoutesList() {
  const location: {state: TModalState | null} = useLocation();

  return (
    <>
      <AppHeader />
      <Routes location={location.state?.background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<ProtectedRouteElement element={<LoginPage />} forAuthenticated={true} />} />
        <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage />} forAuthenticated={true} />} />
        <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} forAuthenticated={true} />} />
        <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} forAuthenticated={true} />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<OrderPage />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersPage />} />} />
        <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={<OrderPage />} />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {location.state?.background && (
        <Routes>
          <Route path="/ingredients/:id" element={<DetailsModal />} />
          <Route path="/feed/:id" element={<OrderModal />} />
          <Route path="/profile/orders/:id" element={<OrderModal />} />
        </Routes>
      )}
    </>
  )
}

