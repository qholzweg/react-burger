import React, { FC } from 'react';
import styles from './ingredient-details.module.css';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectIngredients } from '../../services/reducers/selectors';
import { TIngredient } from '../../utils/types';
import { NotFound404 } from '../../pages';
import { Preloader } from '../../utils';

const InfoItem: FC<{name:string, value: string}> = ({ name, value }) => (
  <div className={styles.infoItem}>
    <span className={styles.itemName}>{name}</span>
    <span className={`${styles.itemValue} text text_type_digits-default mt-2`}>{value}</span>
  </div>
)

export default function IngredientDetails() {
  console.log('d');
  const { id } = useParams<string>();
  const { all }  = useSelector(selectIngredients);
  if (all.length === 0) return <Preloader />; 
  const { name, proteins, fat, carbohydrates, calories, image_large } = all.find((item: TIngredient) => item._id === id);
  if (!name) return (<NotFound404 />)

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
