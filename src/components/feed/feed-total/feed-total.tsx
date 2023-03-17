import { useMemo } from "react"
import { useAppSelector } from "../../../hooks/store";
import { selectFeed } from "../../../services/reducers/selectors";
import styles from "./feed-total.module.css"

export const FeedTotal = () => {

  const { orders, total, totalToday } = useAppSelector(selectFeed);

  const ordersList = useMemo(() => {
    const ready = orders.filter(item => item.status === 'done').slice(0,10);
    const in_work = orders.filter(item => item.status === 'pending');
    return { ready, in_work }
  }, [orders]);

  return (
    <div className={`${styles.orders_total} pl-15`}>
      {orders.length &&
        <div className="orders_list mb-15 flex-between">
          <div className="ready">
            <h4 className="text text_type_main-medium mb-5">Готовы:</h4>
            <ul className={styles.order_numbers_list}>
              {ordersList.ready.map((order, index) => (
                <li key={index} className={`${styles.ready} text text-success mb-2 mr-6 text_type_digits-default`}>
                  {order.number}
                </li>
              ))}

            </ul>
          </div>
          <div className="in_work">
            <h4 className="text text_type_main-medium mb-5">В работе:</h4>
            <ul className={styles.order_numbers_list}>
              {ordersList.in_work.map((order, index) => (
                <li key={index} className={`${styles.in_work} text mb-2 text_type_digits-default`}>
                  {order.number}
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
      <div className={`${styles.total} mb-15`}>
        <h4 className="text text_type_main-medium">Выполнено за все время:</h4>
        <p className="text text_type_digits-large text_glow">{total}</p>
      </div>
      <div className={`${styles.ready} mb-15`}>
        <h4 className="text text_type_main-medium">Выполнено за сегодня:</h4>
        <p className="text text_type_digits-large text_glow">{totalToday}</p>
      </div>

    </div>
  )
}