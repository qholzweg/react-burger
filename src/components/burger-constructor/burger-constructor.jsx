import { useContext, useState } from 'react';
import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { EmptyConstructorElement } from '../empty-constructor-element/empty-constructor-element';
import styles from './burger-constructor.module.css';
import Price from '../price/price';
import Modal from '../modal/modal';
import useModal from '../../hooks/use-modal';
import OrderDetails from '../order-details/order-details';
import { ConstructorContext } from '../../services/constructorContext';

const ORDER_ENDPOINT_URL = "https://norma.nomoreparties.space/api/orders";

const findIds = (content) => [content.bun, ...content.filling].map((el) => el ? el._id : null)

const Order = ({ total, content }) => {
  const { isOpen: isOrderModalOpen, open: orderModalOpen, close: orderModalClose } = useModal(false);
  const initialState = { order: { number: null }, name: "", success: false, message: "" };
  const [state, setState] = useState(initialState);
  const disabled = content.bun ? false : true;

  const handleOrderClick = () => {
    if (!disabled) {
      fetch(ORDER_ENDPOINT_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ "ingredients": findIds(content) })
      })
        .then(res => res.json())
        .then(res => {
          setState(res);
          orderModalOpen();
        })
        .catch(error => {
          console.log(error);
          setState({
            success: false,
            message: "Что-то пошло не так, попробуйте повторить позднее"
          })
        })
    }
  }

  return (
    <>
      <div className={`${styles.order} mt-10`}>
        <Price price={total} size="medium" extraClass='mr-10' />
        <Button onClick={handleOrderClick} htmlType="button" type="primary" size="medium" disabled={disabled}>
          Оформить заказ
        </Button>
      </div>
      {isOrderModalOpen &&
        <Modal onClose={orderModalClose} >
          {!state.success &&
            <p className='text text_type-main_default text-error'>{state.message}</p>
          }
          {state.success &&
            <OrderDetails order={state.order} />
          }
        </Modal>}
    </>
  )
}

const BurgerConstructor = () => {

  const [constructorState, dispatch] = useContext(ConstructorContext);

  const { selected: { bun, filling }, total } = constructorState;

  const handleDelete = (id) => {
    dispatch({ type: "delete", id: id })
  }

  return (
    <>
      <ul className={`${styles.constructorSection} pt-25 pl-10`} >
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
              {filling.map((ingridient) => (
                <li key={ingridient._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingridient.name}
                    price={ingridient.price}
                    thumbnail={ingridient.image_mobile}
                    extraClass="ml-9"
                    handleClose={() => handleDelete(ingridient._id)}
                  />
                </li>
              ))}
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
      <Order content={{ bun, filling }} total={total} />
    </>
  );
}

export default BurgerConstructor;