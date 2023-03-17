import { FC, useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../hooks/store"
import { selectIngredients } from "../../../services/reducers/selectors"
import { formatDate } from "../../../utils/format-date"
import { TIngredient, TOrder } from "../../../services/types/types"
import Price from "../../../components/price/price"
import styles from "./order-card.module.css"
import { OrderStatus } from "./order-status"
export const OrderCard: FC<{ order: TOrder, showStatus?: boolean }> = ({ order, showStatus = false }) => {

  const { all } = useAppSelector(selectIngredients);
  const maxIngredients = 5;

  const orderInfo = useMemo(() => {

    if (!all.length && !order.ingredients) return null;

    const orderIngredients = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = all.find(ing => ing._id === item);
        if (ingredient) return [...acc, ingredient]
        return acc;
      }, []
    );

    const toShow = orderIngredients?.slice(0, maxIngredients);

    const total = orderIngredients?.reduce((acc, item) => acc + item.price, 0);

    const extra = orderIngredients.length > maxIngredients ? orderIngredients.length - maxIngredients : 0;

    const date = formatDate(new Date(order.createdAt));

    return {
      ...order,
      orderIngredients,
      toShow,
      total,
      extra,
      date
    }

  }, [order, all]);

  if (!orderInfo) return null;



  return (
    <div className={styles.OrderCard}>
      <div className={`${styles.meta} flex-between`}>
        <span className="number text text_type_digits-default">#{order.number}</span>
        <span className="date text-secondary text-right">{orderInfo.date}</span>
      </div>
      <div className={styles.title}>
        <h2 className={`${styles.title} text_type_main-medium`}>{order.name}</h2>
        {showStatus &&
          <OrderStatus status={orderInfo.status} />
        }
      </div>
      <div className={`${styles.bottom_row} flex-between`}>
        <ul className={styles.ingredients}>
          {orderInfo.toShow.map((item, index) => {
            const zIndex = maxIngredients - index;
            const left = 48 * index;
            return (
              <li
                className={styles.img_wrap}
                style={{ zIndex: zIndex, left: left }}
                key={index}
              >
                <img
                  style={{
                    opacity:
                      orderInfo.extra && maxIngredients === index + 1 ? ".5" : "1"
                  }}
                  className={styles.thumb}
                  src={item.image_mobile}
                  alt={item.name}
                />
                {maxIngredients === index + 1 &&
                  <span className="text text_type_digits-default">
                    {orderInfo.extra > 0 && `+${orderInfo.extra}`}
                  </span>
                }
              </li>
            )
          })}
        </ul>
        <div><Price price={orderInfo.total} /></div>
      </div>
    </div>
  )
}