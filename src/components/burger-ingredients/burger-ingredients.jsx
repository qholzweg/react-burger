import {useContext} from 'react';
import { Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Price from '../price/price';
import Modal from '../modal/modal';
import useModal from '../../hooks/use-modal';
import React from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientsContext } from '../../services/ingredientsContext';

const Ingredient = ({ingredient, onClick, count}) => (
  <li key={ingredient._id} onClick={() => onClick(ingredient)} className={`${styles.ingredient} mr-6 mb-8`}>
    {count && <Counter count={1} />}
    <img src={ingredient.image} alt={ingredient.name} className={`${styles.image} ml-4 mr-4`} />
    <Price price={ingredient.price} extraClass={styles.price} />
    <p className={`${styles.name} text text_type_main-default`} >{ingredient.name}</p>
  </li>
)

const IngredientsSection = ({title, collection, onIngredientClick}) => (
  <>
    <h2 className={`${styles.sectionTitle} text text_type_main-medium mb-6`}>{title}</h2>
    <ul className={`${styles.ingredientsSection} mb-10`}>
      {collection.map((ingredient) => (
        <Ingredient ingredient={ingredient} key={ingredient._id} count="1" onClick={onIngredientClick} />
      ))}
    </ul>
  </>
)

const BurgerIngredients = () => {
  const [state] = useContext(IngredientsContext);
  const { isOpen: isIngredientModalOpen, open: ingredientModalOpen, close: ingredientModalClose } = useModal(false);
  const [currentIngredient, setCurrentIngredient ] = React.useState();

  if (!state.ingredients && !state.ingredients.length) return;
  const ingredients = state.ingredients;

  const buns = ingredients.filter((el) => el.type === 'bun');
  const sauces = ingredients.filter((el) => el.type === 'sauce');
  const mains = ingredients.filter((el) => el.type === 'main');

  const handleClick = (ingredient) => {
    setCurrentIngredient(ingredient);
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
          <IngredientsSection title='Булки' collection={buns} onIngredientClick={handleClick} />
          <IngredientsSection title='Соусы' collection={sauces} onIngredientClick={handleClick} />
          <IngredientsSection title='Начинки' collection={mains} onIngredientClick={handleClick} />
        </div>
      </section>
      {isIngredientModalOpen && currentIngredient &&
        <Modal onClose={ingredientModalClose} title="Детали ингредиента">
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>}
    </>
  );
}

export default BurgerIngredients;