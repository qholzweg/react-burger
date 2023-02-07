import styles from './home.module.css';
import AppHeader from '../components/app-header/app-header';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useLocation, useParams } from 'react-router-dom';
import { IngredientPage } from './ingredient';


export default function HomePage() {
  const { id } = useParams();
  const { state } = useLocation();

  if (id && !state?.keepDetailsModal) return (<IngredientPage />);

  return (
    <div className={styles.HomePage}>
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

