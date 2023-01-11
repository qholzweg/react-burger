import { Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingridientsPropTypes from '../../utils/ingridients-prop-types';
import styles from './burger-ingredients.module.css';
import Price from '../price/price';
import Modal from '../modal/modal';
import useModal from '../../hooks/use-modal';
import React, { useState } from 'react';
import OrderDetails from '../order-details/order-details';

const Ingridient = (props) => (
  <li key={props.ingridient._id} onClick={(e) => props.onClick(props.ingridient, e)} className={`${styles.ingridient} mr-6 mb-8`}>
    <Counter count={1} size="small" />
    <img src={props.ingridient.image} alt={props.ingridient.name} className={`${styles.image} ml-4 mr-4`} />
    <Price price={props.ingridient.price} extraClass={styles.price} />
    <p className={`${styles.name} text text_type_main-default`} >{props.ingridient.name}</p>
  </li>
)

const Section = (props) => (
  <>
    <h2 className={`${styles.sectionTitle} text text_type_main-medium mb-6`}>{props.title}</h2>
    <ul className={`${styles.ingridientsSection} mb-10`}>
      {props.collection.map((ingridient) => (
        <Ingridient ingridient={ingridient} key={ingridient._id} onClick={props.onIngridientClick} />
      ))}
    </ul>
  </>
)

const BurgerIngredients = (props) => {

  const { isOpen, open, close } = useModal(true);
  const [currentIngridient, setCurrentIngridient ] = React.useState();

  const buns = props.ingridients.filter((el) => el.type === 'bun');
  const sauces = props.ingridients.filter((el) => el.type === 'sauce');
  const mains = props.ingridients.filter((el) => el.type === 'main');

  const handleClick = (ingridient) => {
    setCurrentIngridient(ingridient);
    open();
  }

  return (
    <>
      <section className={`${styles.mainSection} pt-10 pb-10`}>
        <h1 className={`${styles.title} text text_type_main-large mb-5`}>Соберите бургер</h1>
        <div className={`${styles.tabs} mb-10`}>
          <Tab value="bun" active={true}>
            Булки
          </Tab>
          <Tab value="sauce">
            Соусы
          </Tab>
          <Tab value="main">
            Начинки
          </Tab>
        </div>
        <div className={styles.content}>
          <Section title='Булки' collection={buns} onIngridientClick={handleClick} />
          <Section title='Соусы' collection={sauces} onIngridientClick={handleClick} />
          <Section title='Начинки' collection={mains} onIngridientClick={handleClick} />
        </div>
      </section>
      {isOpen && currentIngridient &&
        <Modal onClose={close} title="Детали ингредиента">
          <OrderDetails ingridient={currentIngridient} />
        </Modal>}
    </>
  );
}

BurgerIngredients.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientsPropTypes)
}
export default BurgerIngredients;