import { useEffect } from 'react';
import { FeedHistory } from '../components/feed/feed-history/feed-history';
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import { useAppDispatch } from '../hooks/store';
import { auth } from '../services/api';
import { historyConnect, historyDisconnect } from '../services/reducers/history/actions';
import { orderClose } from '../services/reducers/order-slice';
import { WS_MY_ORDERS } from '../utils/constants';
import styles from './orders.module.css'
export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const token = auth.getToken();
  useEffect(() => {
    dispatch(historyConnect(`${WS_MY_ORDERS}?token=${token}`));
    return () => {
      dispatch(historyDisconnect())
      dispatch(orderClose());
    };
  }, [dispatch, token]);
  return (
    <div className={styles.ResetPasswordPage}>
      <main className={styles.main}>
      <aside>
          <ProfileMenu />
          <p className={styles.description}>В этом разделе вы можете
            изменить свои персональные данные</p>
        </aside>
        <article className='w-100'><FeedHistory /></article>
      </main>
    </div>
  );
}