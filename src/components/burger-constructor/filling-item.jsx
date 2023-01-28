import { useRef } from 'react';
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteSelectedItem, MOVE_SELECTED_ITEM } from '../../services/actions/burger';

export default function FillingItem ({ ingredient, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{ opacity }, drag] = useDrag({
    type: 'selctedIngredient',
    item: () => {
      return { id: ingredient._id, index }
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  const [{ handlerId }, drop] = useDrop({
    accept: 'selctedIngredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch({
        type: MOVE_SELECTED_ITEM,
        from: dragIndex,
        to: hoverIndex
      });
      item.index = hoverIndex
    },
  });
  drag(drop(ref));
  const handleDelete = (id) => {
    dispatch(deleteSelectedItem(id));
  }
  return (
    <li ref={ref} data-handler-id={handlerId} style={{ opacity: opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        extraClass="ml-9"
        handleClose={() => handleDelete(ingredient._id)}
      />
    </li>
  );
};
