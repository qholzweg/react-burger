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
  let total  = 0; 
  if (props.bun) total = props.bun.price * 2;
  if (props.filling.length) total += props.filling.reduce((acc, current) => acc + current.price, 0);
  
  return (
    <>
      <ul className={`${styles.constructorSection} pt-25 pl-10`} >
        {props.bun && 
        <li key={'topbun'} className={styles.topbun}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${props.bun.name} (верх)`}
            price={props.bun.price}
            thumbnail={props.bun.image_mobile}
          />
        </li>}
        {props.filling.length && 
        <li className={styles.filling} key='filling'>
          <ul>
            {props.filling.map((ingridient) => (
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
        {props.bun && 
        <li key={'bottombun'} className={styles.bottombun}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${props.bun.name} (низ)`}
            price={props.bun.price}
            thumbnail={props.bun.image_mobile}
          />
        </li>}
      </ul>
      <Order total={total} />
    </>
  );
}
BurgerConstructor.propTypes = {
  bun: ingridientsPropTypes,
  filling: PropTypes.arrayOf(ingridientsPropTypes),
}
export default BurgerConstructor;