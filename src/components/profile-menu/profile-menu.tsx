import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import styles from './profile-menu.module.css';
import { auth } from '../../services/api';

export const ProfileMenu = () => {
  const navigate = useNavigate();

  const onLogout = (e:React.SyntheticEvent) => {
    e.preventDefault();
    auth.logout().then(() => navigate('/login', { replace: true }));
  }

  if (!auth.isLoggedIn()) {
    return (
      <Navigate
        to={'/login'}
      />
    );
  }

  return (
    <ul className={styles.menu}>
      <li key='profile' className='text text_type_main-medium'><NavLink to="/profile" end>Профиль</NavLink></li>
      <li key='history' className='text text_type_main-medium text-secondary'><NavLink to='/profile/orders'>История заказов</NavLink></li>
      <li key='logout' className='text text_type_main-medium text-secondary'><button className='link' onClick={onLogout} >
        Выход
      </button></li>
    </ul>
  )
}