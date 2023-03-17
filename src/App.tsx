import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import { ROUTE_ANY, ROUTE_FEED, ROUTE_FEED_ID, ROUTE_FORGOT, ROUTE_HISTORY, ROUTE_HISTORY_ID, ROUTE_INGREDIENT, ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_REGISTER, ROUTE_RESET, ROUTE_ROOT } from './utils/constants';

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
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  );
}

function RoutesList() {
  const location: {state: TModalState | null} = useLocation();

  return (
    <>
      <AppHeader />
      <Routes location={location.state?.background || location}>
        <Route path={ROUTE_ROOT} element={<HomePage />} />
        <Route path={ROUTE_LOGIN} element={<ProtectedRouteElement element={<LoginPage />} forAuthenticated={true} />} />
        <Route path={ROUTE_REGISTER} element={<ProtectedRouteElement element={<RegisterPage />} forAuthenticated={true} />} />
        <Route path={ROUTE_FORGOT} element={<ProtectedRouteElement element={<ForgotPasswordPage />} forAuthenticated={true} />} />
        <Route path={ROUTE_RESET} element={<ProtectedRouteElement element={<ResetPasswordPage />} forAuthenticated={true} />} />
        <Route path={ROUTE_FEED} element={<FeedPage />} />
        <Route path={ROUTE_FEED_ID} element={<OrderPage />} />
        <Route path={ROUTE_PROFILE} element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path={ROUTE_HISTORY} element={<ProtectedRouteElement element={<OrdersPage />} />} />
        <Route path={ROUTE_HISTORY_ID} element={<ProtectedRouteElement element={<OrderPage />} />} />
        <Route path={ROUTE_INGREDIENT} element={<IngredientPage />} />
        <Route path={ROUTE_ANY} element={<NotFound404 />} />
      </Routes>

      {location.state?.background && (
        <Routes>
          <Route path={ROUTE_INGREDIENT} element={<DetailsModal />} />
          <Route path={ROUTE_FEED_ID} element={<OrderModal />} />
          <Route path={ROUTE_HISTORY_ID} element={<OrderModal />} />
        </Routes>
      )}
    </>
  )
}

