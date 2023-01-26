import styles from './empty-constructor-element.module.css';
import PropTypes from 'prop-types';

const getPositionClass = (type) =>
  type === 'top-bun' ? 'constructor-element_pos_top' : 
  type === 'filling' ? styles.filling :
  type === 'bottom-bun' ? 'constructor-element_pos_bottom' : '';

const getMessage = (type) =>
  type === 'top-bun' || type === 'bottom-bun' ? 'Пожалуйста, выберите булку' : 
  type === 'filling' ? 'Пожалуйста, выберите начинку' : '';

export const EmptyConstructorElement = ({ type, extraClass }) => {
  const positionClass = getPositionClass(type);
  return (
    <div className={`${styles.EmptyConstructorElement} constructor-element ${positionClass} ${extraClass}`}>
      <span className='constructor-element__text'>{getMessage(type)}</span>
    </div>
  )
}

EmptyConstructorElement.propTypes = {
  type: PropTypes.oneOf(["top-bun", "filling", "bottom-bun"]).isRequired,
  extraClass: PropTypes.string
}