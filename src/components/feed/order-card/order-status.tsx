import {FC} from 'react';
import { TOrderStatus } from '../../../services/types/types';
export const OrderStatus:FC<TOrderStatus> = ({status}) => {
  if (status === "done") return (<span className="text text-success">Выполнен</span>);
  if (status === "pending") return (<span className="text">В работе</span>);
  if (status === "created") return (<span className="text">Создан</span>);
  if (status === "cancelled") return (<span className="text text-error">Отменен</span>);
  return null;
}