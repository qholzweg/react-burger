import { BrowserRouter, Routes, Route, useLocation  } from 'react-router-dom';
import { ProtectedRouteElement } from './components/protected-route';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, OrdersPage, NotFound404, IngredientPage } from './pages';
import FeedPage from './pages/feed';

export default function App() {
  return (
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  );
}
function RoutesList () {
  const { state } = useLocation();
  
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<ProtectedRouteElement element={<LoginPage />} forAuthenticated={true} />} />
        <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage />} forAuthenticated={true} />} />
        <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} forAuthenticated={true} />} />
        <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} forAuthenticated={true} />} />
        <Route path="/feed" element={<ProtectedRouteElement element={<FeedPage />} />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersPage />} />} />
        <Route path="/ingredients/:id" element={ state?.keepDetailsModal ? <HomePage /> : <IngredientPage /> } />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
  )
}