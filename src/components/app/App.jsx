import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, useReducer } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ConstructorContext } from '../../services/constructorContext';
import { IngredientsContext } from '../../services/ingredientsContext';

const ENDPOINT_URL = 'https://norma.nomoreparties.space/api/ingredients';

function findBurgerContent (ingredients) {
  const bun = ingredients.find((el) => el.type === 'bun');
  const filling = ingredients.filter((el) => el.type !== 'bun');
  return {bun, filling};
}

function countTotal(content) {
  let total = 0;
  const {bun, filling} = content;
  if (bun) total = bun.price * 2;
  if (filling && filling.length) total += filling.reduce((acc, current) => acc + current.price, 0);
  return total;
}

function reducer(state, action) {
  let content;
  switch (action.type) {
    case "init":
      content = findBurgerContent(action.ingredients);
      return { selected: content, total: countTotal(content) };
    case "delete":
      
      content = {
        bun: state.selected.bun,
        filling: state.selected.filling.filter((el) => el._id !== action.id)
      };
      return {
        selected: content, 
        total: countTotal(content) };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {

  const [state, setState] = useState({
    ingredients: [],
    isLoading: true,
    hasError: false
  });
  const initialConstructorState= { selected: [], total:0 };
  const [constructorState, dispatch] = useReducer(reducer, initialConstructorState);

  useEffect(() => {
    fetch(ENDPOINT_URL)
      .then(res => res.json())
      .then(res => {
        const ingredients = res.data;
        setState({
          ingredients: ingredients,
          isLoading: false,
          hasError: false
        });
        dispatch({
          type: "init",
          ingredients: ingredients
        })
      })
      .catch(error => {
        console.log(error);
        setState(prevState => {
          return { ...prevState, isLoading: false, hasError: true }
        });
      })
  }, []
  );

  return (
    <div className={styles.App}>
      {state.isLoading &&
        <div className={styles.message}>
          <p className={`${styles.messageText} text text_type_main-medium`}><InfoIcon type="primary" /> Пожалуйста, подождите...</p>
        </div>
      }
      {state.hasError &&
        <div className={styles.message}>
          <p className={`${styles.errorText} text text-error text_type_main-medium`}><InfoIcon type="error" /> Произошла ошибка, попробуйте перезагрузить страницу</p>
        </div>
      }

      {state.ingredients && !state.isLoading && !state.hasError &&
        <>
          <AppHeader />
          <IngredientsContext.Provider value={[state, setState]}>
            <main className='pl-5 pr-5'>
              <section className={styles.ingridientsBlock}>
                <BurgerIngredients />
              </section>
              <section className={styles.constructorBlock}>
                <ConstructorContext.Provider value={[constructorState, dispatch]}>
                  <BurgerConstructor />
                </ConstructorContext.Provider>
              </section>
            </main>
          </IngredientsContext.Provider>
        </>
      }
    </div>
  );
}

export default App;
