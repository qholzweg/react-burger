import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { ProtectedRouteElement } from './components/protected-route';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, OrdersPage, NotFound404 } from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<ProtectedRouteElement element={<LoginPage />} forAuthenticated={true} />} />
        <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage />} forAuthenticated={true} />} />
        <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} forAuthenticated={true} />} />
        <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} forAuthenticated={true} />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersPage />} />} />
        <Route path="/ingredients/:id" element={ <HomePage /> } />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
}