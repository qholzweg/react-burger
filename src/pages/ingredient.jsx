import { useEffect } from 'react';
import styles from './ingredient.module.css';
import { Counter, Tab, InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../components/app-header/app-header';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIngredients } from '../services/reducers/selectors';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { getIngredients } from '../services/actions/ingredients';

export const IngredientPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(
    () => {
      if (location.state?.isDetailsModalOpen) navigate('/');
      dispatch(getIngredients());
    }, [dispatch]
  );

  const { id } = useParams();
  const { all, ingredientsRequest, ingredientsFailed } = useSelector(selectIngredients);
  const ingredient = all.find(item => item._id === id);

  return (
    <div className={styles.IngredientPage}>
      <AppHeader />
      <main className='content-center'>
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
      {!ingredientsRequest && !ingredientsFailed && all.length &&
        <section>
          <h1 className='text_type_main-large'>Детали ингредиента</h1>
          <IngredientDetails ingredient={ingredient} />
        </section>
      }
      </main>
    </div>
  )
}