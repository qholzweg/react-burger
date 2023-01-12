import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingridientsPropTypes from '../../utils/ingridients-prop-types';
import styles from './burger-constructor.module.css';
import Price from '../price/price';
import Modal from '../modal/modal';
import useModal from '../../hooks/use-modal';
import OrderDetails from '../order-details/order-details';

const Order = (props) => {
  const { isOpen: isOrderModalOpen, open: orderModalOpen, close: orderModalClose } = useModal(false);

  return (
    <>
      <div className={`${styles.order} mt-10`}>
        <Price price={props.total} size="medium" extraClass='mr-10' />
        <Button onClick={orderModalOpen} htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
      {isOrderModalOpen &&
        <Modal onClose={orderModalClose} >
          <OrderDetails />
        </Modal>}
    </>
  )
}

const BurgerConstructor = ({ingridients}) => {

  const bun = ingridients.find((el) => el.type === 'bun');
  const filling = ingridients.filter((el) => el.type === 'sauce' || el.type === 'main');

  let total = 0;
  if (bun) total = bun.price * 2;
  if (filling.length) total += filling.reduce((acc, current) => acc + current.price, 0);

  return (
    <>
      <ul className={`${styles.constructorSection} pt-25 pl-10`} >
        {bun &&
          <li key={'topbun'} className={styles.topbun}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          </li>}
        {filling.length &&
          <li className={styles.filling} key='filling'>
            <ul>
              {filling.map((ingridient) => (
                <li key={ingridient._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingridient.name}
                    price={ingridient.price}
                    thumbnail={ingridient.image_mobile}
                    extraClass="ml-9"
                  />
                </li>
              ))}
            </ul>
          </li>}
        {bun &&
          <li key={'bottombun'} className={styles.bottombun}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          </li>}
      </ul>
      <Order total={total} />
    </>
  );
}
BurgerConstructor.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientsPropTypes)
}
export default BurgerConstructor;