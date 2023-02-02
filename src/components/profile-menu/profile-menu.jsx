import { Link, NavLink } from 'react-router-dom';
import styles from './profile-menu.module.css';

export const ProfileMenu = () => {
  return (
    <ul className={styles.menu}>
      <li key='profile' className='text text_type_main-medium'><NavLink to="/profile">Профиль</NavLink></li>
      <li key='history' className='text text_type_main-medium text-secondary'><NavLink to='/profile/orders'>История заказов</NavLink></li>
      <li key='logout' className='text text_type_main-medium text-secondary'><Link to='/logout'>Выход</Link></li>
    </ul>
  )
}