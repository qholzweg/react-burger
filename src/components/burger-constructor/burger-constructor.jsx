import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingridientsPropTypes from '../../utils/ingridients-prop-types';
import styles from './burger-constructor.module.css';
import Price from '../price/price';

const Order = (props) => (
  <div className={`${styles.order} mt-10`}>
    <Price price={props.total} size="medium" extraClass='mr-10' />
    <Button htmlType="button" type="primary" size="medium">
      Оформить заказ
    </Button>
  </div>
)

const BurgerConstructor = (props) => {

  const bun = props.ingridients.find((el) => el.type === 'bun');
  const filling = props.ingridients.filter((el) => el.type === 'sauce' || el.type === 'main');

  const total = bun.price * 2 + filling.reduce((acc, current) => acc + current.price, 0);

  return (
    <>
      <ul className={`${styles.constructorSection} pt-25 pl-10`} >
        <li key={'topbun'} className={styles.topbun}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </li>
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
        </li>
        <li key={'bottombun'} className={styles.bottombun}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </li>
      </ul>
      <Order total={total} />
    </>
  );
}
BurgerConstructor.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientsPropTypes)
}
export default BurgerConstructor;