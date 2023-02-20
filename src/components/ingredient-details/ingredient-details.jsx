import styles from './ingredient-details.module.css';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectIngredients } from '../../services/reducers/selectors';

const InfoItem = ({ name, value }) => (
  <div className={styles.infoItem}>
    <span className={styles.itemName}>{name}</span>
    <span className={`${styles.itemValue} text text_type_digits-default mt-2`}>{value}</span>
  </div>
)

export default function IngredientDetails() {
  const { id } = useParams();
  const {all}  = useSelector(selectIngredients);
  const { name, proteins, fat, carbohydrates, calories, image_large } = all.find(item => item._id === id);

  return (
    <div className={styles.IngredientDetails}>
      <img src={image_large} alt={name} className="mb-4" />
      <h1 className='mb-8 text text_type_main-medium'>{name}</h1>
      <div className={`${styles.info} text text-secondary`}>
        <InfoItem name="Калории,ккал" value={calories} />
        <InfoItem name="Белки, г" value={proteins} />
        <InfoItem name="Жиры, г" value={fat} />
        <InfoItem name="Углеводы, г" value={carbohydrates} />
      </div>
    </div>
  )
}
