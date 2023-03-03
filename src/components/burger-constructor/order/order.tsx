import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order.module.css';
import Price from '../../price/price';
import Modal from '../../modal/modal';
import OrderDetails from '../order-details/order-details';
import { selectBurger, selectOrder } from '../../../services/reducers/selectors';
import { auth } from '../../../services/api';
import { getOrder, orderClose } from '../../../services/reducers/order-slice';
import { TBurgerContent } from '../../../utils/types';

const findIds = (content: TBurgerContent) => [content.bun, ...content.filling].map((el) => el ? el._id : null)

export default function Order() {
  const dispatch = useDispatch();
  //TODO: type check this
  const { selected, total } = useSelector<any, any>(selectBurger);
  const { orderRequest, orderFailed, isOrderModalOpen } = useSelector(selectOrder);
  const isLoggedIn = auth.isLoggedIn();
  const disabled = selected.bun && isLoggedIn ? false : true;

  const handleOrderOpen = () => {
    if (!disabled) {
      //TODO: type check this
      /* @ts-ignore:next-line */
      dispatch<any>(getOrder(findIds(selected)));
    }
  }
  const handleOrderClose = () => {
    dispatch(orderClose());
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
