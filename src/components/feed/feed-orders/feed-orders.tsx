import { useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../hooks/store"
import { selectFeed } from "../../../services/reducers/selectors"
import { OrderCard } from "../order-card/order-card"
import styles from "./feed-orders.module.css"
export const FeedOrders = () => {
  const { orders } = useAppSelector(selectFeed);
  const navigate = useNavigate();
  const location = useLocation();
  const handleDetailsOpen = (number: number) => {
    navigate('/feed/' + number, { state: { background: location } });
  }

  return (
    <div className={styles.FeedOrders}>
      <h1 className="text text_type_main-medium mb-5">Лента заказов</h1>
      <div className={styles.orders}>
        {orders.map((order, index) => (
          <div onClick={() => handleDetailsOpen(order.number)} key={index}>
            <OrderCard order={order} key={index} />
          </div>
        ))}
      </div>
    </div>
  )
}