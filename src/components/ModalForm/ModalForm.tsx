import { useState } from "react";
import { Modal, Input } from "antd";

interface ModalFormProps {
  title: string;
  placeholder?: string;
  defaultValue?: string;
  onSubmit: (value: string) => void;
  isModalOpen: boolean;
  toggleModal: (value?: boolean) => void;
}

export default function ModalForm({
  title,
  placeholder,
  defaultValue,
  onSubmit,
  isModalOpen,
  toggleModal,
}: ModalFormProps) {
  const [inputValue, setInputValue] = useState("");

  const handleOk = () => {
    onSubmit(inputValue);
    toggleModal(false);
  };

  const handleCancel = () => {
    toggleModal(false);
  };

  return (
    isModalOpen && (
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder={placeholder || ""}
          defaultValue={defaultValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </Modal>
    )
  );
}
