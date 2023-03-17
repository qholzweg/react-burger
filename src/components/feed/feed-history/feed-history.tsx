import { useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../hooks/store"
import { selectHistory } from "../../../services/reducers/selectors"
import OrderCard from "../order-card/order-card"
import styles from "./feed-history.module.css"
export const FeedHistory = () => {
  const { orders } = useAppSelector(selectHistory);
  const navigate = useNavigate();
  const location = useLocation();
  const handleDetailsOpen = (number: number) => {
    navigate('/profile/orders/' + number, { state: { background: location } });
  }

  return (
    <div className={styles.FeedOrders}>
      <h1 className="text text_type_main-medium mb-5">Лента заказов</h1>
      <div className="w-100">
        {orders.map((order, index) => (
          <div onClick={() => handleDetailsOpen(order.number)} key={index}>
            <OrderCard order={order} showStatus={true} />
          </div>
        ))}
      </div>
    </div>
  )
}