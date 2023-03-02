import { useEffect, useState } from "react"

type TModal = {
  onOpen: Function | null;
  onClose: Function | null;
}

const useModal = (initialState = false, { onOpen, onClose }:TModal = {onOpen:null,onClose:null}) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  useEffect(() => {
    setIsOpen(initialState)
  }, [initialState])

  const open = () => {
    setIsOpen(true);
    if (typeof onOpen === "function") onOpen();
  }
  const close = () => {
    setIsOpen(false);
    if (typeof onClose === "function") onClose();
  }

  const toggle = () => {
    isOpen ? close() : open()
  }

  return { isOpen, toggle, open, close }
}
export default useModal;