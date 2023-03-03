import styles from './order-details.module.css';
import doneImage from '../../../images/done.png';
import { useSelector } from 'react-redux';
import { selectOrder } from '../../../services/reducers/selectors';

export default function OrderDetails() {
  const { order: { order } } = useSelector(selectOrder);
  return (
    <div className={styles.OrderDetails}>
      {order.number && <>
        <p className={`${styles.orderId} text text_type_digits-large mb-8`}>{order.number}</p>
        <p className='text text_type_main-medium'>идентификатор заказа</p>
      </>}

      <img src={doneImage} alt="Заказ принят" className='mt-15 mb-15' />
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text-secondary text_type_main-default'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
