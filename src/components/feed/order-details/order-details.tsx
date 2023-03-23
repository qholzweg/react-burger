import { FC, useMemo } from "react"
import { useAppSelector } from "../../../hooks/store"
import { selectIngredients } from "../../../services/reducers/selectors"
import { formatDate } from "../../../utils/format-date"
import { TIngredient, TOrder } from "../../../services/types/types"
import { OrderStatus } from "../order-card/order-status"
import Price from "../../../components/price/price"
import styles from "./order-details.module.css"
export const OrderDetails: FC<{ order: TOrder, extraClass?: string }> = ({ order, extraClass }) => {

  const { all } = useAppSelector(selectIngredients);

  const orderInfo = useMemo(() => {

    if (!all.length && typeof order.ingredients === 'undefined') return null;

    const orderIngredients = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        if (acc.find(ing => ing._id === item)) return acc;
        let ingredient = all.find(ing => ing._id === item);
        if (ingredient) {
          const out = { ...ingredient, __v: order.ingredients.filter(ing => ing === item).length }
          return [...acc, out]
        }
        return acc;
      }, []
    );


    const total = orderIngredients?.reduce((acc, item) => acc + item.price, 0);

    const date = formatDate(new Date(order.createdAt));

    return {
      ...order,
      orderIngredients,
      total,
      date
    }

  }, [order, all]);

  if (!orderInfo) return null;


  return (
    <div className={`${styles.order_details} ${extraClass}`}>
      <div className={styles.order_number}>
        <span className="number text text_type_digits-default">#{order.number}</span>
      </div>
      <div>
        <h2 className={`${styles.title} text_type_main-medium`}>{order.name}</h2>
        <OrderStatus status={order.status} />
      </div>
      <div className="contets w-100">
        <h2 className={`${styles.contents_title} text_type_main-medium`}>Состав:</h2>
        <ul className={styles.ingredients}>
          {orderInfo.orderIngredients.map((item, index) => {
            return (
              <li
                className={styles.ingredient}
                key={index}
              >
                <div className={styles.img_wrap}>
                  <img
                    className={styles.thumb}
                    src={item.image_mobile}
                    alt={item.name}
                  />
                </div>
                <p className={styles.ing_name}>{item.name}</p>
                <div className={styles.price}><Price qty={item.__v} price={item.price} /></div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex-between">
        <span className="date text-secondary">{orderInfo.date}</span>
        <Price price={orderInfo.total} />
      </div>
    </div>
  )
}