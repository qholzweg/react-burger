import { OrderDetails } from "../components/feed/order-details/order-details"
import { useParams } from "react-router-dom"
import { NotFound404 } from './';
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { selectOrder } from "../services/reducers/selectors";
import { useEffect } from "react";
import { getOrder } from "../services/reducers/order-slice";

export const OrderPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) dispatch(getOrder(id))
  }, [])
  const { order } = useAppSelector(selectOrder);

  if (!order) return (<NotFound404 />);

  return (
    <main className='content-center'>
      <section>
        <OrderDetails order={order} />
      </section>
    </main>
  )
}