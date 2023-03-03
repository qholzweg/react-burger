import styles from './empty-constructor-element.module.css';
import PropTypes from 'prop-types';

type TConstructorType = 'top-bun' | 'filling' | 'bottom-bun';


const getPositionClass = (type: TConstructorType) =>
  type === 'top-bun' ? 'constructor-element_pos_top' :
    type === 'filling' ? styles.filling :
      type === 'bottom-bun' ? 'constructor-element_pos_bottom' : '';

const getMessage = (type: TConstructorType) =>
  type === 'top-bun' || type === 'bottom-bun' ? 'Пожалуйста, выберите булку' :
    type === 'filling' ? 'Пожалуйста, выберите начинку' : '';

type TEmptyConstructorElement = {
  type: TConstructorType;
  extraClass?: string;
}

export const EmptyConstructorElement = ({ type, extraClass }: TEmptyConstructorElement) => {
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