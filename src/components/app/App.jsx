import styles from './App.module.css';
import ingridients from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {

  return (
    <div className={styles.App}>
      <AppHeader />
      <main className='pl-5 pr-5'>
        <section className='ingridients-block'>
          <BurgerIngredients ingridients={ingridients} />
        </section>
        <section className='constructor-block'>
          <BurgerConstructor ingridients={ingridients} />
        </section>
      </main>
    </div>
  );
}

export default App;
