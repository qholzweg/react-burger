import React, { useEffect, useRef, useMemo } from 'react';
import { Counter, Tab, InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Price from '../price/price';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import { DELETE_CURRENT_INGREDIENT, SET_CURRENT_TAB, getIngredients, openDetails, DETAILS_CLOSE } from '../../services/actions/burger';
import { useDrag } from 'react-dnd';

const Ingredient = ({ ingredient, count }) => {
  const dispatch = useDispatch();
  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: { id: ingredient._id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  const handleDetailsOpen = () => {
    dispatch(openDetails({ id: ingredient._id }));
  }
  return (
    <li key={ingredient._id} ref={ref} style={{ opacity: opacity }} onClick={handleDetailsOpen} className={`${styles.ingredient} mr-6 mb-8`}>
      {count !== 0 && <Counter count={count} />}
      <img src={ingredient.image} alt={ingredient.name} className={`${styles.image} ml-4 mr-4`} />
      <Price price={ingredient.price} extraClass={styles.price} />
      <p className={`${styles.name} text text_type_main-default`} >{ingredient.name}</p>
    </li>
  )
}

const IngredientsSection = React.forwardRef(({ title, sectionName, collection, onIngredientClick }, ref) => {
  const content = useMemo(
    () => collection.map((ingredient) => (
      <Ingredient ingredient={ingredient} key={ingredient._id} count={ingredient.__v} />
    )), [collection]
  );
  return (
    <section>
      <h2 ref={ref} id={sectionName} className={`${styles.sectionTitle} text text_type_main-medium mb-6`}>{title}</h2>
      <ul className={`${styles.ingredientsSection} mb-10`}>
        {content}
      </ul>
    </section>
  )
}
);

const BurgerIngredients = () => {
  const { all, ingredientsRequest, ingredientsFailed, currentTab } = useSelector(state => state.ingredients);
  const { isDetailsModalOpen, currentIngredient } = useSelector(state => state.details);
  const dispatch = useDispatch();

  const sectionRef = useRef();
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  const activateTab = (scrollTop) => {
    const boundary = 20;
    if (Math.abs(bunRef.current.offsetTop - scrollTop) <= boundary) {
      dispatch({ type: SET_CURRENT_TAB, tab: 'buns' });
    } else if (Math.abs(sauceRef.current.offsetTop - scrollTop) <= boundary) {
      dispatch({ type: SET_CURRENT_TAB, tab: 'sauces' })
    } else if (Math.abs(mainRef.current.offsetTop - scrollTop) <= boundary) {
      dispatch({ type: SET_CURRENT_TAB, tab: 'main' })
    }
  }

  const setCurrentTab = (tab) => {
    document.getElementById(tab).scrollIntoView({ behavior: 'smooth' });
  }

  const onScroll = (e) => {
    activateTab(e.target.scrollTop);
  }

  useEffect(
    () => {
      dispatch(getIngredients());
    }, [dispatch]
  );


  const buns = all.length ? all.filter((el) => el.type === 'bun') : [];
  const sauces = all.length ? all.filter((el) => el.type === 'sauce') : [];
  const mains = all.length ? all.filter((el) => el.type === 'main') : [];

  const handleDetailsClose = () => {
    dispatch({ type: DELETE_CURRENT_INGREDIENT });
    dispatch({ type: DETAILS_CLOSE })
  }

  return (
    <>
      {ingredientsRequest &&
        <div className={styles.message}>
          <p className={`${styles.messageText} text text_type_main-medium`}><InfoIcon type="primary" /> Пожалуйста, подождите...</p>
        </div>
      }
      {ingredientsFailed &&
        <div className={styles.message}>
          <p className={`${styles.messageText} text text-error text_type_main-medium`}><InfoIcon type="error" /> Что-то пошло не так, пожалуйста, проверьте подключение к интернет и попробуйте еще раз</p>
        </div>
      }
      {!ingredientsRequest && !ingredientsFailed &&
        <section className={`${styles.mainSection} pt-10 pb-10`} ref={sectionRef}>
          <h1 className={`${styles.title} text text_type_main-large mb-5`}>Соберите бургер</h1>
          <div className={`${styles.tabs} mb-10`}>
            <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrentTab} >
              Булки
            </Tab>
            <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrentTab} >
              Соусы
            </Tab>
            <Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab} >
              Начинки
            </Tab>
          </div>
          <div className={styles.content} onScroll={onScroll}>
            <IngredientsSection title='Булки' sectionName={'buns'} collection={buns} ref={bunRef} />
            <IngredientsSection title='Соусы' sectionName={'sauces'} collection={sauces} ref={sauceRef} />
            <IngredientsSection title='Начинки' sectionName={'main'} collection={mains} ref={mainRef} />
          </div>
        </section>
      }
      {!ingredientsRequest && !ingredientsFailed && isDetailsModalOpen && currentIngredient &&
        <Modal onClose={handleDetailsClose} title="Детали ингредиента">
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>}

    </>
  );
}

export default BurgerIngredients;