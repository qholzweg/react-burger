import { Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingridientsPropTypes from '../../utils/ingridients-prop-types';
import styles from './burger-ingredients.module.css';
import Price from '../price/price';
import Modal from '../modal/modal';
import useModal from '../../hooks/use-modal';
import React from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';

const Ingridient = ({ingridient, onClick, count}) => (
  <li key={ingridient._id} onClick={(e) => onClick(ingridient, e)} className={`${styles.ingridient} mr-6 mb-8`}>
    {count && <Counter count={1} />}
    <img src={ingridient.image} alt={ingridient.name} className={`${styles.image} ml-4 mr-4`} />
    <Price price={ingridient.price} extraClass={styles.price} />
    <p className={`${styles.name} text text_type_main-default`} >{ingridient.name}</p>
  </li>
)

const IngredientsSection = ({title, collection, onIngridientClick}) => (
  <>
    <h2 className={`${styles.sectionTitle} text text_type_main-medium mb-6`}>{title}</h2>
    <ul className={`${styles.ingridientsSection} mb-10`}>
      {collection.map((ingridient) => (
        <Ingridient ingridient={ingridient} key={ingridient._id} count="1" onClick={onIngridientClick} />
      ))}
    </ul>
  </>
)

const BurgerIngredients = ({ingridients}) => {

  const { isOpen: isIngredientModalOpen, open: ingredientModalOpen, close: ingredientModalClose } = useModal(false);
  const [currentIngridient, setCurrentIngridient ] = React.useState();

  const buns = ingridients.filter((el) => el.type === 'bun');
  const sauces = ingridients.filter((el) => el.type === 'sauce');
  const mains = ingridients.filter((el) => el.type === 'main');

  const handleClick = (ingridient) => {
    setCurrentIngridient(ingridient);
    ingredientModalOpen();
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
          <IngredientsSection title='Булки' collection={buns} onIngridientClick={handleClick} />
          <IngredientsSection title='Соусы' collection={sauces} onIngridientClick={handleClick} />
          <IngredientsSection title='Начинки' collection={mains} onIngridientClick={handleClick} />
        </div>
      </section>
      {isIngredientModalOpen && currentIngridient &&
        <Modal onClose={ingredientModalClose} title="Детали ингредиента">
          <IngredientDetails ingridient={currentIngridient} />
        </Modal>}
    </>
  );
}

BurgerIngredients.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientsPropTypes)
}
export default BurgerIngredients;