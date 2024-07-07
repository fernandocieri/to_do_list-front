import { useState } from "react";

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (value?: boolean) => {
    if (value) {
      setIsModalOpen(value);
    } else {
      setIsModalOpen(!isModalOpen);
    }
  };

  return { isModalOpen, toggleModal };
}
