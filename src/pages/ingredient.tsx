import styles from './ingredient.module.css';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

export const IngredientPage = () => {
  return (
    <div className={styles.IngredientPage}>
      <main className='content-center'>
        <section>
          <h1 className='text_type_main-large'>Детали ингредиента</h1>
          <IngredientDetails />
        </section>
      </main>
    </div>
  )
}