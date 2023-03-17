import styles from './order-details.module.css';
import doneImage from '../../../images/done.png';
import loader from '../../../images/ldr.svg';
import { useSelector } from 'react-redux';
import { selectOrder } from '../../../services/reducers/selectors';

export default function OrderDetails() {
  const { order, orderRequest, orderFailed } = useSelector(selectOrder);
  if (orderRequest) return (<div className={styles.loader}><img src={loader} /></div>);
  if (orderFailed) return ( <p className='text text_type-main_default text-error'>Что-то пошло не так, пожалуйста, проверьте подключение к интернет и попробуйте еще раз</p>);
  
  if (!order) return null;
  return (
    <div className={styles.OrderDetails}>
      {order.number && <>
        <p className={`${styles.orderId} text text_type_digits-large mb-8 text_glow`}>{order.number}</p>
        <p className='text text_type_main-medium'>идентификатор заказа</p>
      </>}

      <img src={doneImage} alt="Заказ принят" className='mt-15 mb-15' />
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text-secondary text_type_main-default'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
