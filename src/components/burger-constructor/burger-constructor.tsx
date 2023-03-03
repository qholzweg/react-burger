import { useMemo } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { EmptyConstructorElement } from './empty-constructor-element/empty-constructor-element';
import { useSelector, useDispatch } from 'react-redux';
import { addSelectedItemById } from '../../services/reducers/burger-slice';
import { useDrop } from 'react-dnd';
import uuid from 'react-uuid';

import styles from './burger-constructor.module.css';
import FillingItem from './filling-item'
import Order from './order/order';
import { selectBurger } from '../../services/reducers/selectors';
import { TIngredient } from '../../utils/types';

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { selected: { bun, filling } } = useSelector(selectBurger);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId:{id: number}) {
      //TODO: type check this
      dispatch<any>(addSelectedItemById(itemId));
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  const fillingContents = useMemo(
    () => filling.map((ingredient: TIngredient, index:number) => (
      <FillingItem key={uuid()} ingredient={ingredient} index={index} />
    )), [filling]
  )

  return (
    <section className='pt-25 pl-10'>
      <ul ref={dropTarget} className={`${styles.constructorSection} ${isHover ? styles.isHover : ''}`} >
        <li key={'topbun'} className={styles.topbun}>
          {bun &&
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          }
          {!bun &&
            <EmptyConstructorElement
              type="top-bun"
            />
          }
        </li>
        {filling && filling.length > 0 &&
          <li className={styles.filling} key='filling'>
            <ul>
              {fillingContents}
            </ul>
          </li>
        }
        {(!filling || filling.length === 0) &&
          <li className={styles.emptyFilling} key='filling'>
            <EmptyConstructorElement
              type="filling"
            />
          </li>
        }
        <li key={'bottombun'} className={styles.bottombun}>
          {bun &&
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          }
          {!bun &&
            <EmptyConstructorElement
              type="bottom-bun"
            />
          }
        </li>
      </ul>
      <Order />
    </section>
  );
}

export default BurgerConstructor;