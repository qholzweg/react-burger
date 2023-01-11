import styles from './order-details.module.css';
import PropTypes from 'prop-types';
import ingridientsPropTypes from '../../utils/ingridients-prop-types';

const InfoItem = (props) => (
  <div className={styles.infoItem}>
    <span className={styles.itemName}>{props.name}</span>
    <span className={`${styles.itemValue} text text_type_digits-default mt-2`}>{props.value}</span>
  </div>
)

export default function OrderDetails(props) {
  const { name, proteins, fat, carbohydrates, calories, image_large } = props.ingridient;
  return (
    <div className={`${styles.OrderDetails} mb-15`}>
      <img src={image_large} className="mb-4" />
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
OrderDetails.propTypes = {
  "ingridient": ingridientsPropTypes
}