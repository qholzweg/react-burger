import styles from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


function App() {
  return (
    <div className={styles.App}>
      <AppHeader />
      <main className='pl-5 pr-5'>
        <DndProvider backend={HTML5Backend}>
          <section className={styles.ingredientsBlock}>
            <BurgerIngredients />
          </section>
          <section className={styles.constructorBlock}>
            <BurgerConstructor />
          </section>
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
