import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'; 
import BurgerConstructor from '../burger-constructor/burger-constructor';

const BUN_NAME = "Краторная булка N-200i";
const INGRIDIENTS_NAMES = ["Филе Люминесцентного тетраодонтимформа", "Соус Spicy-X", "Мини-салат Экзо-Плантаго"];


function App() {

  const [state,setState] = useState({
    ingridients: [],
    bun: null,
    filling:[],
    isLoading: true,
    hasError: false
  })
  useEffect(() => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => res.json())
      .then(res => {
        const data = res.data;
        setState({ 
        ingridients: data, 
        bun: data.find((el) => el.name === BUN_NAME), 
        filling: data.filter((el) => INGRIDIENTS_NAMES.includes(el.name)),
        isLoading: false, 
        hasError:false })
      })
      .catch(error => {
        console.log(error);
        setState({ ...state, isLoading: false, hasError:true })
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]
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

      {state.ingridients && !state.isLoading && !state.hasError &&
        <>
          <AppHeader />
          <main className='pl-5 pr-5'>
            <section className={styles.ingridientsBlock}>
              <BurgerIngredients ingridients={state.ingridients} />
            </section>
            <section className={styles.constructorBlock}>
              <BurgerConstructor bun={state.bun} filling={state.filling} />
            </section>
          </main>
        </>
      }
    </div>
  );
}

export default App;
