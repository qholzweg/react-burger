import { Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingridientsPropTypes from '../../utils/ingridients-prop-types';
import styles from './burger-ingredients.module.css';
import Price from '../price/price';

const Ingridient = (props) => (
  <li key={props.ingridient._id} className={`${styles.ingridient} mr-6 mb-8`}>
    <Counter count={1} size="small" />
    <img src={props.ingridient.image} alt={props.ingridient.name} className={`${styles.image} ml-4 mr-4`} />
    <Price price={props.ingridient.price} extraClass={styles.price} />
    <p className={`${styles.name} text text_type_main-default`} >{props.ingridient.name}</p>
  </li>
)

const Section = (props) => (
  <>
  <h2 className={`${styles.sectionTitle} text text_type_main-medium mb-6`}>{props.title}</h2>
  <ul className={`${styles.ingridientsSection} mb-10`}>
    {props.collection.map((ingridient) => (
      <Ingridient ingridient={ingridient} key={ingridient._id} />
    ))}
  </ul>
  </>
)

const BurgerIngredients = (props) => {

  const buns = props.ingridients.filter((el) => el.type === 'bun');
  const sauces = props.ingridients.filter((el) => el.type === 'sauce');
  const mains = props.ingridients.filter((el) => el.type === 'main');

  return(
  <section className={`${styles.mainSection} pt-10 pb-10`}>
    <h1 className={`${styles.title} text text_type_main-large mb-5`}>Соберите бургер</h1>
    <div className={`${styles.tabs} mb-10`}>
      <Tab value="bun" active={true}>
        Булки
      </Tab>
      <Tab value="sauce">
        Соусы
      </Tab>
      <Tab value="main">
        Начинки
      </Tab>
    </div>
    <div className={styles.content}>
      <Section title='Булки' collection={buns} />
      <Section title='Соусы' collection={sauces} />
      <Section title='Начинки' collection={mains} />
    </div>

  </section>
  );
} 

BurgerIngredients.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientsPropTypes)
}
export default BurgerIngredients;