import IngredientDetails from "./ingredient-details/ingredient-details";
import { useNavigate } from "react-router-dom";
import Modal from "./modal/modal";

export default function DetailsModal() {
  const navigate = useNavigate();

  const handleDetailsClose = () => {
    navigate(-1);
  }

  return (
    <Modal onClose={handleDetailsClose} title="Детали ингредиента">
      <IngredientDetails />
    </Modal>
  )

}