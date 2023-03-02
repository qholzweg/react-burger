import React, {FC} from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';

const getSize = (size:string, type?:string) => {
  if (type === 'block') {
    return size === 'large' ? styles.large :
      size === 'medium' ? styles.medium : styles.normal;
  } else {
    return size === 'large' ? 'text_type_digits-large' :
      size === 'medium' ? 'text_type_digits-medium' : 'text_type_digits-default';
  }
}

type TPrice = {
  size?: 'normal' | 'medium' | 'large';
  price:number;
  extraClass:string;
}

const Price:FC<TPrice> = ({size = 'normal', price, extraClass}) => {
  const blockClass = getSize(size, 'block');
  const textClass = getSize(size);

  return (
    <span className={`${extraClass} ${styles.priceBlock} ${blockClass}`}>
      <span className={`${styles.price} mr-1 text ${textClass}`}>{price}</span>
      <CurrencyIcon type="primary" />
    </span>
  );
}
export default Price;
