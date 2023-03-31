import { FeedOrders } from '../components/feed/feed-orders/feed-orders';
import { FeedTotal } from '../components/feed/feed-total/feed-total';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import styles from './feed.module.css';
import { feedConnect, feedDisconnect } from '../services/reducers/feed/actions';
import { WS_FEED } from '../utils/constants';
import { selectFeed } from '../services/reducers/selectors';
import { TWebsocketStatus } from '../services/types/types';
import { Preloader } from '../utils';
import { orderClose } from '../services/reducers/order-slice';

export default function FeedPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(feedConnect(WS_FEED));
    return () => {
      dispatch(feedDisconnect());
      dispatch(orderClose());
    };
  }, [dispatch]);
  const { status } = useAppSelector(selectFeed);

  return (
    <div className={styles.FeedPage}>
      {status !== TWebsocketStatus.ONLINE &&
        <div className="content-center">
          <Preloader />
        </div>
      }
      {status === TWebsocketStatus.ONLINE &&
        <main className='pl-5 pr-5 grid-2-cols'>
          <section className='feedSection'>
            <FeedOrders />
          </section>
          <section className='ordersSection'>
            <FeedTotal />
          </section>
        </main>
      }
    </div>
  )
}