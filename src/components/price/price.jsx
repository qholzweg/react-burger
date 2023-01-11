import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';
import PropTypes from 'prop-types';

const getSize = (size, type) => {
  if (type === 'block') {
    return size === 'large' ? styles.large :
      size === 'medium' ? styles.medium : styles.normal;
  } else {
    return size === 'large' ? 'text_type_digits-large' :
      size === 'medium' ? 'text_type_digits-medium' : 'text_type_digits-default';
  }
}

const Price = (props) => {
  const blockClass = getSize(props.size, 'block');
  const textClass = getSize(props.size);

  return (
    <span className={`${props.extraClass} ${styles.priceBlock} ${blockClass}`}>
      <span className={`${styles.price} mr-1 text ${textClass}`}>{props.price}</span>
      <CurrencyIcon type="primary" />
    </span>
  );
}
Price.defaultProps = {
  type: 'normal'
}
Price.propTypes = {
  size: PropTypes.oneOf(['normal', 'medium', 'large']),
  extraClass: PropTypes.string,
  price: PropTypes.number
}
export default Price;
