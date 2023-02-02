import styles from './profile.module.css';
import AppHeader from '../components/app-header/app-header';
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';



export const ProfilePage = () => {
  return (
    <div className={styles.ProfilePage}>
      <AppHeader />
      <main className={styles.main}>
        <aside>
          <ProfileMenu />
          <p className={styles.description}>В этом разделе вы можете
изменить свои персональные данные</p>
        </aside>
        <article>
        <form className={styles.loginForm}>
          <Input type='text' placeholder='Имя' extraClass='mb-6' icon='EditIcon' />
          <Input type='email' placeholder='Логин' extraClass='mb-6' icon='EditIcon' />
          <PasswordInput type='password' placeholder='Пароль' icon='EditIcon' extraClass='mb-6' />

        </form>
        </article>
      </main>
    </div>
  )
}