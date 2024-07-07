import { useState } from "react";
import { Modal, Input, Typography } from "antd";
const { Text } = Typography;

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
  const [inputError, setInputError] = useState<undefined | string>();

  const handleOk = () => {
    if (inputValue.length === 0) {
      setInputError("This field is required");
      return;
    }
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
          autoFocus
        />
        {inputError && <Text type="danger">{inputError}</Text>}
      </Modal>
    )
  );
}
