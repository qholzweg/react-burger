import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order.module.css';
import Price from '../../price/price';
import Modal from '../../modal/modal';
import OrderDetails from '../order-details/order-details';
import { selectBurger, selectOrder } from '../../../services/reducers/selectors';
import { auth } from '../../../services/api';
import { createOrder, orderClose } from '../../../services/reducers/order-slice';
import { TBurgerContent } from '../../../services/types/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { useNavigate } from 'react-router-dom';
import { clearConstructor } from '../../../services/reducers/burger-slice';

const findIds = (content: TBurgerContent) => [content.bun, ...content.filling].map((el) => el ? el._id : null)

export default function Order() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { selected, total } = useAppSelector(selectBurger);
  const { isOrderModalOpen } = useAppSelector(selectOrder);
  const isLoggedIn = auth.isLoggedIn();
  const disabled = selected.bun === null;

  const handleOrderOpen = () => {
    if(!isLoggedIn) {
      navigate('/login');
      return;
    }
    const ids = findIds(selected);
    if (!disabled) {
      dispatch(createOrder(ids)).then(
        //dispatch(clearConstructor())
      );
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
            <OrderDetails />
        </Modal>}
    </>
  )
}
