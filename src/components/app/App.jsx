import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const ENDPOINT_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [state, setState] = useState({
    ingridients: [],
    bun: null,
    filling: [],
    isLoading: true,
    hasError: false
  })
  useEffect(() => {
    fetch(ENDPOINT_URL)
      .then(res => res.json())
      .then(res => {
        const data = res.data;
        setState({
          ingridients: data,
          isLoading: false,
          hasError: false
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

      {state.ingridients && !state.isLoading && !state.hasError &&
        <>
          <AppHeader />
          <main className='pl-5 pr-5'>
            <section className={styles.ingridientsBlock}>
              <BurgerIngredients ingridients={state.ingridients} />
            </section>
            <section className={styles.constructorBlock}>
              <BurgerConstructor ingridients={state.ingridients} />
            </section>
          </main>
        </>
      }
    </div>
  );
}

export default App;
