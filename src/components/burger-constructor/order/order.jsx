import { getOrder, ORDER_CLOSE, ORDER_OPEN } from '../../../services/actions/order';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order.module.css';
import Price from '../../price/price';
import Modal from '../../modal/modal';
import OrderDetails from '../order-details/order-details';
import { selectBurger, selectOrder } from '../../../services/reducers/selectors';

const findIds = (content) => [content.bun, ...content.filling].map((el) => el ? el._id : null)

export default function Order() {
  const dispatch = useDispatch();
  const { selected, total } = useSelector(selectBurger);
  const disabled = selected.bun ? false : true;
  const { orderRequest, orderFailed, isOrderModalOpen } = useSelector(selectOrder);

  const handleOrderOpen = () => {
    if (!disabled) {
      dispatch(getOrder(findIds(selected)));
      dispatch({type: ORDER_OPEN});
    }
  }
  const handleOrderClose = () => {
    dispatch({type: ORDER_CLOSE});
  }

  return (
    <>
      <div className={`${styles.order} mt-10`}>
        <Price price={total} size="medium" extraClass='mr-10' />
        <Button onClick={handleOrderOpen} htmlType="button" type="primary" size="medium" disabled={disabled}>
          Оформить заказ
        </Button>
      </div>
      {isOrderModalOpen &&
        <Modal onClose={handleOrderClose} >
          {orderRequest &&
            <p className='text text_type-main_default'>Пожалуйста, подождите</p>
          }
          {orderFailed &&
            <p className='text text_type-main_default text-error'>Что-то пошло не так, пожалуйста, проверьте подключение к интернет и попробуйте еще раз</p>
          }
          {!orderRequest && !orderFailed &&
            <OrderDetails />
          }
        </Modal>}
    </>
  )
}