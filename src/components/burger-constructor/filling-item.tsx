import { FC, useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from 'dnd-core'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient, moveSelectedItem } from '../../services/reducers/burger-slice';
import { TIngredient } from '../../services/types/types';
import { useAppDispatch } from '../../hooks/store';

interface DragItem {
  index: number
  id: string
  type: string
}


const FillingItem: FC<{ ingredient: TIngredient, index: number }> = ({ ingredient, index }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);
  const [{ opacity }, drag] = useDrag({
    type: 'selctedIngredient',
    item: () => {
      return { id: ingredient._id, index }
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'selctedIngredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      // sortable functionality
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch(moveSelectedItem({
        from: dragIndex,
        to: hoverIndex
      }));
      item.index = hoverIndex
    },
  });
  drag(drop(ref));
  const handleDelete = (index: number, id: string) => {
    dispatch(deleteIngredient({ id: id, index: index }));
  }
  return (
    <li ref={ref} data-handler-id={handlerId} style={{ opacity: opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        extraClass="ml-9"
        handleClose={() => handleDelete(index, ingredient._id)}
      />
    </li>
  );
};

export default FillingItem;