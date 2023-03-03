import React, { FC, useRef, useMemo } from 'react';
import { Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Price from '../price/price';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTab } from '../../services/reducers/ingredients-slice';
import { useDrag } from 'react-dnd';
import { selectIngredients } from '../../services/reducers/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { TIngredient } from '../../utils/types';

const Ingredient: FC<{ ingredient: TIngredient, count: number }> = ({ ingredient, count }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: { id: ingredient._id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const handleDetailsOpen = () => {
    navigate('/ingredients/' + ingredient._id, { state: { background: location } });
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

type Ref = HTMLHeadingElement;

const IngredientsSection = React.forwardRef<Ref, { title: string, sectionName: string, collection: TIngredient[] }>(({ title, sectionName, collection }, ref) => {
  const content = useMemo(
    () => collection.map((ingredient: TIngredient) => (
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
  const { all, currentTab } = useSelector(selectIngredients);
  const dispatch = useDispatch();

  const bunRef = useRef<Ref>(null);
  const sauceRef = useRef<Ref>(null);
  const mainRef = useRef<Ref>(null);



  const activateTab = (scrollTop: number) => {
    const boundary = 20;
    if (Math.abs((bunRef.current as HTMLElement).offsetTop - scrollTop) <= boundary) {
      dispatch(setCurrentTab('buns'));
    } else if (Math.abs((sauceRef.current as HTMLElement).offsetTop - scrollTop) <= boundary) {
      dispatch(setCurrentTab('sauces'));
    } else if (Math.abs((mainRef.current as HTMLElement).offsetTop - scrollTop) <= boundary) {
      dispatch(setCurrentTab('main'));
    }
  }

  const scrollToCurrentTab = (tab: string) => {
    const el = document.getElementById(tab) as HTMLElement;
    el.scrollIntoView({ behavior: 'smooth' });
  }

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.target as HTMLElement;
    activateTab(el.scrollTop);
  }

  const buns = all.length ? all.filter((el: TIngredient) => el.type === 'bun') : [];
  const sauces = all.length ? all.filter((el: TIngredient) => el.type === 'sauce') : [];
  const mains = all.length ? all.filter((el: TIngredient) => el.type === 'main') : [];



  return (
    <section className={`${styles.mainSection} pt-10 pb-10`}>
      <h1 className={`${styles.title} text text_type_main-large mb-5`}>Соберите бургер</h1>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={scrollToCurrentTab} >
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={scrollToCurrentTab} >
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={scrollToCurrentTab} >
          Начинки
        </Tab>
      </div>
      <div className={styles.content} onScroll={onScroll}>
        <IngredientsSection title='Булки' sectionName={'buns'} collection={buns} ref={bunRef} />
        <IngredientsSection title='Соусы' sectionName={'sauces'} collection={sauces} ref={sauceRef} />
        <IngredientsSection title='Начинки' sectionName={'main'} collection={mains} ref={mainRef} />
      </div>
    </section>
  );
}

export default BurgerIngredients;