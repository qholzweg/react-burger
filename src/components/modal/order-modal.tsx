import { useNavigate, useParams } from "react-router-dom";
import Modal from "./modal";
import { OrderDetails } from "../feed/order-details/order-details";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useEffect } from "react";
import { getOrder } from "../../services/reducers/order-slice";
import { selectOrder } from "../../services/reducers/selectors";
import { Preloader } from "../../utils";

export default function OrderModal() {

  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) dispatch(getOrder(id))
  }, [id, dispatch])
  const { order, orderRequest } = useAppSelector(selectOrder);
  const navigate = useNavigate();

  if (orderRequest) return <Preloader />;
  if (!order) return null;


  const handleOrderClose = () => {
    navigate(-1);
  }

  return (
    <Modal onClose={handleOrderClose}>
      {orderRequest && <Preloader />}
      {!orderRequest &&
        <OrderDetails order={order} extraClass="modal" />
      }
    </Modal>
  )

}