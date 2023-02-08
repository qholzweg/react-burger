import AppHeader from '../components/app-header/app-header';
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import styles from './orders.module.css'

export const OrdersPage = () => {
  return (
    <div className={styles.ResetPasswordPage}>
      <AppHeader />
      <main className={styles.main}>
      <aside>
          <ProfileMenu />
          <p className={styles.description}>В этом разделе вы можете
            изменить свои персональные данные</p>
        </aside>
        <article>История заказов</article>
      </main>
    </div>
  );
}